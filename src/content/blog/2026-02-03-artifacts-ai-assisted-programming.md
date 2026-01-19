---
title: "The importance of artifacts in AI-assisted programming"
teaser: "Your AI pair programmer has no memory, which is why proper documentation matters more than ever in AI-assisted development."
author: Nicholas C. Zakas
image: /images/posts/2026/ai-artifacts.png
categories:
  - Programming
tags:
  - AI
  - Specifications
  - PRDs
  - ADRs
  - Artifacts
---

Much of the hype around AI-assisted programming focuses on "vibe coding," which means working prompt by prompt to build an application without worrying too much about the generated code. As long as something works, that's all that matters. While this approach works well for personal and hobby projects, it's impractical for professional software engineering

Professional software engineering involves a team of developers working on a shared codebase that's maintained over time. This creates concerns that go beyond whether the code is working. Significant changes need to be documented to provide traceability when something goes wrong. *Traceability* is the ability to look through changes and track them back to their root cause, whether that's a bug fix, a requirements change, or a new feature. Understanding why a change was made, especially one that caused a problem, is essential for maintaining an application over time. That's why professional software organizations prioritize creating artifacts as the application evolves.

## What are artifacts?

An *artifact* is any output that's created, used, or modified during the software development process. Issues and pull requests are artifacts, as are diagrams, documents, mockups, and the code itself. Most software teams generate a large number of artifacts, which represent an important part of the process. When something goes wrong, artifacts provide traceability to help determine the origin of the problem.

When I was learning software development in college, the focus was on front-loading document artifacts to ensure you knew what you were building. We had to create a functional requirements document (FRD, now often called a product requirements document or PRD) describing what the project or feature would do. Then we had to create a technical specification describing the overall design of the code changes. Only once these two documents were complete could we write any code. This is called the *waterfall approach*, where each stage must be completed before the next can begin.

With agile methodologies becoming more popular, many teams saw this as license to forego the PRDs and tech specs, and instead "just start coding." The focus on iterative development, where software is never truly "complete," meant that these document artifacts took precious time away from the development process. Many teams convinced themselves that two-sentence issue summaries and face-to-face discussions with product managers were enough to implement good software. Documents like PRDs and tech specs became rare in technology companies (outside of high-level architecture and infrastructure discussions, which often had extensive specifications and diagrams). The argument was that if you had a question about why something was done a particular way, you could just ask the person who did it.

## Your AI teammate's forgetfulness

When AI-assisted programming began, developers quickly realized that the models didn't always produce reliable results. Far from deterministic, the models may produce wildly different output when prompts aren't specific enough. AI-powered IDEs do their best to provide additional context to the models to make output more reliable, yet developers continue to find that longer prompts produce better results.

Here's the problem: Your AI pair programmer has a very short memory. It can't tell you why it made a decision six months ago that brought down your server today. Human programmers are both implementers and stores of knowledge, while AI is only an implementer. The model doesn't provide traceability beyond the scope of its current context window. If you "vibe coded" an implementation and your server goes down, there's no way to tell why. Did the model generate insecure code that left the server vulnerable to attack? If so, why? Did it not know the code had to be secure? Was it something in the original prompt that led it to believe the code didn't need to be secure? There's no way to know what part of the process broke down, which means additional time spent before the problem can be addressed and a higher likelihood of a similar problem in the future.

With the proper artifacts available, however, the investigation proceeds quickly and systematically. Because some artifacts are used directly as prompts, it's much easier to discover where an ambiguity might have led a model to make an incorrect decision. The type of artifacts you use and the level of detail in each are important for this process.

## Artifacts for AI-assisted programming

While there are many different artifacts that can be useful for AI-assisted programming, I’ve found the following to be among the most important:

* Product requirements documents (PRDs)  
* Architectural decision records (ADRs)  
* Technical design documents (TDDs)  
* Task lists

These artifacts allow you to step back through the development process and, if there’s a problem, better determine what went wrong and how to address it.

