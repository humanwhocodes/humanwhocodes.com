---
title: Interviewing the front-end engineer
author: Nicholas C. Zakas
permalink: /blog/2010/01/05/interviewing-the-front-end-engineer/
categories:
  - Web Development
tags:
  - Front End Engineers
  - Interviews
---
Interviewing a front-end engineer is an interesting task primarily because most are self-taught. Startups and large companies alike have equal trouble finding quality front-end engineers simply because they don&#8217;t know what to look for and which questions to ask. Having been around the industry for a while, I&#8217;ve developed my own methods for interviewing front-end engineers that I find to be very effective.

I&#8217;ve heard from candidates that I&#8217;m a tough interviewer, though I don&#8217;t try to do so on purpose. I believe the candidates think I&#8217;m tough because of the level of detail to which I ask them to answer questions. I&#8217;ve posted before about [how to survive an interview with me][1] and what I believe makes a [good front-end engineer][2], and so my interviews are tailored towards the information in both of those posts. I don&#8217;t ask trick questions and I don&#8217;t believe in logic problems. All I want to do is figure out if you can do the job. And I do that in some simple ways.

## Basic knowledge

We live a world where almost anything you want to know is accessible in 15 seconds through the Internet. However, having access to information isn&#8217;t the same as knowing how to apply it. There&#8217;s a certain base of knowledge that I expect all front-end engineers to have to do the job effectively. You can&#8217;t possibly meet deadlines if you need to stop and look everything up online, and so someone who says, &#8220;I don&#8217;t know, but I can find it online,&#8221; immediately raises a flag for me. Here are the things I expect a front-end engineer (junior through senior) to know without any outside help:

  * **DOM structure** &#8211; how nodes are related to one another and how to traverse from one to the next.
  * **DOM manipulation** &#8211; how to add, remove, move, copy, create, and find nodes.
  * **Events **- how to use them and the major differences between IE and the DOM event models.
  * **XMLHttpRequest** &#8211; what it is, how to perform a complete GET request, how to detect errors.
  * **Strict vs. quirks modes** &#8211; how to trigger each and why this matters.
  * **The box model **- how margin, padding, and border are related and the difference between border-box (standards mode) and content-box (old Internet Explorer) sizing.
  * **Block vs. inline elements** &#8211; how to manipulate using CSS, how they effect things around them and your ability to style them.
  * **Floating elements** &#8211; how to use them, troubles with them, and how to work around the troubles.
  * **HTML vs. XHTML** &#8211; how they&#8217;re different, why you might want to use one over the other.
  * **JSON** &#8211; what it is, why you&#8217;d want to use it, how to actually use it, implementation details.

Once again, all of this should be &#8220;top of your head&#8221; knowledge. All of my early questions are geared towards gaining your level of knowledge in all of these areas. This is not an exhaustive list by any stretch of the imagination but I believe that these are the building blocks you need to have a shot at success working with me.

## Limited questions

I&#8217;m a big believer that the interviewer should ask as few questions as possible. Constantly asking a candidate to change direction is both unfair and insane. In any given interview, I typically ask around three major questions, but each covers as many topics as I can possibly squeeze in. The questions involve multiple steps and allow for follow-on questions should I so choose. For example:

> I have a page that displays the current stock price for Yahoo!. This page has a button that you can click to refresh that price inline, without unloading the page. Please describe how you would implement this, assuming that the server always has the correct stock price data.

This question hits a good group of the basic knowledge that I want: DOM structure, DOM manipulation, event handling, DOM manipulation, XHR, and JSON. I could cover more of the points by asking for an alternative treatment of the stock price or some other message to be displayed on the page. For more senior candidates, I can easily continue on with other topics just as differences between JSON and XML, security issues, and capacity issues.

I also expect all answers to **not** involve using libraries. I want raw code written as if there is no library on the page. Library knowledge isn&#8217;t useful to me because libraries change over time. I need people who understand what goes on inside the library and can reproduce it by hand.

