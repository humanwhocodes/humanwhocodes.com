---
title: CSS Lint v0.8.0 now available
author: Nicholas C. Zakas
permalink: /blog/2011/10/24/css-lint-v0-8-0-now-available/
categories:
  - Personal
tags:
  - CSS
  - CSSLint
---
I’m happy to announce that version 0.8.0 of CSS Lint is now available on the [web site][1], via [GitHub][2], and through [npm][3]. This release focused very heavily on two things: documentation and web UI improvements.

The documentation work has continued over on the [wiki][4], where we've added some initial documentation on [using CSS Lint in a build system][5] (we'd love contributions to this, by the way). The [Developer Guide][6] has been reorganized to be more useful and more details have been added regarding tests and rule creation. The [rules documentation][7] has also had a facelift as part of our ongoing efforts to improve documentation around rules.

Other notable changes in this release:

  * Based on a [suggestion][8] from Kevin Sweeney, the web UI now remembers your settings in between visits.
  * You can also specify which rules to use as a hash in the URL for the web UI. For example, <http://csslint.net#warnings=ids,import,important>. The hash is automatically updated whenever you change which rules you're applying, so it's easy to copy-paste the URL to a friend and share your favorite settings.
  * Eric Wendelin [added][9] an error/warning indication to the compact CLI output format. As a bonus, you can copy the hash and use it with the CLI.
  * Based on a [suggestion][10] from Mahonnaise, you can now configure warnings and errors by rule in the CSS Lint CLI. You can now specify `--warnings` and `--errors` with lists of rules. The `--rules` option is deprecated. For more, checkout the [CLI documentation][11].
  * After a [lengthy debate][12], the Broken Box Model rule has been renamed to the Box Model Sizing rule to better indicate the rule's intent.
  * The rules that checks for known properties got smarter. Instead of just checking property names, it also checks their values. Not all properties are supported yet, but CSS Lint is now capable of helping you out with a large number of properties.
  * **New Rule**: The `box-sizing` rule warns when `box-sizing` is used ([rule documentation][13]).
  * **New Rule:** Our first accessibility rules warns when you use outline: none ([rule documentation][14]).

Thanks once again to all of the great feedback and contributions we’ve been receiving from the growing CSS Lint community.

 [1]: http://www.csslint.net/
 [2]: http://github.com/stubbornella/csslint
 [3]: http://npmjs.org/
 [4]: https://github.com/stubbornella/csslint/wiki
 [5]: https://github.com/stubbornella/csslint/wiki/Build-System-Integration
 [6]: https://github.com/stubbornella/csslint/wiki/Developer-Guide
 [7]: https://github.com/stubbornella/csslint/wiki/Rules
 [8]: https://github.com/stubbornella/csslint/issues/177
 [9]: https://github.com/stubbornella/csslint/issues/152
 [10]: https://github.com/stubbornella/csslint/issues/157
 [11]: https://github.com/stubbornella/csslint/wiki/Command-line-interface
 [12]: https://github.com/stubbornella/csslint/issues/168
 [13]: https://github.com/stubbornella/csslint/wiki/Disallow-box-sizing
 [14]: https://github.com/stubbornella/csslint/wiki/Disallow-outline%3Anone
