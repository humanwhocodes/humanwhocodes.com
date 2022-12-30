---
title: How to markup blog comments?
author: Nicholas C. Zakas
permalink: /blog/2008/02/07/how-to-markup-blog-comments/
categories:
  - Web Development
tags:
  - Blog
  - Comments
  - HTML
---
I'm going through the painful process of redesigning my personal site in my spare time&#8230;okay, so I don't really have spare time, but I'm finding a few moments before bed to work on it. I'm trying to make everything semantically correct in terms of the HTML I'm using, with the ultimate goal of top-notch accessibility coupled with top-notch design. Marking up a blog entry was pretty easy, as was the main page design. Then I got to the comments section.

Currently, I use a `<h3/>` element for the name of the person leaving the comment and a `<p/>` element (or multiple elements) for the comment body. This seemed logical at the time, but now I'm not convinced. Looking for inspiration, I took to the Web and viewed the source of several standards-aware sites. Here's what I found:

  * <a title="Ajaxian" rel="external" href="http://www.ajaxian.com/">Ajaxian</a> uses a `<dl/>` element to enclose all comments, a `<dd/>` element for the comment body, and a `<dt/>` for the author. The list starts with a `<dd/>` element, as that comes first in the visual design. I pondered this and ended up with two reasons why I don't like it: 1) `<dl/>` is for definition lists not comments, 2) `<dt/>` is for a definition term and should come before the corresponding `<dd/>` element, not after it. I know some people use the `<dl/>` element for dialogues, but <a title="HTML 5" rel="external" href="http://www.w3.org/TR/html5/#the-dl">HTML 5 says</a> specifically that you should not use this element for dialogues.
  * <a title="The Web Standards Project" rel="external" href="http://www.webstandards.org">The Web Standards Project</a> takes a similar approach. They use a `<dl/>` element, with the first child being a `<dt/>` which is followed by a `<dd/>`. At least this is the correct order, but it's still using `<dl/>` to mark up comments in the form of a dialogue.
  * <a title="A List Apart" rel="external" href="http://www.alistapart.com">A List Apart</a> uses a `<h4/>` for the comment title and a `<p/>` for the comment body. There is no list of any form.
  * The <a title="YUI Blog" rel="external" href="http://www.yuiblog.com">YUI Blog</a> uses a `<ol/>` element to markup the list of comments, an `<li/>` element for each comment, and then `<p/>` elements for the comment body. I like using an ordered list, since it indicates that the order of the comments is important and also provides information to screen readers about how many comments there are. I'm not sold on using just `<p/>` elements for the comment body, though.

Of all the options, I think using `<ol/>` to enumerate the comments is the right way to go. Having settled on that, I was then left with the question of marking up the comment itself. I really wished there was some markup for representing someone's written opinion. Just before bed, I was picturing what would happen if a blog post happened in real life and what the conversation would look like. Then I realized something: blog comments really are a conversation. Each comment is made up of something someone said and the person who said it; there are elements for both in HTML 4.

When someone says something and it's captured for later use, that's a quote, for which the `<blockquote/>` element is appropriate. The person who spoke the phrase can be appropriately indicated by `<cite/>`. These were the final two pieces to the puzzle for me.

So what do you think? Is the combination of `<ol/>`, `<blockquote/>`, and `<cite/>` appropriate? Can you suggest something better?