## Problem solving

The thing that makes front-end engineering so interesting is that there are multiple ways to solve the same problem, and it&#8217;s the context that determines the correct approach. When I ask questions, I tend to ask for a second way to do it after the candidate has explained one way. I ask them to imagine that for some reason their solution won&#8217;t work and ask for another. This accomplishes a couple of things.

First, it sniffs out mindless regurgitation of something they read about. Some people are amazingly talented at being able to repeat things they&#8217;ve read and sound intelligent. These people usually have trouble figuring out why that solution wouldn&#8217;t work and then coming up with a new solution. If I hear, &#8220;I don&#8217;t understand why this way isn&#8217;t good enough,&#8221; then I know they&#8217;re out of their league and were trying to get by with a copied answer.

Second, it shows me their working (once again, &#8220;top of the head&#8221;) knowledge of the browser technology. If they have a good understanding of the core parts of the browser platform, it&#8217;s not that difficult to imagine a different solution to the same problem.

This is an absolutely critical skill to have as a front-end engineer. We&#8217;re constantly met with roadblocks with things we believe should work and yet don&#8217;t (I&#8217;m looking at you, IE6). You can&#8217;t be one of those people who gets deterred when the first solution doesn&#8217;t work.

Another side of the problem solving equation is my favorite. Once I get a good sense for what a candidate does and doesn&#8217;t know, I&#8217;ll ask a question that&#8217;s just outside of their realm of knowledge. I do this because I want to see how they&#8217;ll solve a brand new problem using what they already know. At each step, I have a hint ready in case they get stuck (it doesn&#8217;t help me to evaluate someone when he or she gets stuck for 15 minutes); it&#8217;s the progression from one step to the next that I&#8217;m interested in. I want to see this person learn something new right in front of my eyes.

Note: All of the questions are rooted in browser technology. I don&#8217;t believe in abstract logic problems as a way to evaluate someone&#8217;s web tech problem solving skills. That&#8217;s like asking a sketch artist to paint a portrait &#8211; it doesn&#8217;t make sense and you&#8217;re not getting any valuable data.

## Enthusiasm

Perhaps the most important part of being a good front-end engineer is enthusiasm for what you do. We haven&#8217;t been taught our skills in college or in seminars, so front-end engineers need to be self-taught. And since browser technology changes so rapidly, we also need to constantly be upgrading our skills to keep up. I can&#8217;t force someone to follow blogs and keep trying to learn more, that has to be something the candidate brings to the table.

How can you tell if someone is enthusiastic about this type of work? It&#8217;s actually quite simple. I ask a single question: &#8220;what excites you about web technology right now?&#8221; This is a timeless question that is nearly impossible to get wrong&#8230;unless you have no answer. If I were asking this right now, I&#8217;d expect the answer to be things like WebSocket, HTML5, WebGL, client-side databases, etc. People who are enthusiastic about web development are always reading, always trying to pick up new skills; these are the people I want to work with. Of course, I ask them to explain whatever they mention in more detail to ensure they&#8217;re not just throwing out buzzwords.

## In the end

There are other skills that are useful, such as computer science or web design knowledge, but those are bonuses over the basic knowledge. If the basic knowledge is there, it&#8217;s easy to build on top of whereas it&#8217;s horrifically difficult to teach the basics from scratch while on the job. There&#8217;s also more skills to look for in senior front-end engineers than for junior ones, and an entirely different process for interviewing college graduates with little or no experience. What I&#8217;ve presented in this post is just the basics.

And as I always tell people who are new to interviewing, there&#8217;s really only one question to ask yourself when you leave the room: do I want to work with this person? If the answer is no for any reason, then it&#8217;s a no.

**Update (19-Jan-2012)** &#8211; fixed box model description.

 [1]: {{site.url}}/blog/2007/03/27/surviving-an-interview-with-me/
 [2]: {{site.url}}/blog/2007/08/15/what-makes-a-good-front-end-engineer/
