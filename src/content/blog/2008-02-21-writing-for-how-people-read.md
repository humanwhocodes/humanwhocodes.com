---
title: Writing for how people read
author: Nicholas C. Zakas
permalink: /blog/2008/02/21/writing-for-how-people-read/
categories:
  - Professional
tags:
  - Books
  - Reading
  - Writing
---
The way that people read is a fascinating thing. The interaction between printed letters and our mind is a magical process that seems to defy logic at times. There was a chain letter going around a couple years ago that scrambled the letters in each word in a very unique way: the first and last letters of the word remained the same and just the middle letters were scrambled. For example, the word &#8220;javascript&#8221; became &#8220;jvacpsirat&#8221; and so on. Once you got over the initial shock of seeing a soup of letters, it was actually pretty easy to read the entire email. Why? Because your mind recognizes words by looking at the first and last letters first, then filling in the middle. As long as all of the middle letters are present, it really doesn't matter what order they appear in. My ex-girlfriend, who was a first grade teacher, confirmed that such knowledge affects the way they teach children to read. Fascinating stuff.

Even more fascinating to me is how people read different types of books. Novels, for instance, are read sequentially; it's a necessity for understanding the story (also why I have a hard time reading them, my mind is too random). A reader of a novel typically starts on the first page and reads through to the end. To make the experience more interesting for the reader, authors typically <a title="Better Beginnings: how to start a presentation, book, article..." rel="external" href="http://headrush.typepad.com/creating_passionate_users/2006/10/better_beginnin.html">don't start telling the story from the beginning</a>. It's more interesting to be thrust into the middle of a story and be a little confused as to how you ended up there. Then the past can be filled in intermittently in the rest of the book. Books, television shows, and movies all use this technique frequently and it typically works great. Where it doesn't work well is with technical books.

People read technical books differently than they read novels, biographies, or any other narrative texts. Technical books are rarely read sequentially except under two circumstances: 1) it's being used in a class or 2) someone is extremely diligent in their self-education. Other than that, technical books are typically used more as references that narratives.

When people use a reference, they typically have a particular problem to solve. They begin by locating the first piece of the solution in the book and then move on to the next, which can involve skipping both backwards and forwards. This process continues, jumping around in the reference until the complete solution is formed in the reader's head.

Programming books are, by their very nature, problem-solving texts. The reader has come to you because of a problem he or she is faced with and expects to find the answer somewhere in this sea of words. Programmers are problem solvers first and coders second. This leads to an interesting reading path through a programming book. From my experience and observations, people generally take the following path through a programming book:

  1. Look up a specific term or concept in the index.
  2. Go to the page and look at the code sample.
  3. Read the header above the code sample.
  4. If still confused, read the text surrounding the code sample.

The center of a programmer's world is code, and so naturally they are drawn to that in books. Programmers want to see code rather than narrative descriptions of solutions. Code samples almost need to stand alone in programming books, falling back to descriptive text only when absolutely necessary. For this reason, I make sure to provide a code sample for every major point I'm trying to make. It doesn't matter if the code is just a single line, it must be there.

Understanding that people look at code first, then a heading, then the surrounding text also means you need to be careful to keep everything congruous. When I first started writing I had a bad habit: I'd give a code sample of what not to do. I believe it's important to show people patterns to avoid just as it's important to show them patterns to use, however the way that I was presenting this data was confusing. I'd basically have a sentence right above the code sample that said, &#8220;don't do this.&#8221; Looking back up to my list of how people read, you can see the problem. If, for example, the code showed the use of `document.all` and the heading above that section was &#8220;Retrieving elements,&#8221; the message that the reader gets is to use `document.all` to retrieve elements. Since the surrounding text is only read if the code and heading alone don't seem to describe what's going on, the line saying &#8220;don't do this&#8221; may not get read. Now, I always put a comment in the sample code that says something like &#8220;AVOID!!!&#8221; or &#8220;don't do this!!!&#8221; When the reader comes across this code, the comment indicates that the code is given as an anti-example which hopefully triggers them to read the surrounding text.

Given reader behavior, it's also important to make sure your headings are descriptive rather than cute. There's a tendency to having headings that say something like, &#8220;putting it all together&#8221; or &#8220;a better example.&#8221; Putting what together? A better example of what? Better headings would be &#8220;Using the DOM and Events together&#8221; or &#8220;Advanced DOM example.&#8221; These headings better describe the entire section as well as the code. The previous headings require the reader either to find a higher heading level or to read the text around the source code; if they're in a hurry, they may do neither.

For non-technical books, starting at the beginning is a bad idea. For technical books, I believe it's very important. Since the nature of the reader lends to jumping around from chapter to chapter, the chapter progression should be as linear as possible. If the book structure is non-linear and the reader's behavior is non-linear, you end up with a very confusing mess. Readers can easily determine where to find background information to the part they are reading by going backwards. It's quite natural to &#8220;flip back&#8221; through a book to figure out how you ended up where you are. So I keep the history in the beginning understanding that most people will skip it.

I also try to keep chapters as atomic as possible. If a chapter called &#8220;Events&#8221; also covers advanced DOM techniques, it's possible that the reader may not know what he/she is missing when that chapter is skipped. Further, it's important to reference where other information is located in the book. You cannot assume that someone read the preceding chapter, so putting in hints like &#8220;as discussed in the previous chapter&#8221; or &#8220;this is discussed further in chapter 13.&#8221; really helps guide the reader to relevant information.

So advice to future book writers out there: understand who your reader is and how they'll be reading before you start writing.
