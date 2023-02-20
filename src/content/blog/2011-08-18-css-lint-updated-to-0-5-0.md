---
title: CSS Lint updated to 0.5.0
author: Nicholas C. Zakas
permalink: /blog/2011/08/18/css-lint-updated-to-0-5-0/
categories:
  - Web Development
tags:
  - CSS
  - CSSLint
---
After a slight delay to figure out some UI changes, the 0.5.0 release of CSS Lint has now made it to [csslint.net][1]. As with previous releases, this release saw a mixture of bug fixes and new features. The biggest change you'll notice on the web site is that rules are now categorized based on how they help your code. We received a lot of feedback that you weren't sure why some rules were there. We hope that categorizing the rules will help clear up some of that confusion (there's more documentation coming, we promise!). There were also a lot of changes under the hood, here are the highlights:

  * cssguru [pointed out][2] that the `!important` rule didn't tell you how the target usage count. That has been addressed.
  * Eric [created][3] a one-line-per-file output format that matches JSHint's output format.
  * Senthil [discovered a problem][4] with the Rhino CSS Lint CLI where directories were not being read. The CLI has now been fixed and directories can be recursively read once again.
  * The CSS parser now correctly supports CSS keyframe syntax and [CSS escaping][5].
  * cssguru [also argued][6] that having too many important declarations should not be an error. After some discussion, we agreed, and this is now a warning.
  * mahonnaise [suggested][7] that a rule to detect the universal selector would be a good addition to the tool. We agreed, and 0.5.0 now warns when using the universal selector as the key selector.
  * Oli [found a bug][8] in the box model rule where valid box model settings are flagged as problematic. This issue has been resolved.
  * I [added a rule][9] that checks for known CSS properties and warns if the property is unknown. Vendor-prefixed properties are considered exceptions to this rule.
  * Nicole [added a rule][10] that warns when a large negative `text-indent` is used without first setting the `direction` to `ltr`.

Of course, there are other miscellaneous fixes and tweaks that have gone into this release. If you're using CSS Lint for Node.js, you can update by typing:

    npm update csslint

And please keep sending in your bugs and suggestions over on [GitHub][11] as well as asking questions on the [mailing list][12]. Your feedback has been invaluable in making this tool even better.

 [1]: http://www.csslint.net
 [2]: https://github.com/stubbornella/csslint/issues/104
 [3]: https://github.com/stubbornella/csslint/issues/88
 [4]: https://github.com/stubbornella/csslint/issues/106
 [5]: https://github.com/stubbornella/csslint/issues/97
 [6]: https://github.com/stubbornella/csslint/issues/105
 [7]: https://github.com/stubbornella/csslint/issues/38
 [8]: https://github.com/stubbornella/csslint/issues/135
 [9]: https://github.com/stubbornella/csslint/issues/136
 [10]: https://github.com/stubbornella/csslint/issues/109
 [11]: https://github.com/stubbornella/csslint/issues/
 [12]: http://groups.google.com/group/css-lint
