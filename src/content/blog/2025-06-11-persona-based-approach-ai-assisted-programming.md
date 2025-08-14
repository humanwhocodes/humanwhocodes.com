---
title: "A persona-based approach to AI-assisted software development"
teaser: "Discover how breaking AI assistance into specialized personas can help you tackle complex software development tasks more efficiently and with less frustration."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - AI
  - Claude
  - GPT
updated: 2025-08-14
---

I’ve spent most of 2025 experimenting with AI-assisted programming, with mixed results. I tried different models, prompt styles, and editors to understand where AI adds value and where it becomes a distraction. Eventually, I developed a process for using AI to make non-trivial changes.

Non-trivial changes require project knowledge and multiple steps to complete. I wasted too much time trying to rein in models that veered off track and needed a more productive approach. Eventually, I started treating AI as a team of personas rather than a single helper. This let me break the work into chunks and assign tasks to different models based on their strengths.

## The development process

I thought through how I typically implement a feature. The process usually looks like this:

* Gather the requirements
* Design the solution
* Implement the solution
* Test and debug the solution

I assigned a persona to each task:

* The product manager
* The software architect
* The implementer
* The problem solver

At different steps I felt like I needed some quality control, so I added a couple other personas:

* The tech spec reviewer
* The implementation reviewer

Each persona plays a role in implementing a feature, and knowing when to use each one has made me more productive. Here’s how I think about them.

## The product manager

The product manager persona gathers requirements and creates a product requirements document (PRD) focused on functional rather than technical needs. Asking the model to generate user stories helps keep it away from implementation details.

**Prompt:**

> You are a product manager for this application. Your task is to turn user requirements into product requirements documents (PRDs) that include user stories for new features. Add acceptance criteria. If you don’t have enough information, ask me questions about the feature. Insert the design into a Markdown file in the `docs` directory of the repository. The file name should be in Kebab-case named and end with `-prd.md` suffix, for example `docs/saves-data-prd.md`. The file should be formatted in Markdown and include headings and bullet points.

The application needs an authentication flow to support signed-in functionality. Users should be able to sign up from a link on the login page if they don’t have an account. When signed out, the UI should show a login link; when signed in, it should show the user’s profile picture. The “Recent Saves” section on the homepage and the “Saves” page should be accessible only to logged-in users.

**My choice:** GPT-4.1 

**Rationale:** GPT-4.1 is focused and less likely to go off track. It lacks the deep technical knowledge of Claude or Gemini but does not need it for this role. It’s usually available in standard AI editors, which helps keep costs reasonable. GPT 4.1 isn't considered a premium model so you pay less to use it in most IDEs.

## The architect

The architect persona designs the technical implementation of the feature. Using the PRD, it creates step-by-step instructions for the change. This persona requires deep technical knowledge and a strong understanding of how systems are built from smaller parts. It does not write code but describes the design to be implemented. You must guide this persona on technical requirements, such as when to use client-side versus server-side logic.

**Prompt:**

 > You are a software architect for this application. Your product manager has provided the attached PRD outlining the functional requirements for a new feature. Your task is to design the implementation and ensure all acceptance criteria are met. Scan the current codebase to find integration points. Create a step-by-step guide detailing how to implement your design. Include all details an LLM needs to implement this feature without reading the PRD. DO NOT INCLUDE SOURCE CODE. If anything is unclear, ask me questions about the PRD or implementation. If you need to make assumptions, state them clearly. Insert the design into a Markdown file in the `docs` directory of the repository. The file should be named the same as the PRD without "prd" in the name an with "techspec" instead. For example, if the PRD is `docs/saves-data-prd.md`, the file should be `docs/saves-data-techspec.md`. The file should be formatted in Markdown and include headings and bullet points.

**My choice:** GPT-5, Gemini 2.5 Pro (fallback)

**Rationale:** I previously used Gemini 2.5 Pro as the architect but I've switched to GPT-5. I've found GPT-5 to be just as technically knowledgeable and outputs technical specifications with much more depth and specificity. The result is a concrete plan that any LLM can easily follow. GPT-5 is a premium model in VS Code, and it's well worth the extra cost. If you're using an editor where GPT-5 is not available, then Gemini 2.5 Pro is a good second choice.

