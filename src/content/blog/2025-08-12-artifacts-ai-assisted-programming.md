---
title: "The importance of artifacts in AI-assisted programming"
teaser: ""
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - AI
  - Specifications
  - Documentation
  - Artifacts
---

A lot of the hype around AI-assisted programming is focused on "vibe coding," which is working prompt by prompt to build up an application and not worrying too much about the generated code. As long as something works, that's all that matters. While this is a fun approach for personal and hobby projects, it is impractical in professional software engineering.

Professional software engineering is marked by a team of developers working on a common codebase that is maintained over time. As such, there are concerns that go beyond whether or not the code is working. Significant changes need to be documented to provide traceability when something goes wrong. *Traceability* is the ability to look through changes and track them back to the root, whether that be a bug fix or a requirements change or a new feature. Understanding why a change was made, especially one that caused a problem, is important for maintaining an application over time. That's why professional software organizations prioritize the creation of artifacts as the application changes.

## What are artifacts?

An *artifact* is some output that is created, used, or modified during the software development process. Issues and pull requests are artifacts, as are diagrams, documents, mockups, and the code itself. It's safe to say that most software teams generate a large amount of artifacts and these represent an important part of the process. Should anything go wrong, artifacts provide traceability to help determine from where the problem started.

When I was learning software development in college, the focus was on front-loading document artifacts to ensure you knew what you were building. We had to create a functional requirements document (FRD, now often called a product requirements document or PRD) describing what the project or feature would do. Then we had to create a technical specification describing the overall design of the code changes. Only once these two documents were complete were we allowed to write any code. This is called the *waterfall approach*, where each stage must be completed before the next is allowed to begin.

With agile methodologies becoming more popular, many teams saw this as license to forego the PRDs and tech specs, and instead "just start coding." The focus on iterative development, where software is never truly "complete," meant that these document artifacts took precious time away from the development process. Many teams convinced themselves that two-sentence issue summaries and face-to-face discussions with product managers were enough to implement good software. As such, documents like PRDs and tech specs became rare in technology companies (outside of high-level architecture and infrastructure discussions, which often had copious amount of specifications and diagrams). The argument was that if you had a question about why something was done a particular way, you would just go and ask the person who did it.

## Your AI teammate's forgetfulness

When AI-assisted programming began, developers quickly realized that the models didn't always produce reliable results. Far from nondeterministic, the models may produce wildly different output when prompts aren't specific enough. AI-powered IDEs do their best to provide additional context to the models to make output more reliable, and even still, developers continue to find that longer prompts produce better results.

And here's the problem: Your AI pair programmer has a very short memory. It can't tell you why it made a decision six months ago that brought down your server today. Human programmers are both implementers and stores of knowledge while AI is only an implementer. The model does not provide traceability beyond the scope of its current context window. If you "vibe coded" an implementation and your server goes down, there's no way to tell why. Did the model generate insecure code that left the server vulnerable to attack? If so, did it do that because it doesn't know any better? Did you tell it the code had to be secure? There's no way to know what part of the process broke down.

## Artifacts for AI-assisted programming

The year 2025 is marked by the professionalization of AI-assisted programming with the emergence of spec-driven development. 




* Product design documents
* Technical specifications
* Decision documents
