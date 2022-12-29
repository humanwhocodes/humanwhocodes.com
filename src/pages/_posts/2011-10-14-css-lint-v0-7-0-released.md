---
title: CSS Lint v0.7.0 released
author: Nicholas C. Zakas
permalink: /blog/2011/10/14/css-lint-v0-7-0-released/
categories:
  - Personal
tags:
  - CSS
  - CSSLint
---
I&#8217;m happy to announce that version 0.7.0 of CSS Lint is now available on the [web site][1], via [GitHub][2], and through [npm][3]. This release focused very heavily on two things: documentation and stabilization.

For documentation, we&#8217;ve moved everything over onto a [wiki][4], which allows us to quickly and easily update the documentation and more as we go. All prior documentation on the site as well as in the source code repository has been moved to the wiki. As part of the move, there is a long (and growing) [Developer Guide][5] to help you get started with contributing to the project.

Other notable changes in this release:

  * Improvements to the build tool now allow you to run JSHint via one command on the entire codebase as well as run unit tests on the command line. See the [Developer Guide][5] for more information.
  * Mahonnaise [pointed out a problem][6] with the parser API design that prevented easy addition of rules on the fly. That issue has been fixed.
  * Brent Lintner both [suggested and implemented][7] a `--quiet` option for the command line interfaces.
  * I noticed an [issue][8] with the Node.js CLI where output couldn&#8217;t be captured on the command line. In the process of investigating, I discovered it to be a bug in Node.js and implemented a workaround. Unfortunately, that workaround cause [another issue][9], reported by Grepsey, that led to another fix.
  * I updated the CSS parser to handle [IE filters correctly][10] and also to fix [incorrect comment parsing][11] as reported by andywhyisit.
  * Eric Wendelin continued his excellent work on the CLI by changing the API to accept and [output relative paths][12] by default instead of absolute paths. This does mean the output formats have changed slightly, but we think there shouldn&#8217;t be any issues related to that.

Thanks once again to all of the great feedback and contributions we&#8217;ve been receiving from the growing CSS Lint community.

 [1]: http://www.csslint.net
 [2]: http://github.com/stubbornella/csslint
 [3]: http://npmjs.org
 [4]: https://github.com/stubbornella/csslint/wiki
 [5]: https://github.com/stubbornella/csslint/wiki/Developer-Guide
 [6]: https://github.com/stubbornella/csslint/issues/153
 [7]: https://github.com/stubbornella/csslint/issues/170
 [8]: https://github.com/stubbornella/csslint/issues/175
 [9]: https://github.com/stubbornella/csslint/issues/182
 [10]: https://github.com/stubbornella/csslint/issues/174
 [11]: https://github.com/stubbornella/csslint/issues/184
 [12]: https://github.com/stubbornella/csslint/issues/172