**Recommendation:** Store these artifacts in your source control system for easy reference and to track changes as they’re made.

### Product requirements documents (PRDs)

A product requirements document[^1] tells you *what* you're building and *why* you're building it without digging into *how* it will be built. In traditional software engineering, a product manager conducts research to discover what use cases need to be addressed by a feature or product. This may involve user studies, interviews, market research, or other fact-finding processes. The product manager then synthesizes the data into a set of requirements to address the findings and presents that information to the software engineering manager or lead for review and implementation.

PRD formats vary from organization to organization, but they generally contain this type of information:

* **Background** \- Contains necessary context to understand what the PRD is describing. This may be a problem statement or an explanation of a use case to be addressed.  
* **Goals** \- What the requirements are meant to address.  
* **Target Audience/Personas** \- The intended users of the functionality.  
* **Functional Requirements** \- Describes what the changes do.   
* **User Stories** \- Describes what a given user or persona experiences when using this functionality. (For example, “As a user, I want to see my task list when I log in.”)  
* **Constraints** \- Factors that limit the solution space or otherwise constrain what can be accomplished with this PRD.  
* **Success Metrics** \- The measurable data indicating that the goals have been achieved.

You can review the PRD at any point to ensure that the technical design and implementation are proceeding correctly. This is especially helpful when you’re deep into implementation and there’s disagreement on whether the functionality works as intended.

Use AI to:

* Create the PRD from a feature or product description  
* Review the PRD for inconsistencies or ambiguities  
* Ensure alignment of goals and features

In AI-assisted programming, the PRD is a key input the AI uses to develop a technical design. If there are errors in the PRD, then the ensuing technical design will also contain errors, so it’s important to review a PRD thoroughly to catch any problems. It can be helpful to use one AI to write the PRD and another to review it for inconsistencies or ambiguities.

## Architectural decision records (ADRs)

An architectural decision record[^2] explains *why* a technical choice was made. While the word “architectural” is in the name, ADRs don’t need to be tied specifically to architectural decisions. Any given project has the potential to yield a number of important technical decisions, such as:

* Do we use a SQL or NoSQL database?  
* Which cloud infrastructure provider do we use?  
* Which framework do we use?  
* What programming language do we use for APIs?

These decisions are made by humans and likely will remain the domain of humans for quite some time, as these choices often depend on business context to be made correctly.

An ADR typically has the following sections:

* **Title** \- A brief description of the decision.  
* **Status** \- Whether the decision is pending, approved, deprecated, or superseded.  
* **Context** \- Any relevant background information about the decision, including references to other artifacts.  
* **Decision** \- The decision that was made.  
* **Consequences** \- Both the positive and negative consequences of the decision.  
* **Alternatives Considered** \- Any other options and the reasons for rejection.

ADRs are especially beneficial because they remain immutable. The reason why a decision was made doesn’t change. Even as PRDs and TDDs are corrected during implementation to clear up inconsistencies, the ADRs remain as they were. The only potential change is when an ADR status changes (from accepted to deprecated or superseded). 

Use AI to:

* Generate a first draft of an ADR based on a decision  
* Propose alternatives during the decision-making process  
* Identify potential consequences  
* Find related ADRs

Not all features require ADRs, especially when building on top of an existing framework or architecture. However, when a significant technical decision is made, documenting it as an ADR provides additional inputs for generating a good TDD and traceability when reviewing the TDD.

## Technical design documents (TDDs)

A technical design document[^3] describes *how* the functionality described in a PRD is implemented. In some companies, this is called an architectural design document or technical specification, but the underlying purpose is the same: to give a high-level overview of the software solution that fulfills the requirements of the PRD. In traditional software engineering, a tech lead or architect is responsible for reviewing a PRD and developing an appropriate technical design. The design is then reviewed by other developers to gather feedback and ensure the scope is correct.

Typical sections in a TDD include:

