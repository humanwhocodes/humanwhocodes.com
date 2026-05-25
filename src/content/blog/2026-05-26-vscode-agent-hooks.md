---
title: "Creating a VS Code agent hook to respond to file changes"
teaser: "Learn how to use a VS Code agent hook to detect edits to a specific file and trigger deterministic follow-up automation."
author: Nicholas C. Zakas
image: /images/posts/2026/vscode-agent-hooks.png
categories:
  - Programming
tags:
  - AI
  - VS Code
  - Automation
---

Visual Studio Code recently shipped [agent hooks][^1] as a way to customize your agent experience. Unlike other enhancements such as skills, agent hooks are deterministic. Instead of relying on the agent to call a tool or use a skill, an agent hook sits in the middle of the agent loop and listens for specific events. You can use those events to trigger an action. That means no more pleading with the agent to always follow one action with another. Just define a hook that makes it happen 100% of the time.

For example, I recently set up an agent hook to regenerate TypeScript types whenever a `wrangler.jsonc` file is edited. These files specify bindings for Cloudflare Workers, and the `wrangler types` command reads `wrangler.jsonc` and outputs TypeScript type definitions. I had been struggling to get agents to regenerate types whenever they edited a `wrangler.jsonc` file. I begged, pleaded, and strongly cautioned the agent, and nothing worked. Now it happens automatically with an agent hook, and I don't have to think about it.

Creating an agent hook that triggers only when a specific file changes isn't straightforward. It takes a fair amount of boilerplate just to determine whether the file in question changed. Before digging into that use case, though, it helps to understand how agent hooks work in general.

## How agent hooks work

Agent hooks are shell commands that execute at specific points during an agent session. Every agent session consists of a series of events, and you can trigger an agent hook for any of them. At the time of writing, the available hook events are:

* `SessionStart`: When the user enters their first prompt in the chat.
* `UserPromptSubmit`: When the user submits any prompt. This gives you access to the prompt itself.
* `PreToolUse`: When the agent is about to use a tool.
* `PostToolUse`: When a tool has completed its job.
* `PreCompact`: Before the chat is compacted to free up context.
* `SubagentStart`: When a subagent is created.
* `SubagentStop`: When a subagent finishes.
* `Stop`: When an agent has completed all of its work and is waiting for another prompt.

You can hook into any of these events by creating a JSON file in the `.github/hooks` directory that specifies which events to listen for and which command to run. Here's an example:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "bash ./hello-world.sh"
      }
    ]
  }
}
```

This hook runs the `hello-world.sh` script with `bash` after a tool has been used.

## Hook input

When a hook command is executed, details about the hook are passed through `stdin` as a JSON structure. Five common fields are sent with every hook:

* `timestamp`: The time of the event
* `cwd`: The current working directory at the time of the event
* `sessionId`: A unique identifier for the agent session
* `hookEventName`: The name of the hook event that was triggered
* `transcript_path`: A JSON file containing the transcript of the agent session

Each hook event adds hook-specific information to the payload. For example, a `PostToolUse` hook, which is the one this post focuses on, adds information about the tool that was used:

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-identifier",
  "hookEventName": "PostToolUse",
  "transcript_path": "/path/to/transcript.json",
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123",
  "tool_response": "File edited successfully"
}
```

### Hook output

Your hook command communicates back to VS Code through two mechanisms:

1. The exit code
2. `stdout`

The exit code can be one of the following:

* `0` means the command executed successfully and the agent session should continue
* `2` means the command failed and the agent session should stop
* Anything else means the command didn't fully succeed or fail, and the agent session should continue with a warning displayed to the user

The exit code is used along with a JSON structure written to `stdout`. Every hook event supports the following fields:

* `continue`: A boolean indicating whether the agent session should continue
* `stopReason`: If `continue` is `false`, this message is displayed to the user
* `systemMessage`: A warning message displayed to the user regardless of `continue`
* `hookSpecificOutput`: An object with information specific to the hook in use
  * `hookEventName`: The name of the hook event
  * `additionalContext`: Text to insert into the agent session context

For `PostToolUse`, you can also specify these fields:

* `decision`: Set to `"block"` to prevent further processing
* `reason`: If `decision` is `"block"`, this field is passed to the model so it can understand the block

Here's an example:

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Unit tests failed",
  "decision": "block",
  "reason": "Post-processing validation failed",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The edited file has lint errors that need to be fixed"
  }
}
```

## Detecting when a specific file is edited

While there is no direct way to determine whether a given file was edited, you can infer it by checking when known editing tools were executed against that file.

### Step 1: Read from `stdin`

The first step is to read data from `stdin`. To do that, it helps to create a wrapper function:

```js
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}
```

Then you can read the data and parse it into an object:

```js
const raw = await readStdin();
const payload = JSON.parse(raw);
```

### Step 2: Detect changes to the file

Now that you have the hook payload, you need to filter for the tools that can create or edit files. VS Code has several of these tools, so the first step is to define them.

```js
const WRITE_TOOL_NAMES = new Set([
  "apply_patch",
  "create_file",
  "replace_string_in_file",
  "editFiles",
  "createFile",
  "edit",
  "create",
  "write",
  "str_replace_editor",
  "str_replace_based_edit_tool",
]);
```

Then you can filter the hook payload by `tool_name` to ensure you aren't responding to unrelated tool calls:

```js
// if this isn't a tool we're looking for then just exit
if (!WRITE_TOOL_NAMES.has(payload.tool_name)) {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}
```

After that, you can check whether the target filename is present in the `tool_input.files` array. Keep in mind that the file paths are relative to the current working directory, so if you want to calculate the directory containing the file, you'll need to resolve it first. Here's an example that looks for `wrangler.jsonc` and extracts the parent directory:

```js
const relativePath = payload.tool_input.files.find(
  filePath => path.basename(filePath) === "wrangler.jsonc"
);

// file wasn't found so just exit
if (!relativePath) {{
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);  
}}

const parentDirectory = path.dirname(path.resolve(payload.cwd, relativePath));
```

If this code executes all the way through, that means a file named `wrangler.jsonc` was edited, and you can run any additional code related to that change. Just be sure to exit gracefully once you're done:

```js
// do what you want with relativePath and parentDirectory

// exit gracefully at the end of the script
process.stdout.write(JSON.stringify({ continue: true }));
process.exit(0);  
```

### Step 3: Wire up the hook

The last step is to wire up the hook. By convention, hook scripts are stored in `.github/hooks/scripts`, so you can create a JSON file like this in `.github/hooks`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "node ./scripts/detect-file-change.mjs"
      }
    ]
  }
}
```

Now, whenever any file named `wrangler.jsonc` is edited, the hook command will execute.

## Conclusion

Agent hooks add a new layer of reliability to customizing the agent experience in VS Code. Instead of hoping the model remembers to perform a follow-up task, you can enforce that behavior with a deterministic command. It takes some setup, especially when you need to detect changes to a specific file, but the payoff is worth it. Once the hook is in place, the workflow becomes automatic, consistent, and one less thing to think about.

[^1]: [Agent hooks in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/hooks)
