---
title: More Opera weirdness
author: Nicholas C. Zakas
permalink: /blog/2008/02/16/more-opera-weirdness/
categories:
  - Web Development
tags:
  - DOMSubtreeModified
  - JavaScript
  - keydown
  - keyup
  - Opera
---
As I continue to plow through another chapter in the new book, I'm discovering more weird stuff in Opera. On the surface, Opera appears to have very good standards support and reports what it supports fairly well. However, there are some areas where it really falls down:

  * For `keydown` and `keyup` events, Opera returns the character code for keys that would normally produce a character even if the character is non-alphanumeric. For example, the less-than key has a keycode of 188, but Opera returns 44 (the ASCII code for less-than). This appears to have been fixed in Opera 9.5.
  * Opera reports that it supports DOM Level 2 Mutation Events, but in fact it doesn't support `DOMSubtreeModified`.

Just a few insights I thought I'd share in case anyone else was searching for information on these things.