## The implementer

The implementer persona carries out the design based on the architect’s technical specification. It needs to follow instructions and not make too many design decisions on its own.

**Prompt:**

> You are a software engineer tasked with implementing the feature described in the attached file. If anything is unclear, ask me questions before starting. You must complete all steps in the document. After finishing, verify that all steps are complete; if not, return and implement the missing steps. Repeat this process until all steps are done.

**My choice:** GPT-4.1

**Rationale:** Once again, I trust GPT-4.1 to stay focused while working. It follows precise instructions well but sometimes skips steps. Asking the model to review its work helps ensure nothing is missed. Plus, GPT 4.1 has one of the fastest response times among the models available at the time of my writing. With a good tech spec as a prompt, GPT 4.1 gets the job done faster than any other model.

## The problem solver

Ideally, the feature is now implemented. More often, though, something still doesn’t work as expected. That’s when you need the problem solver persona. This persona investigates issues and finds how to fix them. Not all LLMs excel at this, so choosing the right one matters.

**Prompt:**

> The homepage isn’t being updated when I log in. It should show the profile photo in the header and log out button. Fix it.

**My choice:** GPT-5, Claude 3.5 Sonnet (fallback)

**Rationale:** GPT-5 has surpassed Claude for this purpose. Claude models are strong problem solvers with creative thinking. I've found GPT-5 to be better at staying on task and solving the problem, especially when it involves cross-file interactions. If GPT-5 is not available in our editor, then Claude 3.5 Sonnet is my choice. The 3.5 Sonnet model is the most focused and less likely to stray compared to 3.7 and 4\. If you are truly stuck, switching to 3.7 or 4 might solve the problem but could also lead to distractions. 

## The tech spec reviewer

The tech spec reviewer persona is quality assurance for the technical specification. While I don't use this persona all the time, I use it whenever the specification is more complex than usual. In that case, I want another review to make sure nothing is missing and there aren't any non-obvious technical issues such as race conditions.

**Prompt:**

> You are a software architect. Critique this specification, paying particular attention to scalability and performance issues. Identify edge cases that are not adequately addressed and possible race conditions. Compare the specification against the PRD to ensure that acceptance criteria is met. 

**My choice:** Gemini 2.5 Pro

**Rationale:** Gemini really shines in this type of role. Its deep technical knowledge is coupled with an ability to describe exact situations where a technical design will fail or introduce problems. Gemini debates approaches using scenarios and explains its thinking well, so you can identify any logic errors or misalignment. Iterating on a specification with Gemini has been a lot of fun for me, personally, as it almost always seems to be correct (provided I gave it the correct requirements).

## The implementation reviewer

The implementation reviewer persona is quality assurance for the code generated from the technical specification. This is another persona I don't use all the time but lean on for more complex implementations. 

**Prompt:**

> You are a software architect. Review the attached specification and then scan the codebase to validate that the specification has been implemented correctly. If there are any problems, list them out in descending order of severity with a proposed fix. Do not implement the fixes, just describe them.

**My choice:** Gemini 2.5 Pro

**Rationale:** Once again, Gemini is perfect for this role. It's capable of deeply understanding the technical specification and matching it against the existing code. In a recent complex feature, I was surprised at how many problems Gemini found in the implementation even after I had reviewed it. 

## Conclusion

Over the past months, I’ve found that treating AI not as a single assistant but as a team of specialized personas dramatically improves my productivity when handling complex changes. By clearly defining roles such as product manager, architect, implementer, problem solver, tech spec reviewer, and implementation reviewer, and choosing the right model for each, I can guide the process efficiently from requirements to debugging. This approach minimizes distractions and leverages each model’s strengths, making AI-assisted programming a practical and powerful part of my workflow. If you’re experimenting with AI in development, I encourage you to try this persona-driven process and see how it transforms your projects.

**Update (2025-08-14):** Switched architect and problem solver personas to use GPT-5. Added the tech spec reviewer and implementation reviewer personas.
