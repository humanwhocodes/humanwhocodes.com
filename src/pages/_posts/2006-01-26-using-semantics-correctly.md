---
title: Using Semantics Correctly
author: Nicholas C. Zakas
permalink: /blog/2006/01/26/using-semantics-correctly/
categories:
  - Web Development
tags:
  - HTML
  - Semantics
  - XHTML
---
We all know to avoid using the `<b/>` and `<i/>` tags. We&#8217;ve also been taught that the semantically correct versions to use are `<strong/>` and `<em/>`, respectively. But it seems like these two tags are now being used just like the previous two: when something should be bold, we use `<strong/>` and when something should be italic, we use `<em/>`. I&#8217;m guilty of this myself, and I think it&#8217;s time we web developers put a stop to this.

The `<strong/>` and `<em/>` tags are supposed to have semantic value, not just stylistic value; they should be used to indicate something additional about the data. The `<strong/>` tag should be used to indicate something that is important, and it just so happens that browser interpret &#8220;important&#8221; to mean &#8220;bold.&#8221; Likewise, the `<em/>` tag is used to indicate that something should be emphasized. The latter is the one most often abused since emphasis is such a squishy description. For instance, we&#8217;ve all been taught to italicize book titles&#8230;this is not to say that book titles should be emphasized. It would make more sense to create a style for book titles that happens to italicize the text rather than using the `<em/>` tag.

There is a great description of how these tags should be used over in the <a title="Web Applications 1.0" rel="external" href="http://whatwg.org/specs/web-apps/current-work/">Web Applications 1.0</a> spec for <a title="The em tag" rel="external" href="http://whatwg.org/specs/web-apps/current-work/#the-em">both</a> <a title="The strong tag" rel="external" href="http://whatwg.org/specs/web-apps/current-work/#the-strong">tags</a>. Good reading for semantics junkies.
