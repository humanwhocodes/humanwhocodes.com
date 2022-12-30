---
title: On interviewing front-end engineers
author: Nicholas C. Zakas
permalink: /blog/2013/12/27/on-interviewing-front-end-engineers/
categories:
  - Web Development
tags:
  - Front End Engineers
  - Interviews
---
There was a really nice article written by Philip Walton last week<sup>[1]</sup> regarding his experience interviewing for front-end engineering roles at various companies in San Francisco. To summarize, he was surprised by the types of questions he was asked (mostly having to do with computer science concepts) and the types of questions he wasn't asked (what about the DOM?). I wish I could be surprised, but having lived in Silicon Valley for the past seven years, I have heard these stories over and over again. I don't believe these problems are specific to the San Francisco Bay Area by any stretch of the imagination &#8211; I think it's more specific to our industry the continuing misunderstanding about what front-end engineers do and the value we add.

## We hire smart people

When Google was an up-and-coming company, they had a very regimented way of hiring. The idea was that they wanted to hire the smartest people possible and then, once hired, they would figure out where best to apply your smarts. That very necessarily meant that everyone had to come in getting more or less the same interview in an attempt to standardize the bar for &#8220;smart&#8221; as an engineer. That meant regardless of your area of expertise or focus, you would more or less be getting the same interview as every one else. Once deemed &#8220;smart&#8221;, you were in but had no idea what you'd be working on until you showed up on campus as a fully-credentialed employee.

I blame the Google approach for a lot of the bad hiring practices related to front-end engineers in the industry today. When I was interviewing with Google, I was taken aback by the questions being asked of me that had nothing to do with my expertise. I remember in a couple of instances pondering if I should just leave, because I had no idea how to use a heap sort to accurately track search query times for billions of requests. That wasn't what I wanted to be doing with my career, I had no interest in this realm of computer science; what value could this question possibly provide?

