---
title: "From Coder to Orchestrator: The future of software engineering with AI"
teaser: "The software engineering job of the future won't involve writing code; it will involve orchestrating AI agents to write code for you."
author: Nicholas C. Zakas
image: /images/posts/2026/coder-to-orchestrator.png
categories:
  - Programming
tags:
  - AI
  - Coder
  - Orchestrator
  - Automation
---

The software engineering industry is undergoing a major AI-driven transition in how we work. The days when humans needed to write every line of code are already behind us as LLMs become more capable and reliable. The improvement in code output during 2025 alone has been astounding. I've personally watched LLMs struggle with certain problems, then a few months later, solve them completely and efficiently. Progress will likely accelerate even further in 2026\.

As Addy Osmani put it, we’re moving from coder to conductor to orchestrator[^1].

## From autocomplete to agent-based development

At the start of 2024, AI-assisted programming resembled a significantly improved autocomplete. You could maximize AI's value by having it write tedious, common patterns learned from its training data. Coders had a form of "cruise control"—models filled in the blanks as you worked, but you remained the driver of the development process. The time savings came primarily from mundane tasks like writing documentation comments, utility functions, data models, and tests.

In 2025, we got our first taste of partially autonomous models that could take a single prompt and figure out how to implement the request. The coder now acted more like a *conductor*, giving an LLM instructions to complete a task, then sitting back to see what it produced, providing feedback, and repeating the cycle. Models became capable of creating complex, multi-file solutions, and in some cases, complete applications, from a single prompt. While we still initiated the code creation process, we acted like an orchestra conductor guiding the violin section through a carefully measured motif. We remained ultimately responsible for the output but spent more time reviewing than coding. We'd been upgraded from cruise control to partially self-driving.

Towards the end of 2025, fully autonomous background agents gave rise to a new way of working. Instead of limiting ourselves to one synchronous AI session at a time, we can now act as an *orchestrator*, arranging work across multiple agents and determining how to combine them later. Through offerings like Cursor cloud agents[^2] and GitHub Copilot coding agent[^3], you can give instructions to be completed without active monitoring. These cloud-based agents continue executing until the task is complete, then notify you when it's time to review their work. The isolated cloud environments remove much of the security risk of running agents on personal computers, allowing them to try, fail, and retry approaches without risking collateral damage.

This human-as-orchestrator trend appears to be the future of software development, making it worth exploring how the human development experience will change in the coming years.

## From text-focused IDEs to task-focused IDEs

With humans no longer responsible for writing code, the question arises: what will the integrated development environment (IDE) interface look like? Undoubtedly, humans will still initiate code generation, so what kind of interface will that require?

If humans are primarily orchestrators, then IDEs will evolve to focus on managing coding agents instead of editing code. We can see this evolution already happening with GitHub Mission Control[^4] on the web and Visual Studio Code agents panel[^5] and  Google Antigravity[^6] on the desktop.

Both interfaces put agent management front and center, pushing code into the background. The user experience is optimized for quickly scanning agent sessions to see which are pending, complete, or stuck and need intervention. You can also easily switch between different sessions, each represented by a chat interface that allows you to interact and iterate with them all in one place.

In the future, I expect these agent-focused interfaces to evolve to provide ways to combine outputs from different agent sessions into a finished project. I can imagine an IDE that manages creation of the front end, back end, and data layer of an application in separate sessions, then easily incorporates all three into a single, functional codebase.

I think we could see this evolution move quickly, with most IDEs in 2028 being primarily agent-focused.

## From hands-on coding to no-hands-on coding

If agents are primarily responsible for coding, it's not a stretch to think that at some point, humans may not be allowed to code by hand at work. After all, once AI can code better than humans, why would you want a human to touch the code? Doing so would introduce unnecessary risk and increase the potential for bugs.

