---
title: 'Safari doesn&#8217;t properly display one-bit favicons'
author: Nicholas C. Zakas
permalink: /blog/2009/07/23/safari-doesnt-properly-display-one-bit-favicons/
categories:
  - Web Development
tags:
  - Favicon
  - Safari
---
With my current workload, most of my debugging involves JavaScript and, sometimes, CSS. This is the first time I can remember needing to actively debug an image. I saw an issue where a favicon wasn&#8217;t being displayed properly in Safari (both 3 and 4). I kept going back and forth between browsers, verifying that the favicon wasn&#8217;t being displayed correctly. It appeared that any color I added to the icon just wouldn&#8217;t be displayed.

The issue, it appears is related to one-bit .ico files. These files contain only two colors, typically black as the first and another as the second. The format is highly optimized so that the icon size is as small as possible. Unfortunately, Safari seems to completely ignore the second color and renders it as white.

As an example, I created a simple (and ugly) one-bit icon: [<img src="/images/wp-content/uploads/2009/07/one-bit.ico" alt="One-bit icon" align="absmiddle" />][1]. If you&#8217;re viewing this post in any browser other than Safari, you&#8217;ll see a red smiley face; viewing in Safari shows a white smiley face. The second color, red, is completely lost and not rendered in Safari.

The solution was to change the icon format to four-bit using [IcoFX][2], which results in a slightly larger file size (318 bytes versus 198 bytes for the one-bit version), but works in all browsers: [<img src="/images/wp-content/uploads/2009/07/four-bits.ico" alt="Four-bit icon" align="absmiddle" />][3].

I know this is a much shorter post than I usually have, but I&#8217;m hoping it will save developers some time.

 [1]: /images/wp-content/uploads/2009/07/one-bit.ico
 [2]: http://icofx.ro/
 [3]: /images/wp-content/uploads/2009/07/four-bits.ico
