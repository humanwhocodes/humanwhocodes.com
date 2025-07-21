---
title: "Post to social media using Claude Desktop and Crosspost"
teaser: "Crosspost is a small utility I wrote to post across social media networks. It now includes an MCP server for use with AI agents."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - Open Source
  - AI
  - Claude
  - MCP
---

We all spend way too much time on social media these days. If you're like me, you also spend time switching between various social media platforms and, as a result, end up copy-pasting the same content in multiple browser tabs. In order to address this problem, I created Crosspost[^1], an npm package that allows you to post across multiple social media platforms using a command line interface. 

## Introducing Crosspost

The Crosspost command line interface lets you submit a message to any number of different social media networks. The message can either be passed directly on the command line or you can pass in a file using the `--file` option. Here's an overview of how it works:

```
Usage: crosspost [options] ["Message to post."]
--twitter, -t   Post to Twitter.
--mastodon, -m  Post to Mastodon.
--bluesky, -b   Post to Bluesky.
--linkedin, -l  Post to LinkedIn.
--discord, -d   Post to Discord via bot.
--discord-webhook  Post to Discord via webhook.
--devto         Post to dev.to.
--mcp           Start MCP server.
--file          The file to read the message from.
--image         The image file to upload with the message.
--image-alt     Alt text for the image (defaults: filename).
--help, -h      Show this message.
```

You can use the CLI via `npx`. Here are some examples:

```shell
# Post a message to multiple services
npx @humanwhocodes/crosspost -t -m -b "Check out this beach!"

# Post a message with an image to multiple services
npx @humanwhocodes/crosspost -t -m -b --image ./photo.jpg --image-alt "A beautiful sunset" "Check out this beach!"
```

These examples post the message `"Check out this beach!"` to Twitter, Mastodon, and Bluesky with an attached image. You can choose to post to any combination by specifying the appropriate command line options.

Each social media platform is represented by a strategy inside of Crosspost, and each strategy requires specific environment variables to work correctly. (Please refer to the Crosspost README[^1] for details on the environment variables.)

## Using with Claude Desktop

Initially, Crosspost was designed for use in continuous integration systems to help announce releases in my open source projects. Eventually, though, I started thinking about how to make Crosspost easier for me to use to quickly post something on social media manually. I wanted something where the environment variables were already baked in and I didn't have to worry about setting them up each time. At first I thought I'd bundle a web application in the package but instead I grew fascinated with the buzz around MCP servers and set out to create one for Crosspost.

You can start the Crosspost MCP server by using the `--mcp` command. Most of the command line arguments work in the MCP server, aside from `--file`, `--image`, and `--image-alt`. 

To set up Claude Desktop to use Crosspost:

1. Click on File -> Settings.
1. Select "Developer".
1. Click "Edit Config".

This will create a `claude_desktop_config.json` file. Open it and add the following:

```json
{
  "mcpServers": {
    "crosspost": {
      "command": "npx",
      "args": ["@humanwhocodes/crosspost", "-m", "-l", "--mcp"],
      "env": {
        "CROSSPOST_DOTENV": "/path/to/.env"
      }
    }
  }
}
```

Claude Desktop only has access to the strategies you've enabled in Crosspost. In this example, the Mastodon and LinkedIn strategies are enabled so those are the only ones Claude can post to on your behalf (you can pick the strategies you want to use). This example also uses a `.env` file to read in the required environment variables.

Once the `claude_desktop_config.json` file is updated, you need to restart Claude Desktop. Note that just closing the window isn't enough because the Claude Desktop process stays active. You need to click File -> Exit before starting Claude Desktop again.

At this point, you should see a hammer icon with a number next to it, indicating how many tools are available through installed MCP servers. 

![The Claude Desktop toolbar under message entry showing a hammer icon with the number 5 next to it](/images/posts/2025/claude-tools-button.png)

If you click on the hammer, you'll see a list of all available tools.

![The Claude Desktop dialog listing all of the available Crosspost tools for posting to social media](/images/posts/2025/claude-available-tools.png)

Once you've confirmed the Crosspost tools are available, you can ask Claude to post a message for you such as:

> Crosspost this message: "If you are reading this, it means I successfully got Claude to post to my social media."

(You can also ask Claude to post to just one social media platform, such as "Post this to Bluesky," if you don't always wants to post to every platform.)

When Claude decides it will use one of the Crosspost tools, it will ask for your permission to do so. You can either allow once or for the lifetime of the chat.

![The Claude Desktop dialog asking you to approve the use of the Crosspost tool either once or for the lifetime of the chat.](/images/posts/2025/claude-allow-tool.png)

Once you allow use of Crosspost, Claude will post on your behalf and let you know when complete.

![The Claude Desktop chat window showing confirmation that a message has been posted across multiple social media platforms.](/images/posts/2025/claude-crosspost-success.png)

I've found this so convenient that Claude Desktop is now the primary way I post to social media. It's fast and I don't get distracted by reading other content in my feed.

## Conclusion

Crosspost started as a simple utility to help automate social media posts for my open source projects, but it has evolved into something much more useful. By integrating with Claude Desktop through an MCP server, it's become a streamlined way to manage social media posts without getting caught up in the endless scroll of content. Whether you're managing multiple social media accounts or just want a more efficient way to post updates, Crosspost combined with Claude Desktop offers a fun solution.

[^1]: [Crosspost](https://github.com/humanwhocodes/crosspost)
[^2]: [Claude Desktop](https://claude.ai/download)