Think of this as similar to self-driving cars. Once self-driving cars become established and ubiquitous, human driving will be considered dangerous and unpredictable. Insurance rates for human drivers will likely skyrocket due to the risk compared to the alternative. While driving competitions probably won't go away, public streets will be dominated by self-driving cars, nearly guaranteeing safe, traffic-free passage anywhere you want to go. Certain roads may even ban human drivers due to the inefficiencies and associated danger.

Coding will face a similar shift, especially in high-risk systems such as self-driving, medical, and financial. It will be deemed "too important" to leave in human hands. Just as no Fortune 500 company would consider doing its bookkeeping by hand, the idea of leaving such important functionality to fallible humans will seem laughable at best and irresponsible at worst.

Insurance companies will likely force this transition through higher business insurance rates for companies that allow humans to code. Policies already require certain business practices, such as daily backups, to get coverage. These policies are constantly updated to include technical best practices, and at some point, it will be a best practice to ensure no human makes direct edits to source code. All edits must be done through an AI that constantly checks for errors and security problems simultaneously.

This transition is likely to take more time, but I’d bet that we start seeing the first glimpses of this approach as we approach 2030\.

## From code reviewer to task verifier

As I'm writing this, AI is already capable of writing both source code and unit tests for that code. When integration tests already exist, AI is also capable of adding and modifying them. Right now, I haven't experienced AI being able to set up a full integration test environment on its own, though I suspect this will change relatively quickly. The important human value added to the process is reviewing the code to ensure it meets requirements and follows associated best practices. At this stage, the source code serves primarily as a human auditing tool.

Once AI is better than humans at writing code, it will also be better at reviewing code. Reviewing code is a bit more complex than writing it because you (or a model) need the correct context to understand the code. Nevertheless, AI will eventually meet this bar, and at that point, humans will no longer need to review the generated code. Through a series of non-deterministic and deterministic analysis, AI will identify any problems in the code and fix them automatically.

In all likelihood, this will become part of the development process where one agent generates the code and another agent reviews it and provides feedback. The first agent then makes changes to address the feedback, triggering another review. The process continues until the code is deemed acceptable. Google Antigravity already implements something along these lines by having the agent generate and execute a verification plan[^7] after code generation is complete.

When the agents agree on the state of the code, the human's job is reduced to verifying that the requested task is completed as specified. Even this step will rely more on artifacts generated by the agents rather than on reviewing code. For instance, instead of conducting a code review to determine that a button to create a new task was added, an agent will provide screenshots of the relevant new UI and a video showing the new interactions. If there are any problems, the human provides feedback and the coding agent makes the appropriate changes. Google Antigravity has already started down this path by taking screenshots and videos[^8] of UI changes.

The change will be automatically deployed after the human reviewer verifies the task is complete.

Given that this is the way Google Antigravity currently works, I expect this approach to be common in 2028 and the norm by 2030\.

## Future programming languages

“Programs must be written for people to read, and only incidentally for machines to execute.”  
― Harold Abelson, Structure and Interpretation of Computer Programs 

While AI currently uses existing programming languages, I don't think that will necessarily remain the case. The current generation of higher-level languages was created to make programming easier for humans compared to manually executing processor instructions. In a world where humans don't need to write or review code, the utility of these languages is significantly lessened, especially considering the extra tokens necessary to create visually appealing patterns for humans to recognize.

More token-efficient programming languages can certainly be created, allowing AI to generate the same code using fewer resources. We already have Token-Oriented Object Notation[^9] (TOON) as a more token-efficient alternative to JSON for use with LLMs. I don't think new imperative languages are far off. Given the amount of AI-generated code we already have, and how much that will increase in the future, creating languages with more compact syntax could both increase the speed of code generation and reduce the cost.

A common pushback to this point is that AI is only good at coding because it was trained on a massive amount of code spanning decades. That code represents both best practices and common patterns to be mimicked in generated code. While that's true of today's LLMs, I don't think we should assume that all future models will need the same amount of training or sample data to produce functionally equivalent code in a new programming language. LLMs may not end up being the code generation model of choice as AI continues to evolve and new model types are created. It's possible we'll end up with a model that can write excellent code simply by reviewing the language specification and discovering best practices along the way.

