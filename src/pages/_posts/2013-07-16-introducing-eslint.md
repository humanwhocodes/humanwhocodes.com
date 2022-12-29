---
title: Introducing ESLint
author: Nicholas C. Zakas
permalink: /blog/2013/07/16/introducing-eslint/
categories:
  - Web Development
tags:
  - ESLint
  - JavaScript
  - JSHint
  - JSLint
  - Linting
---
A long time ago, JSLint was the state of the art in JavaScript linting technology. Then JSHint came along as a fork and took over due to increased flexibility. I welcomed JSHint as my linter of choice and used it everywhere, happily submitting patches and customizing which rules to apply based on the project. At some point I started to feel stifled and frustrated by JSHint as well. There&#8217;s no easy way to add additional rules or to create your own that may be project-specific.

One of the design decisions made on CSS Lint was to make all of the rules pluggable. Each rule would be a standalone file with a standalone test file accompanying it. In this way, it would be easy to incorporate new rules at any point in time and compile them into the final, distributed version. I really wanted the ability to do the same thing, and more, for JavaScript.

After talking with Anton about the possibilities available with JSHint, we both came to the conclusion that it wouldn&#8217;t be possible to do what I wanted. I really wanted an AST to evaluate for context and to be able to dynamically plug in new rules at any time, including run time.

## This is ESLint

And so I somewhat regrettably introduce [ESLint][1]. ESLint is a JavaScript linting tool built on top of Esprima. The goal of the project is to create a linting tool where all rules are pluggable. This is achieved by having one rule per file and allowing each rules to inspect the AST at the points it wants. Additionally, some of the key features:

  * <span style="line-height: 13px;">Easy to create and incorporate new rules by inspecting the AST.</span>
  * Rules can be dynamically loaded at runtime, so if you have a company- or project-specific rule that isn&#8217;t appropriate for inclusion in the tool, you can still easily use them.
  * All rules are turned on and off the same way, avoiding the confusing rule configuration used by JSLint and inherited by JSHint.
  * Individual rules can be configured as warnings, errors, or disabled. Errors make ESLint return a non-zero error code while warnings have a zero exit code.
  * The output format for results is also completely pluggable. There&#8217;s only one formatter now but you can easily create more. These will also eventually be able to be dynamically loaded at runtime.

## How ESLint differs from JSHint

Despite similar goals, ESLint and JSHint have some very specific differences. First and foremost, JSHint uses a progressive parser, finding errors along the way. ESLint uses Esprima, so the parsing is done first and then the rules are applied. That means JSHint will print out warnings up to and including a syntax error where ESLint will show only the syntax error. This makes JSHint much better for use in editors.

ESLint is much better suited for use in build systems and as a general command line utility. It works great for pre-commit hooks.

ESLint is a two-pass utility. The first pass is done by Esprima to parse the JavaScript and the second pass is a traversal of the AST to apply certain rules. JSHint is a single-pass utility, meaning that it will generally be faster.

ESLint is strictly a Node.js utility. JSHint runs on most JavaScript runtimes, including Rhino.

## You can help

The project is in a good enough state that I can now start asking for contributions from others.  What you can do:

  * <span style="line-height: 13px;">Write documentation on the wiki</span>
  * Create new formatters
  * Create new rules (I want to get feature parity with the important JSHint rules)
  * Work on some open [issues][2]
  * Anything else you want

I want the development of ESLint to be as open as possible and accept as many contributions as possible. I&#8217;ve already started a [Developer Guide][3] to help people get started, but what the project really needs is contributions from the community.

I&#8217;m excited about this project, as I believe it&#8217;s providing a key missing piece in the JavaScript toolchain. The ability to create arbitrary rules for your project in a standard way is a powerful capability that enables a whole host of possibilities. I&#8217;m already planning to get this into our JavaScript workflow at Box, and I hope others will do the same.

 [1]: https://github.com/nzakas/eslint
 [2]: https://github.com/nzakas/eslint/issues
 [3]: https://github.com/nzakas/eslint/wiki/Developer-Guide
