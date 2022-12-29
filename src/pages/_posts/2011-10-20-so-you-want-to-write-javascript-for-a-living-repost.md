---
title: 'So you want to write JavaScript for a living? [repost]'
author: Nicholas C. Zakas
permalink: /blog/2011/10/20/so-you-want-to-write-javascript-for-a-living-repost/
categories:
  - Personal
tags:
  - Employment
  - JavaScript
  - Jobs
  - Web Development
---
In October 2007, [Hans Brough][1] published a blog post entitled, &#8220;So you want to write JavaScript for a living?&#8221; Hans put a lot of effort into the post, contacting myself as well as several others to get quotes and insights into the hiring process for JavaScript development. Through a series of unfortunate events, the article ended up being lost at its original site. I told him at the time that if he ever found a draft, to let me know and I would repost it for posterity.

Just recently Hans contacted me to let me know he had found a copy of the post. What follows is Hans&#8217; original article, reposted with permission. It is a bit dated but still a nice read to see how far we&#8217;ve come.

* * *

By Hans Brough

What do you need to know if you are interviewing for a <a href="http://javascript.jobamatic.com/" target="_blank">job that involves Javascript development</a>? What kind of expectations do employers have of candidates now that the state of client side development has been changed with the rise of asynchronous JavaScript and the often slick, supporting interfaces? These were questions I was asking myself after a friend pointed me to an <a href="http://blog.meebo.com/jobs?o" target="_blank">interesting job posting over at Meebo</a> that included some JavaScript puzzlers on logical operators, DOM oddities and&#8230; well that&#8217;s all I should say so as not to drop any hints. At any rate I thought it was time to do a reality check and ask members of the development community what they expect a candidate to bring to the table.

When I asked Elaine Wherry, Ajax Girl and co-founder at Meebo, how her puzzler questions were working she had this to say:

> We see many candidates apply for the Front End Developer position with a web developer background. We&#8217;re looking for people with good CS fundamentals and guerilla debugging skills &#8211; these questions help us focus on that pool.

It seems that over the last few years everyone is willing to get their hands dirty with a little Javascript. As Elaine implies above, those using the language come from a wide range of backgrounds which almost certainly guarantees a wide range of experience levels and approaches to problem solving.

Neelesh Tendulkar, Senior Software Engineer at <a href="http://www.simplyhired.com/" target="_blank">Simply Hired</a>, approaches these differences with a programming exercise named &#8216;buzz&#8217; that helps him understand a candidate&#8217;s approach to problem solving.

> I understand that an interview is a nerve wracking process, so when I&#8217;m looking at what they generate, I&#8217;m not looking for it to be perfect on the first try &#8211; very seldom do folks get it completely correct right off the bat. If they make a mistake I might ask them a question like &#8220;Ok, that looks good, but what happens when your program gets to a number like X? Walk me through what happens.&#8221; Usually they&#8217;ll be able to figure out what&#8217;s wrong here and correct it. Even if the candidate makes several mistakes, if they&#8217;re able to take vague hints like the one I gave above and interpret these and modify their program, then that tells me a lot about their programming ability.

At some point you will be asked specifics about the language that cover topics beyond basic programming itself. What you need to know depends of course on <a href="http://javascript.jobamatic.com/" target="_blank">the position your applying for</a>but everyone should know about basic DOM manipulation. <a href="http://blog.dept-z.com/" target="_blank">Tom Trenka</a>, a contributor to the <a href="http://www.dojotoolkit.org/" target="_blank">Dojo</a> toolkit, puts it this way

> If your candidate doesn’t understand getElementById, getElementsByTagName, appendChild and removeChild, you have a problem

<a href="{{site.url}}/" target="_blank">Nicholas Zakas</a>, author of Professional JavaScript for Web Developers, said virtually the same thing:

> &#8230;you need to know how to create an element on the fly, get a reference to any element on the page, insert, remove, replace, etc. nodes in the page. These methods should be memorized!

This presumes you know a bit about how the document object model is put together. It&#8217;s safe to say that before going into an interview you should be able to look at a given page and mentally traverse it&#8217;s structure. At the very least you need a basic understanding of how element nodes relate to one another on the page. This might be a great launching point into a discussion about how semantically correct markup can make your life easier once you start adding behaviors to a page.

Another must know topic is working with events and event handers across browsers as <a href="{{site.url}}/" target="_blank">Nicholas</a> notes:

> No modern web application can survive without event handlers. Knowledge of the differences across browsers and issues surrounding event handling are a must.

I think that if you are working in a web shop that is not dabbling in asynchronous programming (aka Ajax) or building high traffic web applications you might be able to get away with a solid knowledge of the above as well as a strong understanding of xhtml and css. As <a href="http://blog.dept-z.com/" target="_blank">Tom</a> mentioned &#8220;there’s a lot of halfway decent coding one can still do with JavaScript without having guru-level or even intermediate levels of understanding&#8221;