In the end, code will be written primarily for computers to execute and only incidentally for humans to read. A full transition to this approach may take until 2035 to have compilers and interpreters for new languages replace existing ones. However, new languages could be developed in the meantime to act as intermediate languages to be transpiled into their final form by deterministic tools.

## From engineering teams to minimum viable engineering teams (MVET)

In the new orchestrator role, a single engineer will guide multiple agents producing code equivalent to multiple engineers. The result will necessarily be smaller engineering teams with the bare minimum number of engineers to get the desired output. I call this a minimum viable engineering team (MVET). How small the MVET will be is based primarily on non-technical factors, such as:

* **Will a single engineer working in isolation be happy and dedicated?** While many engineers claim they wish they could just do all the work themselves without dealing with the messiness of other humans, that might not be the reality. Humans are social creatures, and part of the fun is collaborating with others to solve interesting problems. There may be some minimum team size that's optimal for productive engineers.  
* **What value do companies place on eliminating single points of failure (SPOFs)?** It may be tempting to have a single engineer, especially at a small company or startup, but what if that engineer goes on vacation, gets sick, or leaves? Or, knowing their worth, leverages their position for more pay or other concessions? It may be worth the extra payroll to have redundancy on the engineering team to eliminate this SPOF.  
* **How important are subject matter experts?** Will companies want to hire specialists or generalists? In a complex system, expecting one person to be an expert in all aspects of an application is unrealistic. Companies may still want a front-end expert, a back-end expert, and a database expert to orchestrate the agents associated with those areas.  
* **What kind of a talent pipeline does the company want?** Companies will want some continuity plan for when engineers leave. Having at least one senior and one junior engineer on a task both eliminates a SPOF while planning for a future in which the senior engineer leaves.  
* **Does AI orchestration productivity increase with more engineers?** We may discover that engineers are more effective orchestrators when they have other engineers to collaborate with. Traditional pair programming techniques such as driver-navigator[^10] may reduce errors and produce higher-quality output. Even without following any strict collaboration setup, just having someone else to bounce ideas off of and provide a different perspective may yield better results. In that case, it would benefit the company to have at least two engineers per orchestration.

There will undoubtedly be companies that try to pare down their engineering teams to the bare minimum. My hypothesis is that these companies will suffer as a result and eventually realize that an MVET is never just one person.

Engineering teams will be smaller in the future, but how much smaller will vary by company. I've worked at many companies that overhired engineers because they were focused on the desired lines of code or parallelization necessary for a given project. With so much code needed, it was easy for subpar coders to find and keep well-paying jobs even as they underperformed. These individuals will not have software engineering jobs in the future. AI can already produce better quality code at a much lower cost.

We’ve already seen the transition to smaller teams in 2025, and I think we’ll see a permanent rethinking of engineering team size by 2028\.

## From delivering code to delivering value

So who will have software engineering jobs? In the near term, the engineers who keep their jobs will show an aptitude not just for creating code but also for organizing work. These are typically skills people learn as they progress from junior engineer to senior engineer to tech lead and beyond. At that point, the job becomes less about delivering code and more about delivering value.

Many tech leads are initially frustrated that they need to spend less time coding to take on other tasks like reviewing technical specifications and pull requests, mentoring, and assigning tasks. They're frequently forced to start delegating work that they would otherwise prefer to do themselves. Eventually, though, tech leads relax into this role and understand that they can deliver value in many ways, not just through writing code. In fact, they can act as a multiplier on the team and make everyone else more productive.

Future software engineers will need to behave more like tech leads right from the start of their careers. These are the skills I think will be important going forward:

