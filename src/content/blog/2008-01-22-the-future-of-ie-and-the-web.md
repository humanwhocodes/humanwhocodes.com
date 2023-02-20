---
title: The future of IE and the Web
author: Nicholas C. Zakas
permalink: /blog/2008/01/22/the-future-of-ie-and-the-web/
categories:
  - Web Development
tags:
  - Internet Explorer
  - Web Standards
---
Today felt like a nuclear bomb was dropped on the web development community. It didn't seem so at first, but as the day went on and person after person chipped into the argument, I can honestly say I don't remember such an uproar since I've been working in the industry. The reason for the uproar? An article on <a title="A List Apart" rel="external" href="http://www.alistapart.com">A List Apart</a> written by Aaron Gustafson entitled, <a rel="external" href="http://www.alistapart.com/articles/beyonddoctype">Beyond DOCTYPE: Web Standards, Forward Compatibility, and IE8</a>.

For those who have been living under a rock today, the article explains how Microsoft is going to deal with browser rendering in Internet Explorer 8. Chris Wilson, IE's Platform Architect, <a title="Compatibility in IE8" rel="external" href="http://blogs.msdn.com/ie/archive/2008/01/21/compatibility-and-ie8.aspx">summed it up nicely</a> in three points:

  1. &#8220;Quirks mode&#8221; remains the same, and compatible with current content.
  2. &#8220;Standards mode&#8221; remains the same as IE7, and compatible with current content.
  3. If you (the page developer) really want the best standards support IE8 can give, you can get it by inserting a simple <meta> element. Aaron gives more details on this in his article.

Aaron's article describes the state of rendering engines in IE and then goes on to explain some of the issues they had upgrading IE6 to IE7. As part of the <a title="Web Standards Project" rel="external" href="http://www.webstandards.org">Web Standards Project</a>, Aaron offered his help (along with other members of the WaSP Microsoft Task Force) to Microsoft to work through some of the issues web developers will face with a new version of IE. The end result was a recommendation of a specific `meta` tag that would switch IE8 to use the new standards-compliant rendering engine. In my mind, I read this and said, &#8220;oh, that's interesting.&#8221; The reactions of others wasn't so mild.

John Resig <a title="Meta Madness" rel="external" href="http://ejohn.org/blog/meta-madness/">wrote of this approach</a>:, &#8220;it's completely worthless &#8211; and in fact harmful &#8211; for any browser to implement!&#8221; His main points of contention are made in several assertions:

  1. Implementing this would be harmful to Firefox, Opera, and Safari.
  2. A document may include a frame that contains another document in a different rendering mode and that will mess things up.
  3. You can't choose to upgrade the scripting engine only, you must upgrade everything.

The reality is, there is no proof that implementing this in other browsers would hurt them. I realize a lot of this post was written out of anger so perhaps this grandiose statement is more of a gauntlet being thrown down than anything else. I don't see how this would hurt any browser at all. The second point about a document containing another document using a different rendering engine seems like an invalid use case to me. Typically, web developers use the same settings, doctypes, etc., across all pages on the same site; I don't really see this being a problem. The third point assumes that using IE8 in standards mode actually affects the scripting engine. Since no such claim has been made by Microsoft, we really can't comment on that. If I were a betting man, I'd bet that the scripting engine will be the same in all rendering modes. And as people keep telling me, if JavaScript 2 is truly backwards compatible with JavaScript 1.3 (the version implemented by most browsers), then there shouldn't really be a problem if IE8 ships with JavaScript 2.

Robert O'Callahan of Mozilla had a somewhat more tempered response in <a title="<META HTTP-EQUIV=&quot;X-BALL-CHAIN&quot;>" rel="external" href="http://weblogs.mozillazine.org/roc/archives/2008/01/post_2.html">two</a> <a title="Slipping The Ball And Chain" rel="external" href="http://weblogs.mozillazine.org/roc/archives/2008/01/slipping_the_ba.html">blog</a> posts. Robert's concerns are mostly pointed towards the maintenance issues that Microsoft will face using this approach as well as whether or not this makes sense for Firefox. His issues for developers are as follows:

  1. Cross-document compatibility between rendering engines.
  2. Each rendering engine has its own attack surface.

Once again, the cross-document issue pops up. As I previously stated, I don't see this as a huge issue. The attack surface issue is an interesting one, for sure, as this would allow exploits to be targeted at particular rendering engine versions. Robert correctly points out that making upgrades to the rendering engines will be more difficult if these upgrades can't break prior rendering modes, which only creates more opportunities for attacks.

PPK has an <a title="The versioning switch is not a browser detect" rel="external" href="http://www.quirksmode.org/blog/archives/2008/01/the_versioning.html">unusually restrained piece</a> about the topic as well, where he correctly points out that the rendering engine switch is not akin to browser detection. It literally has no effect on any other browser and won't affect your pages unless you use it. The WaSP also posted a <a title="Microsoft's Version Targeting Proposal" rel="external" href="http://www.webstandards.org/2008/01/22/microsofts-version-targeting-proposal/">response</a> begging developers to temper their initial reactions and give the solution a chance before completely dismissing it. I think this is the right approach.

There was an internal conversation going on at Yahoo! about this today, and I'd like to repeat some of the sentiments I shared. First, Microsoft is in a really tough position. They have really been trying to listen to web developers clamoring for better standards support. They are also listening to their partners, big corporations with thousands of Internet and intranet pages that would cost them millions to upgrade. Microsoft got slapped when IE7 broke some pages by fixing layout bugs; they couldn't afford to repeat that mistake. Whether we like to admit it or not, there are tons of web sites that are designed to work specifically for IE6. They were written at a time when IE had over 95% market share and haven't been updated since.

There literally is no good move for Microsoft to make in this vein. Either they do nothing and don't break the Web but garner the ire of web developers everywhere, or they pacify web developers by forcing standards on everyone and break tons of web sites and web applications. This is the literal rock and hard place scenario. Microsoft is trying to satisfy both conditions and I honestly feel that this is a huge step forward for IE.

I know not everyone will like the solution, but give Microsoft credit for shaking things up a bit. Tons of great web innovations have come out of Microsoft so don't be so quick to dismiss this. Aaron is a really smart guy and knowing that he was involved with this makes me feel better about it. I know the respect he has for the Web and the web development community, and I have no doubt that he and the IE team thought through a lot of the issues that are being brought up now. More details will certainly be forthcoming, so until then, remember one thing about this new version-lock feature: you don't have to use it if you don't want to.
