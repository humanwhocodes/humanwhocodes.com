---
title: CSS Lint v0.9.2 now available
author: Nicholas C. Zakas
permalink: /blog/2012/01/05/css-lint-v0-9-2-now-available/
categories:
  - Web Development
tags:
  - CSS
  - CSSLint
---
A new version of CSS Lint is now available both on [csslint.net][1] and through [npm][2] for NodeJS. Version 0.9.2 focused on improving validation support (full support is planned for v1.0.0) and stability. As part of that, 0.9.1 and 0.9.2 were quickly rolled out after 0.9.0 to address some flaws in the validation logic. 

Other changes for this release:

  * Dino Chiesa [submitted][3] a Windows Script Host (WSH) CLI.
  * There were a couple of [parser][4] [compatibility][5] bugs that were fixed.
  * Various rules regarding vendor prefixed properties were updated to reflect Internet Explorer 10.
  * **New Rule:** The `fallback-colors` rule was suggested by Dustin Cass and warns when a CSS3 color is used without a CSS2 fallback ([rule documentation][6])
  * **New Rule:** The `duplicate-background-images` was created by Hans-Peter Buniat and warns when a background image is used more than once (([rule documentation][7])

Thanks once again to the CSS Lint community for continuing to [file bugs][8] and make feature requests. We're rapidly approaching and very stable v1.0.0 release due to your participation and feedback. Keep it coming!

 [1]: http://csslint.net
 [2]: http://npmjs.org
 [3]: https://github.com/stubbornella/csslint/issues/198
 [4]: https://github.com/stubbornella/csslint/issues/211
 [5]: https://github.com/stubbornella/csslint/issues/212
 [6]: https://github.com/stubbornella/csslint/wiki/Require-fallback-colors
 [7]: https://github.com/stubbornella/csslint/wiki/Disallow-duplicate-background-images
 [8]: https://github.com/stubbornella/csslint/issues/