* **Overview** \- What the design is meant to cover.  
* **Goals** \- Specific technical goals to achieve with the design. (As opposed to functional or business goals, which are described in the PRD.)  
* **Background/Context** \- Any relevant technical information related to the design, such as existing infrastructure or design patterns to be followed.  
* **Requirements** \- Specific functional (what the system should do) and non-functional (how the system should behave) technical requirements. Non-functional requirements include security, scalability, performance, and reliability.  
* **High-Level Design/Architecture** \- Describes the technical resources required and how they relate to one another.  
* **Data Design** \- Any new or existing data sources required. Traditionally, this would involve an entity-relationship diagram.  
* **API Design** \- The interaction points between existing systems or users and the new design.  
* **Technology Stack** \- The languages, frameworks, tools, infrastructure, etc., necessary to implement the design.  
* **Security Considerations \-** Guidelines for how security best practices are followed.  
* **Scalability/Performance** \- How the system will work under heavy load, including anticipated performance bottlenecks and mitigations.  
* **Testing Strategy** \- What types of tests (unit, integration, etc.) will be used.  
* **Deployment Plan** \- How the system will be made available to users.  
* **Monitoring/Observability** \- How you’ll know if the system is functioning correctly once deployed.  
* **Out of Scope** \- Anything that’s explicitly not included in the design and won’t be completed as part of this work. This ensures time isn’t wasted by someone (or an AI) inferring a requirement that wasn’t explicitly stated.  
* **Alternatives Considered** \- Any other approaches that were considered and discarded. This helps answer the question, “Did you think about X?” when it inevitably comes up later.

The overall purpose of a TDD is to ensure that all the complexities of a software design are taken into account up front, before implementation begins. Catching problems at this stage is significantly cheaper than discovering the same problems during implementation, in which case you often need to undo work.

Use AI to:

* Create the TDD from the PRD and any relevant ADRs.  
* Review the TDD against the PRD to look for inconsistencies, omissions, and errors.  
* Simultaneously update the PRD and TDD to resolve any issues found.

In AI-assisted programming, the TDD is the last stop before implementation planning, so it’s critical to catch any problems with the technical design here. AI should be able to implement the design using the TDD in conjunction with the PRD and the codebase (IDEs automatically pass the codebase as context to AI). However, it’s often best to generate a task list from the TDD instead of jumping right into implementation.

## Task lists

In traditional software engineering, the next step after creating a TDD is for the tech lead, engineering manager, and potentially other engineers to break down the design into a series of tasks. The tasks are then scoped to determine the effort required for each task (and potentially a time estimate) and arranged in sequence to ensure that each task can proceed without being blocked by incomplete tasks. The tasks are then assigned to different engineers on the team for implementation.

For AI-assisted programming, it’s helpful to add even more context than a human would need to complete a task. For human programming, tasks frequently contain a small amount of information and then refer back to the TDD. For AI implementation, each task should contain:

* **Overview/Description** \- The purpose of this task.  
* **Deliverable** \- The expected output of the task.  
* **Dependencies** \- How it relates to other tasks.  
* **Acceptance Criteria** \- How to verify that the task is complete and working as expected.  
* **References** \- Specific sections in the PRD and TDD that this task addresses.  
* **Out of Scope** \- Anything you specifically don’t want completed as part of this task.  
* **Tips** \- Anything additional that will help a human or AI implement the task (libraries to use, existing code to reuse, resources needed, etc.).

Use AI to:

* Convert a TDD into a list of tasks.  
* Estimate the relative effort associated with each task.  
* Create issues or tickets in your task management software for each task.  
* Verify that the task list completely implements the TDD.

In AI-assisted programming, generating a task list from the TDD makes it easier to:

1. Validate that the entire TDD is represented in the tasks.  
2. Catch gaps or ambiguities in the TDD.  
3. Use AI to implement one task at a time to reduce context size and verify task completion.  
4. Pause and resume work as necessary.  
5. Iterate on individual tasks when the output isn’t as expected.  
6. Track implementation progress, especially across multiple days or sessions.

## Example: “Save for later” feature

