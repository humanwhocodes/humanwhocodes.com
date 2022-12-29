---
title: 'Now available: ESLint v0.1.0'
author: Nicholas C. Zakas
permalink: /blog/2013/11/04/now-available-eslint-v0-1-0/
categories:
  - Web Development
tags:
  - Code Quality
  - ESLint
  - JSHint
  - JSLint
---
It was four months ago when I [announced][1] the start of the ESLint project. My initial goal was to create a fully-pluggable JavaScript code quality tool where\ every single rule was a plugin. Though I like and appreciate JSHint, the inability to be able to define my own rules alongside the existing ones was keeping several of my projects from moving forward. After doing an initial prototype using Esprima, I was convinced this idea would work and started building ESLint one weekend. 

## Contributions

Since that time, I&#8217;ve been joined by 28 contributors who have implemented new rules, fixed bugs, wrote documentation, and otherwise contributed to the ongoing development of ESLint. Without their help, it probably would have taken several more months to reach the point we&#8217;re at now. I&#8217;d like to especially call out the work of Ian Christian Myers, Ilya Volodin, Matt DuVall, James Allardice, and Michael Ficarra for their constant and ongoing work, participation in conversations, and dedication to the project.

## Alpha release

Today I&#8217;m excited to announce version 0.1.0 is available. This is the first alpha version that is ready for people to start using and give us feedback on. Up until this point, the tool was in a state of constant flux and I didn&#8217;t feel comfortable recommending anyone use it. I wanted to get ESLint as close to the ruleset of JSHint before deeming it ready for use, and we are finally there. We have (as best we can tell), nearly 100% coverage of the JSHint rules that don&#8217;t apply to formatting (white space and other code convention rules). 

Here&#8217;s what this release gives you:

  * Most of the JSHint rules (that don&#8217;t apply to formatting issues)
  * New rules can be loaded at runtime
  * Specification of shared settings using `.eslintrc` files
  * Configure rules as disabled, warnings, or errors
  * Output results as Checkstyle, compact, JSLint-XML, or JUnit formats
  * 95% or higher code coverage for statements, branches, functions, and lines

## Known issues

As this is an early alpha release of ESLint, there are some issues we are aware of that need addressing:

  * **Performance** &#8211; on large files, ESLint can be around 3x slower that JSHint. This has to do with the number of times we are traversing the AST to gather information. We will be focusing on reducing these traversals to speed up execution.
  * **Edge cases** &#8211; there are almost certainly edge cases for each rule that we have not accounted for. We spent a lot of time looking through JSHint and JSLint code to try and figure out exact patterns to catch. If you find an edge case, please let us know.
  * **No web UI** &#8211; this is on the roadmap, and we are looking for someone to lead this initiative.
  * **Documentation gaps** &#8211; we have some good [documentation][2] but there are definitely some gaps. We will be working on filling those gaps.

## Things that may change

Since this is the first alpha release, there are several things that may change going forward. Some of the potential changes are:

  * Removal of rules that don&#8217;t make sense
  * Renaming of rules
  * Splitting up of rules into more granular rules
  * Internal API changes (developers &#8211; be careful)
  * Internal Testing framework changes

Whenever possible, we will make changes in a backwards-compatible manner, but given the early stage of this project I can&#8217;t make any promises in this regard.

## Installation

ESLint runs exclusively on Node.js, and is best installed using npm:

    npm i -g eslint@0.1.0

ESLint requires Node.js 0.8 or higher.

## Feedback

At this point, what we really need is feedback from you. You can send in general feedback to the [mailing list][3] or [file an issue][4] if there&#8217;s a problem or you&#8217;d like to request a feature. Your input will help us make ESLint even better going forward.

 [1]: {{site.url}}/blog/2013/07/16/introducing-eslint/
 [2]: https://github.com/nzakas/eslint/tree/master/docs
 [3]: http://groups.google.com/group/eslint
 [4]: https://github.com/nzakas/eslint/issues