Assuming you want to work at a job that is building web apps there are a few more must knows to add to our list. Again here is a quote from <a href="{{site.url}}/" target="_blank">Nicholas</a> about Ajax:

> You need to know not just what the acronym stands for, but practically speaking, what the technique is and why it&#8217;s important. A working knowledge of multiple ways to implement Ajax communication is always a plus, since using XMLHttpRequest is not always an option.

If you&#8217;re making an ajax call there is a good chance you&#8217;ll need to know about callback functions. Be prepared to talk about what a callback function is, why it is and how to write one efficiently. Additionally be prepared to talk about supporting questions like this one from Neelesh:

> Do you have any experience with JSON? If so, &#8230; why do you think some developers may prefer to use this as the envelope language as opposed to XML?

Another topic to know well is Object Oriented programming in Javascript. If you&#8217;re going to be part of a team building a web application then considerations like re-usability and scalability are paramount. <a href="http://blog.dept-z.com/" target="_blank">Tom</a> had this to say on the topic

> This means understanding how to set up a prototype chain and how to make sure a base constructor is applied correctly in the process of object instantiation. I suppose just understanding what I said might be enough but they should be able to recognize the following pattern:
> 
>     
>     function  mySub(){
>     myBase.call(this);
>     // additional info  here
>     }
>     mySub.prototype = new myBase;
>     mySub.prototype.constructor =  mySub;

This also means being able to talk about javascript&#8217;s prototype based inheritance vs class inheritance used in other languages. Talking about inheritance in Javascript can get into the deeper end of the pool pretty quick. To start out with you might be asked a simpler question as Eric Todd, Senior Application Engineer at Corbis mentions,

> I like &#8220;this&#8221; [the keyword] because I was hacking javascript for maybe 2 years before I ever saw the word, and I struggled to get it&#8230; mostly because javascript was the first language I had ever used and did [not] understand OO programming and the use of &#8220;this&#8221;.

This is a good indicator question as to whether the client has any sense of objects within Javascript. Another is to simply ask them to list a few of javascript&#8217;s core objects which may seem silly but certainly points out any glaring gaps in their knowledge of the language.

A point I like to explore is object notation as it can get to the heart of understanding objects in Javascript. The examples do not need to be complicated to work well. For example I might show the candidate the following object literal:

    var candidate = {name:{first:'hans',last:'<wbr>brough'},age:'15'};</wbr>

I ask them to demonstrate how they access it&#8217;s properties, add a method or otherwise modify the object. Even better, ask them to demonstrate how the same object could be created in different ways. It&#8217;s a simple example that you can build on or branch off into related topics depending on the candidates experiences. For example if they don&#8217;t know what an object literal is then perhaps it&#8217;s an indicator that the candidate has not used JSON strings in asynchronous scripts. This is also a good launching point into another &#8216;must have&#8217; noted by <a href="http://blog.dept-z.com/" target="_blank">Tom</a>:

> The basics of JS object mutability, and using that to isolate code. Basically faking namespaces by using objects to hold other objects.

All in all, given the modern usage of javascript in web-apps today it is an excellent idea to grasp the fundamentals of OOP in javascript.

Another question you should be prepared to talk about are any experiences with libraries like Dojo, Prototype or effects libraries like <a href="http://script.aculo.us/" target="_blank">Script.aculo.us</a>. There are so many libraries out there now someone is bound to at least ask you about your preference. Although as <a href="{{site.url}}/" target="_blank">Nicholas</a> points out they should not serve as too much of a crutch

> It&#8217;s really important for you to be able to write your own code without relying on JavaScript libraries like Dojo, Prototype, etc. Libraries like these are helpful in some cases, but when it comes to enterprise-level web applications, you will run into situations that the libraries didn&#8217;t anticipate and you&#8217;ll need to know how to maneuver around with them. A sure fire way to say &#8220;no hire&#8221; is by answering a question with, &#8220;well, if I could use Prototype|Dojo|etc., then I could do it this way&#8230;but otherwise, I don&#8217;t know how.&#8221;

So to sum up this little research project, here is a short list of the minimum to know when you interview for a JS development job:

  1. problem solving, debugging and fundamental CS skills
  2. DOM manipulation
  3. Events and Event handling including differences between the IE model and the W3 model
  4. Asynchronous programming (Ajax)
  5. Object Oriented Programing to include setting up prototype based inheritance
  6. Familiarity with popular JS libraries

Keep in mind it&#8217;s not only about how much you know. Here&#8217;s a parting thought from Neelesh.

> &#8230; in addition to trying to ascertain the candidate&#8217;s technical prowess, I&#8217;m also looking at other things. How well does this person communicate (especially in a pressure situation like an interview)? What kind of personality do they have? How do they interact with me? How do they approach the problems that I give them? In the end, what I&#8217;m trying to determine is how good of a fit this candidate is to not only the position but to the company as well. There have been times when I&#8217;ve interviewed folks who are technically brilliant, but probably wouldn&#8217;t integrate well into the culture of the company.

 [1]: http://twitter.com/letterati