A “save for later” feature was implemented by AI as part of an online shopping cart. Users are complaining that the items they save are disappearing soon after they’re added, often within one day. There seems to be some confusion on the team, as everyone agrees this isn’t the desired behavior.

The investigation starts by looking at the PRD, which states the following:

* **Requirement**: Users should be able to save items for later and access them anytime they return to the site.  
* **Success metric**: Increase conversion rate by letting users defer purchase decisions.  
* **User story**: As a shopper, I want to save items so I can think about purchases without losing track of products I'm interested in.

The PRD clearly states that saved items should be accessible “anytime they return to the site.” That means the data is meant to persist and the implementation is out of alignment with the PRD. The next step is to review the TDD.

The TDD references two ADRs:

* The *Storage for “save for later” items* ADR indicates that PostgreSQL will be used to store the data. PostgreSQL is a persistent data storage mechanism, so we know the data isn’t missing, just unavailable.  
* The *Caching for “save for later” items* ADR indicates that Redis will be used as an in-memory cache for “save for later” items to speed up UI rendering.

Further down in the TDD:

* **Data design:** Saved items are stored in PostgreSQL `saved_items` table and Redis with key pattern `saved:{user_id}`.  
* **Implementation details:**  
  * Default Redis TTL: 86400 seconds (24 hours) to prevent unbounded growth.  
  * `POST /saved_items` endpoint writes to both PostgreSQL and Redis.  
  * `GET /saved_items` endpoint reads from Redis for better performance.

While each piece of the TDD is technically correct, there’s a key missing detail: the `GET /saved_items` endpoint needs to implement a read-through cache so if the data doesn’t exist in Redis it will be fetched from PostgreSQL and then repopulate the cache. Users are seeing their saved items disappear not because they’re being deleted, but because the Redis cache is empty and the entrypoint then didn’t fetch the data from PostgreSQL.  
   
AI missed this crucial detail when generating the TDD. In all likelihood, human reviewers didn’t catch the omission because a read-through cache was implied by the surrounding details. When AI generated a task list from the TDD, a read-through cache was never explicitly planned for or implemented.

In this case, the TDD generation needed information in addition to the PRD and ADRs to generate the correct design. The team can update the prompt used for this portion of the development process to reduce the likelihood of a similar error of omission in the future. For example, a document describing how the team typically uses read-through caches for PostgreSQL and Redis can be added to the context of TDD generation.

Without the artifacts to review, it would be difficult to track down the source of the error and prevent similar errors in the future.

## Conclusion

AI-assisted programming offers tremendous potential to accelerate software development, but it requires a fundamental shift in how we approach the development process. The "vibe coding" approach that works for quick prototypes becomes a liability in professional settings where maintainability, traceability, and long-term success matter. Unlike human developers who remember why decisions were made, AI has no memory beyond its current context window, making comprehensive documentation essential rather than optional.

By creating and maintaining proper artifacts (such as PRDs, ADRs, TDDs, and task lists), you build a knowledge foundation that compensates for AI's lack of memory. These artifacts serve dual purposes: they guide AI toward better implementations during development and provide the investigative trail you need when problems occur. When your server goes down at 3 a.m., these artifacts let you quickly trace the issue back to its source, whether that's an ambiguous requirement, a flawed technical decision, or a gap in the implementation. They transform AI from an unpredictable code generator into a reliable development partner.

The investment in documentation may seem like it slows down initial development, but it pays dividends when you need to debug problems, onboard new team members, or understand decisions made months or years ago. In a world where AI is increasingly involved in writing code, the artifacts you create become even more valuable than the code itself. You'll likely find that the process not only improves your AI-generated code but also clarifies your own thinking about the problem you're solving. Start with your next feature and experience the difference proper artifacts make.

[^1]: [Product requirements](https://www.atlassian.com/agile/product-management/requirements)
[^2]: [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
[^3]: [Technical Design Document Template](https://www.chatprd.ai/templates/technical-design-document-template)
