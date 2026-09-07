---
title: "Five software engineering roles for working with AI"
teaser: "Software engineers can work with AI in different ways, from observing every change to managing an entire software factory."
author: Nicholas C. Zakas
image: ai-roles.png
categories:
  - Programming
tags:
  - AI
  - Software Development
  - Productivity
  - Collaboration
---

Four years into the AI boom, the way software engineers interact with AI is still evolving. We've moved from better code completion to autonomous agents that triage incoming bug reports, determine root causes, and deploy fixes. Along the way, developers have divided over how much interaction is required to produce high-quality outcomes. Some prefer a direct, hands-on approach, while others prefer to stay hands-off.

In reality, there's a wide spectrum of possible interaction models between humans and AI. I like to think of these models as the familiar collaboration roles I've experienced in my career.

## Observer (pair programmer)

Human pair programmers traditionally sit next to each other at a computer. One person is the *driver*, who writes the code, and the other is the *observer*, who reviews it in real time. These days, pair programming can also happen remotely through screen sharing. When working with AI, you can take the observer role and actively watch as it writes code. You can stop and ask why it did something, point out when it didn't follow instructions, and verify that the work is complete.

This is where most traditional software engineers start, and where some stay because they don't quite trust AI. You aren't sure what to expect from AI or whether you can trust the code it produces. AI can improve your productivity modestly because you no longer need to type every character, but your throughput remains limited by your capacity to read and review code as it's written.

The primary challenge of this role is review fatigue. Reading every line of code AI produces can be exhausting, especially because it can produce code quickly. To counter that, alternate between periods when you're the driver and periods when you ask AI for feedback or to write code you know you need.

## Tech lead

As a human tech lead, you often aren't directly involved in producing most of the code. Your job is to organize other engineers' efforts and review their work at the end. You may write or review technical specifications at the start and then let others implement them. This allows work to happen in parallel without making you a bottleneck that slows the team down. You trust that your coworkers will generally do the right thing with sufficient automation, and you verify that later by approving pull requests.

You can assume the tech lead role with AI by doing the same: write technical specifications, check that automation catches the most egregious problems, and then let an agent implement them. Circle back when the agent has completed its work. At that point, review the generated code and verify that the work was completed correctly. If not, give feedback to the agent and repeat the process.

In this role, you start to multiply productivity because, just like a human tech lead, you can have multiple simultaneous workstreams without direct involvement. You kick off all the workstreams and return at the end to review the work.

As with the observer role, review fatigue is the primary challenge. This is where investing in automation pays off. Automated code formatting ensures that AI-generated code matches your conventions. Automated linting checks that the code is correct and follows established conventions. Automated tests with minimum code coverage requirements ensure that tests are written and properly exercise the code. The more automation you have, the less hands-on review is necessary and the more confidence you can have in what you're merging.

## Architect

As a human architect, you tend to be more involved with high-level design and less involved in implementation details. You are primarily concerned with the overall system layout, the interfaces between components, and the infrastructure and frameworks used to implement the design. You hand off these details to engineers and check back only to ensure that the prescribed contracts have been upheld.

When you assume the architect role with AI, you're no longer reviewing most of the code. Instead, you focus on the overall design to determine whether it matches your expectations. You generally assume that individual components will work because a tech lead has established good guidelines for building and testing them. You're more interested in the complete system when the work is done, so you look more at the architecture and logs than at the code.

The challenge of the architect role is being too far removed from the code. You may understand how everything works structurally, but if something goes wrong, you won't have the ground-level knowledge to understand why or how to fix it. That's why it's helpful to spot-check some of the generated code and tests.

## Engineering manager

As a human engineering manager, your primary job is to ensure that the engineering team is well organized and stays on track to deliver scheduled work. Engineering managers gather context by interacting with the team, sitting in on meetings, reading technical specifications, and watching commits as they land. Good engineering managers understand how the codebase is evolving, where bottlenecks may occur, and where potential problems lie. They are often standard bearers for practices such as instrumentation and code coverage. Although they may give feedback in different areas, they typically don't have code-related deliverables beyond those assigned to the team as a whole.

When you assume an engineering manager role with AI, you spend your time assembling a software factory. You aren't going to review each decision or commit. Instead, you define the exact process by which the software will be created. Perhaps you have a formal process that starts with a product requirements document (PRD), which is turned into a technical specification and then an implementation plan. Once the plan is in place, you assign tasks to different agents along with acceptance criteria. In short, you set everything up to run as smoothly as possible without getting in the middle of the work.

As with the architect role, the challenge here is being too far removed from the code. Presumably, you trust the software factory process to consistently produce good output. But what if it doesn't? An engineering manager's first instinct is to refine the process and restart. This may work, but it can also lead to additional cycles that a more hands-on approach could solve faster. Fortunately, engineering managers are typically closer to the code than architects, so many can manage when necessary.

## Product manager

Human product managers are primarily responsible for defining the user experience. They typically work with designers to create the user interface and then with engineers to bring the UI to life. They research users, understand their pain points and desires, and craft products that fulfill their needs. Product managers are at the top of the software development funnel, where ideas start and filter down into the product. As such, they don't usually care how something is implemented, only that it provides the appropriate user experience. If all user stories are fulfilled without obvious bugs, the product manager's work is done.

When you adopt the product manager role with AI, you've decided not to focus on the technical details. You are focused primarily on the end result. As long as the application works as intended, you're happy. That means focusing more on the product's look and feel and the user journey. You aren't necessarily a vibe coder because you've completed the same work you would have done with a human engineering team. The research and user testing are all valuable and enrich the decisions you make.

The primary challenge here is technical: if something breaks, you'll have no idea how to fix it and may need to hire someone to help. You can try to get AI to fix the problem, but if AI caused it in the first place, it's more likely to apply a band-aid than find and fix the root cause. This leaves you forever at the mercy of others, human or AI, to keep the ship afloat. That may be an acceptable trade-off, depending on your point of view.

## Conclusion

None of these roles is inherently better than the others. The right choice depends on how much you trust the AI, how risky the work is, and how much technical context you have. You might act as an observer while exploring an unfamiliar codebase, a tech lead when coordinating several workstreams, or a product manager when you care most about the user experience. The important thing is to choose deliberately and recognize when the situation calls for a more hands-on approach. As your confidence and the AI's capabilities grow, you can move along the spectrum without giving up responsibility for the result.