(Note: I have no idea if Google still follows this same procedure for hiring. For the purposes of this post I'll refer to this as &#8220;the Google approach&#8221; but I in no way mean to insinuate that things work exactly the same now. Also, Google has, and has had, some of the best and brightest front-end engineers in the world working for them. I by no means intend to say that they have done poorly in their front-end hiring.)

## Human resources

From a practical point of view, and having gone through my own failed startup, I understand the Google approach. When a company is small and just starting out, you need people who are capable of doing many different things. You don't have the luxury of having a front-end engineer and a back-end engineer and a database administrator and a site reliability engineer. You need people who can do many things, and it doesn't even matter if they can do them at an expert level &#8211; they just need to do stuff that works and they need to be skilled enough to take on new tasks as they arise. 

The Google approach of hiring works really well for this situation. You need a common idea of what is an acceptable skillset for an engineer at your company when resources are constrained. The primary motivation is the fluid mobility of an engineer from task to task, effectively, hiring human resources that can be deployed in any number of ways as priorities and needs shift. Young companies don't have the luxury of specialists. Everyone needs to be as full stack as possible to get work done.

The good news is that this process produces very good results when you are looking for full stack engineers with a common core skillset. This often is the best way to go when a company is small and growing. Google kept using it even as it got larger and did start to augment it a bit for some specialists who came through (I did get a couple of JavaScript questions while interviewing with them).

## Growing up

The biggest problem I've seen with growing companies is that they fail to adapt their interview processes as the company gets larger and the complexion of the team changes. As you decide to hire specialists and more experienced engineers, the Google approach to hiring starts to fail. The one-size-fits-all interview no longer applies and you start to run into trouble. It's a difficult position for a company to be in. If you've never hired a specialist before, and it's a specialty with which you have no experience, how can you formulate an interview process that accurately detects the skillset you seek?

So many companies use an &#8220;and&#8221; approach. That is, I want you to live up to the common core skillset that we expected of every engineer to this point *and* be able to do the specialty. This deludes the hiring company into believing that they are keeping their magic bar for engineers in tact and getting someone with the specialty they need. And sometimes that works. But most of the time it doesn't.

## Understanding front-end engineers

Hiring specialists is an especially difficult task for any company that doesn't have experience with that specialty. The reason is pretty obvious: specialists, by their nature, have expertise in something that is unique. Specialists care about things that other people don't care about and willfully ignore things that most people do care about. The brain can only handle so much data, so to get a deep understanding of a particular topic it is often necessary to jettison other information that applies more broadly. For instance, there was a point in time where I could do anything in Visual Basic 4.0. These days, I'd be hard-pressed to come up with any working code short of copying it from the Internet. That wasn't where I decided I wanted to spend my intellectual capital and so I let it fade.

Front-end engineers are, of course, specialists. We care about things that seem insane to others: understanding differences between dozens of browsers, pixels vs. ems, PNG vs. JPEG, compatibility of JavaScript APIs, how to construct a DOM to represent a UI, and so on. When I try to explain something cool I did to a back-end engineer, their eyes tend to glaze over very quickly. They will never understand the rush I get when I test something across Internet Explorer, Firefox, Chrome, and Safari and have it work for the first time. They will never understand why bold looks better than italic in a particular situation. They will never understand how I find bugs in browsers. They don't have to.

## What is important to know?

I've been getting asked more and more about whether or not front-end engineers need to understand computer science algorithms and data structures in order to be hired. My simple answer: no. I don't see these as necessary prerequisites for people to be successful as front-end engineers. The reason is that these aren't things most front-end engineers do on a day-to-day basis. Do I use algorithms and data structures? Sometimes, but I usually look up the things I need when I have a need for them. That information is easy to find online and there are always people around who know these topics better than me.

The things I look for in a front-end engineer have little to do with traditional computer science concepts. I've written before about what makes a good front-end engineer<sup>[2]</sup> and how to interview front-end engineers<sup>[3]</sup>, and generally I still agree with everything I wrote in those articles. I want enthusiasm and passion for the web, and understanding of HTML, CSS, and JavaScript, and more importantly, how to use them together to create a solution to a problem. 

In general, I believe interviews should be designed to demonstrate skills that a candidate will be expected to use on a day-to-day basis. It's easy to pat ourselves on the back and chat about O-notation (which I had never even heard of until about 7 years into my career) or heap sort (the first time I encountered heap sort was during my Google interview), but is that a good indicator of whether or not someone will be successful as a front-end engineer? Absolutely not.

I'm not a big fan of trivia questions, either. Trivia questions are &#8220;name three ways to align something to the right&#8221;. Those questions remind me of high school tests, where you're testing the ability to regurgitate information rather than seeing a demonstration of skills. What should you ask? Think about what you're expecting someone to do on a regular basis in the role and ask something that approximates it. Not sure? You can always pull out a past problem that was experienced at the company and ask the candidate how they'd solve it. What I want to know is that if I come to you with a particular type of problem, you are willing and able to solve it. 

I want to see how you attack a problem in your domain, how you work through issues and incompatibilities, what your instincts tell you when you get stuck, and whether or not you can take feedback and incorporate it into your process. That's what makes people successful.

## The lies we tell ourselves

The pervasiveness of questions such as finding palindromes, summing arrays, etc. are usually backed by a belief that these are providing vital pieces of data in sizing up a candidate. The various lies we tell ourselves regarding these questions usually sound like:

  1. **We're getting good insights into their thought process** &#8211; Bullshit. You get good insights into a person's thought process not with trivia or random questions that are more likely to appear on a college computer science exams, but rather through situational exposure. Giving someone a question that is so far out of their normal work tells you little about their value. Does it tell you how they deal with situations that they are ill-suited to address? Totally. And if that's your concern, then keep on asking these questions. Most engineers will be dealing with a particular problem space. That's where questions should focus.
  2. **We hold everyone to this standard** &#8211; This is the mythical measure of smarts. You believe that asking the same questions to everyone gives you a good measuring stick that is applicable everywhere. Except, no such measuring stick exists. Asking Michael Jordan to hit a 100-mph fastball would not give you any good insights into his athletic prowess. There are some people who will be pretty good at everything, but specialists, in particular, tend to let go of knowledge they don't use every day in order to be specialists. There is no one measure of smarts.
  3. **It's worked well to this point** &#8211; Usually the cry of a growing company. We hired smart people in the past with these questions, why wouldn't we continue? The reason you don't continue is because the shape of the team has changed. You can now hire specialists that know more about their realm than anyone at your company probably does. You can hire the same type of people you've been hiring using the same process, but it's crazy to think that you can hire a very different type of person using the same approach.

I've heard these over and over again in my career, and it frustrates me to no end. There is nothing more important than matching interview questions to what a candidate would actually do as an employee. That's where the useful data lives in the process. Being unable to find palindromes for a word is interesting trivia, but what does it really tell you about the possibility of success if hired?

## Conclusion

In my nearly 14-year career I've been responsible for hiring a large number of front-end engineers and I can say, proudly, that I've never made a bad hire. Some turned out to be merely good, others turned out to be excellent, but none of them were bad. I did this not by focusing on trivia and things that they wouldn't actually end up doing on a daily basis; I did it by creating questions that showed me they would be able to take on the tasks I had waiting for them upon arrival. Getting to know people within their problem space is important, and if it hasn't been clear in this article, this applies to all specialists (not just front-end engineers). 

It is typically frustrating for specialists to interview with companies. What makes it better? Giving feedback. If you are the first specialist hired, give feedback about the interview process and see if it can be tweaked. Even if you don't get hired, give feedback to your recruiter explaining that you didn't think you were able to show your skills due to the questions you were asked. 

Unfortunately, there are still many companies who will apply the one-size-fits-all approach to hiring engineers and you won't get an interview tailored to your specific skills. Make no mistake, interviewing is hard and growing a company is extremely hard. The best way to change things is from the inside, so give feedback, get involved with your company's hiring practices, and help make the next experience better for someone else.


  1. [Interviewing as a Front-end Engineer in San Francisco][1] by Philip Walton (CSS Tricks)
  2. [What makes a good front-end engineer?][2] by me (NCZOnline)
  3. [Interviewing the front-end engineer][3] by me (NCZOnline)

## Translations

  * [Chinese][4]

 [1]: http://css-tricks.com/interviewing-front-end-engineer-san-francisco/
 [2]: {{site.url}}/blog/2007/08/15/what-makes-a-good-front-end-engineer/
 [3]: {{site.url}}/blog/2010/01/05/interviewing-the-front-end-engineer/
 [4]: http://www.zfanw.com/blog/on-interviewing-front-end-engineers.html
