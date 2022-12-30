---
title: CSS Lint v0.6.0 now available
author: Nicholas C. Zakas
permalink: /blog/2011/09/03/css-lint-v0-6-0-now-available/
categories:
  - Web Development
tags:
  - CSSLint
---
Following quickly on the heels of the v0.5.0 release, here comes the v0.6.0 release. This release saw a lot of activity around bug fixing, refactoring to make things easier, and documentation. Some of the highlights of this release:

  * **New Rule**: Mike Hopley [suggested][1] we add a rule that could suggest shorthand properties when all dimensions of `margin` and `padding` were provided as separate properties. That rule has been added.
  * Kasper Garnæs and Tomasz Oponowicz each [contributed some cleanup code][2] to the various XML formats the CLI supports, ensuring that proper escaping happened.
  * Kasper also [submitted the `checkstyle-xml` output format][3] for use with Checkstyle.
  * Cillian de Róiste [contributed a fix][4] for the Node.js CLI that ensures it will now handle absolute file paths correctly.
  * Eric Wendelin [implemented the `csslint-xml` output format][5] for compatibility with Jenkins Violations.
  * Julien Kernec'h [added some missing CSS properties][6] to the rule that checks for valid properties.
  * I took a first pass at creating a [developer guide][7] for CSS Lint, explaining how the code is organized and how the build system works.

The complete changelog can be found at [GitHub][8]. If you're using the Node.js version of CSS Lint, you can update your version via:

    npm update csslint

Please keep those submissions and issues coming. The [GitHub issue tracker][9] is the best way to get our attention. We'd also love to hear about how you're integrating CSS Lint into your build system, feel free to drop us a line on the [mailing list][10] and tell us what you've been up to.

 [1]: https://github.com/stubbornella/csslint/issues/66
 [2]: https://github.com/stubbornella/csslint/pulls/171
 [3]: https://github.com/stubbornella/csslint/pulls/156
 [4]: https://github.com/stubbornella/csslint/pulls/167
 [5]: https://github.com/stubbornella/csslint/pulls/161
 [6]: https://github.com/stubbornella/csslint/146
 [7]: https://github.com/stubbornella/csslint/blob/master/release/docs/developer-guide.md
 [8]: https://github.com/stubbornella/csslint/blob/master/CHANGELOG
 [9]: https://github.com/stubbornella/csslint/issues/
 [10]: http://groups.google.com/group/css-lint