* **Organization.** Software development using agents means much more work to organize tasks across agents. Engineers will need to develop "flight plans" that map out how work will be split, parallelized, and merged to achieve the desired result. This includes logging and observability work to ensure traceability for agent workstreams.  
* **Communication.** With fewer engineers per team, ironically, communication among humans becomes more important. There will be much more cross-functional communication, and miscommunication is more likely to result in wasted work.  
* **Systems thinking.** Engineers will no longer be able to focus on a particular component in a system. Instead, they'll need to think about how pieces fit together into a greater whole.  
* **Model selection.** Just as engineers today need to understand which languages to use for specific types of problems, we'll also need to know which model is best suited for which types of tasks. Even within a particular model family, it's important to know which generation and variant to use. For example, when is it better to use Claude 3.5 Sonnet vs. Claude 4.5 Haiku?  
* **Prompt engineering.** With all the agent interaction, writing prompts is a key skill. Prompts need to be specific enough to ensure agents aren't wasting time misinterpreting commands. Practices like providing examples and counterexamples, using steps and lists, and breaking complex tasks into individual prompts are all important tools for this role.  
* **Output validation.** Much of an engineer's job will be validating AI output. To do so, we will need to create deterministic workflows that can evaluate it. Engineers must have a good sense of when something is incomplete or error-prone before it deploys to production.  
* **Debugging workflows.** When agents don't produce the desired result or the output isn't working correctly, engineers will need to debug workflows to determine the source of the problem.  
* **Agent-focused information management.** Documentation is critical when agents are doing all the work. Information needs to be structured for AI consumption, and retrieval systems need to be available to agents so they can fetch the up-to-date data they need on demand.  
* **Security.** Making sure agents don't access sensitive systems or fall victim to prompt injection attacks or jailbreaking will be a constant concern. Even cloud agents may be able to escape their sandbox, so this must be taken into account.  
* **Budget management.** Engineers may be given an AI budget on a weekly or monthly basis to keep costs in check. Whether that budget comes in the form of dollars, tokens, or credits, understanding the value you'll get from a specific model's output versus the cost to generate it will likely become an important skill.

Up to this point, the ability to create functional code could land you an entry-level job as a software engineer. With code generation now commoditized through AI, this is no longer the case. The skills companies look for are already changing, making it more difficult for bootcamp-taught individuals to attain jobs. The necessary skills are those that are more difficult to teach and often hard-earned through on-the-job experience. As such, software engineering jobs will likely attract fewer people, as the "fun" part of the job is now being handled by AI and the more manager-like part of the job becomes more important.

This transition is already taking place and I expect it to be mostly complete by 2028\.

## Conclusion

The transition from coder to orchestrator represents a fundamental shift in how software is created. While the timeline for each phase varies, the direction is clear: humans will spend less time writing code and more time directing AI agents to do so. This isn't a distant future scenario. The tools and practices described here are already emerging, with full adoption of orchestrator-based development likely within the next five years.

This shift will be disruptive, particularly for those whose primary value proposition is writing code. Entry-level positions will become scarcer, and the barrier to entry will rise as companies seek engineers with organizational and strategic skills typically acquired through years of experience. However, for those who adapt, the role of software engineer will become more creative and strategic, focused on solving problems at a higher level of abstraction.

The future of software engineering isn't about humans versus AI. It's about humans and AI working together, with humans providing the vision, judgment, and orchestration while AI handles the implementation details. Those who embrace this partnership and develop the skills to thrive in an orchestrator role will find themselves not replaced by AI, but empowered by it.

[^1]: [Conductors to Orchestrators: The Future of Agentic Coding](https://addyo.substack.com/p/conductors-to-orchestrators-the-future)
[^2]: [Cloud Agents](https://cursor.com/docs/cloud-agent)
[^3]: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
[^4]: [GitHub Mission Control](https://github.com/copilot/agents)
[^5]: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview#_manage-agent-sessions)
[^6]: [Google Antigravity](https://antigravity.google/)
[^7]: [Verification Plans in Google Antigravity](https://youtu.be/htV29JrMXmA)
[^8]: [Frontend - Google Antigravity](https://antigravity.google/use-cases/frontend)
[^9]: [TOON - Token-Oriented Object Notation](https://toonformat.dev/)
[^10]: [On Pair Programming](https://martinfowler.com/articles/on-pair-programming.html#Styles)
