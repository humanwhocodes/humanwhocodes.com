---
title: "Generalists and specialists: thoughts on hiring"
author: Nicholas C. Zakas
permalink: /blog/2014/07/15/generalists-and-specialists-thoughts-on-hiring/
categories:
  - Professional
tags:
  - Engineers
  - Generalists
  - Hiring
  - Specialists
---
In my career, I've worked at companies of all shapes and sizes. From the very tiny five-person failed startup WellFurnished to the 13,000-strong Yahoo to the around 1,000-person Box (my current employer). During that time, I've been a part of many different engineering organizations that have had very different philosophies about hiring engineers. I've interviewed and hired a lot of people in my time and have a pretty good track record at identifying good future colleagues.

Throughout my different jobs I've found that the primary distinguishing factor in hiring practices has come down to a single point: whether the company believes in hiring generalists or specialists. While I don't believe there is one true way to build an engineering organization, I do believe that the size of the company and its stage of existence necessarily influences the approach.

## Generalists and young companies

A generalist is someone who, by definition, has no particular specialty. They probably graduated with a computer science degree and is good doing a lot of what I'd describe as server-side activities: databases, infrastructure, builds, deploys, data manipulation and processing, and so on. Generalists don't mind jumping from C++ to Python to Java in the course of their work, as many languages are similar enough that there aren't huge barriers to making the transition. They are real workhorses, able to take on whatever is thrown at them.

Generalists tend to do a good but perhaps not great job on a lot of things and tend to struggle on things that require a different mode of thinking. For instance, many generalists struggle with taking on front-end or mobile work. The paradigm is so different that there's not enough common ground to make these work well, and so those parts of the product tend to suffer a bit in the presence of generalists.

The early stages of a company are the ultimate expression of constrained resources. Even if you successfully raise money, it likely isn't enough to hire all of the people you actually need. As such, anyone who joins the company is going to be expected to wear many hats and do many things. I signed on to WellFurnished to do the front-end and ended up setting up our infrastructure, source control, and build and deploy system. At that point, when looking for help, I mostly looked for generalists who could hop in and help in any number of places.

Young companies don't have the luxury of hiring people who can only do one thing or a small subset of things. There's too much work to do and not enough people to do it. Generalists are the way that the business gets off the ground and makes something works. Everyone needs to be working on something all of the time or you're wasting a very limited resource: money.

At this stage, there's also a certain pragmatism to the technical approach. The entire system is relatively small and so it's possible (and necessary) for each engineer to understand each part of the system. Being able to keep the entire system in your head is key at this point, because everyone needs to be able to do just about everything.

## Introducing specialists

Specialists, on the other hand, are people who excel at a particular type of thing. They have made room in their brains for deep knowledge of a particular area and, in doing so, have necessarily forgotten (intentionally or not) some of the things that generalists know top-of-mind. What specialists bring to the table is a level of excellence in something specific. They have devoted their career to focusing narrowly on something and, as a result, are much better at that thing than a generalist could ever be.

Early on at a company, generalists create a lot of &#8220;good enough&#8221; solutions. That's not to say this is a bad strategy, it's just a fact of how companies grow. The &#8220;good enough&#8221; solutions are, as the name suggestions, good enough to get the company to its next stage growth. Sometimes it's good enough to get the company through two or three stages of growth. But eventually, &#8220;good enough&#8221; won't be good enough anymore, and that's when you need to start hiring specialists.

Not good enough comes in many forms. The most obvious is in the front-end: every company I've been at that focused on hiring generalists has had a terrible time getting any sort of quality front-end built. Designers get frustrated because the engineers can't figure out how to make what they designed, and product managers are frustrated because the front-end is a key differentiator to end users. At that point, someone starts asking if it's time to hire someone who &#8220;really knows this stuff.&#8221;

This is often a controversial topic for smaller companies that are growing into larger ones. The main arguments against hiring specialists tend to be:

  * **We don't know how.** The interview process is tailored for generalists. That lends itself to interview processes filled with general-purpose computer science knowledge in an effort to determine if the candidate is &#8220;smart.&#8221; There's algorithms and data structures and discussions of complexity &#8211; all designed not to test individual skills but rather to test concepts and ideas that should be transferable to any programming language. A generalist should, after all, be able to just pick up another language so long as the concepts are solid. Once a company is used to labeling candidates as &#8220;smart&#8221; or not based on this type of interview process, it's very hard to make a switch. In fact, &#8220;smart&#8221; is a dynamic term that doesn't apply equally to everyone. But how can you properly vet a specialist if that specialization isn't represented at the company?
  * **It creates resource allocation problems.** One of the theories behind hiring generalists is that you'll have a small army of roughly-equivalent resources to assign to projects. If everyone is capable of doing everything, you have ultimate flexibility in resourcing projects. You don't have to wait for Jim to come free or for Mary to finish up her last project. If an engineer becomes available, you assign them to the next thing. Specialists, by definition, are limited in what you can assign them to work on. That fundamentally shifts how resource allocation works within the engineering organization: all of a sudden there's one person who can only do a subset of the work. The whole system is thrown into an unstable state because of this one discrepancy.

If you're a specialist reading this list, you're probably thinking, &#8220;those are bullshit reasons.&#8221; If you're a generalist reading this list, you're probably thinking, &#8220;well duh, obviously.&#8221; So I'll split the difference and say that these concerns are real and valid, however, they are far from unsolvable. Many companies have tread this path and have come out successful. The trouble is always getting that first specialist in the door to prove the system can work.

## Do we really need a specialist?

Whether or not you really need a specialist tends to come down to how dire your situation is and generally falls into one of two categories:

  * **Stuff is really broken.** Unfortunately, this is the more common scenario. After months or years of hacking away at something, things are such a mess that &#8220;good enough&#8221; is now considered &#8220;horrible&#8221;. You need someone who already knows how to fix the problem.
  * **Moving into a new area.** A lot of companies will want to hire specialists when they're moving into a new area of business and need to execute quickly. For instance, introducing a mobile application when they've only done web applications, or vice versa. This is a nice opportunity for the specialist because they get a blank slate to show they know their stuff. Unfortunately, these opportunities don't come along very often.

The first situation, things becoming a big mess, is pretty much how I've made my career both as an employee and as a consultant. The second situation was most recently experienced by mobile developers as all companies rushed to create mobile apps.

The question of whether you real need a specialist or not can also be answered by looking at the current resource allocation. If you see the same part of the system constantly needing attention (i.e., the web front-end or the mobile app), then chances are the generalists are no longer cutting it. 

## Hiring a specialist

Eventually, every successful company will hire their first specialist &#8211; it's a virtual certainty. The first step is to figure out how to hire that specialist. You need to accept that your current interview process probably doesn't apply. On top of that, specialists tend to get frustrated with questions that have nothing to do with what they're good at. So how do you interview for a specialist when your company doesn't have that specialization?

While you're company doesn't have any specialization, it does have people who have worked on the specific problems you want the specialist to work on. Those are the people who should be conducting the interview. The simplest way to go forward is to discuss the current problems you're having and ask candidates how they would go about solving them. This isn't about getting free work from random people, as it's likely impossible to solve these problems completely during the course of an interview. Rather, it's about getting the candidates to teach you about the context of the problem and understanding their thought process. Good specialists will be able to tell you the area of the problem and how they would go about investigating and potentially fixing it.

This ability to clearly communicate to people outside of their specialization is really important for a first specialist hire since that's what they'll be doing all the time. Because no one else will know exactly what they're doing, you need to be able to trust the specialist to communicate clearly and in a way that everyone can understand. In the end, understanding how the candidate will address the problem and agreeing that it makes sense is the best way to make this first hire.

The second part of the problem, resource allocation, tends to fix itself. Many generalist-minded engineering VPs fear that the specialist will be left without enough to do such that they become a money sink. In practice, there's usually enough work for the specialist to focus on in the beginning that this isn't a big issue. Either cleaning up a mess or creating a completely new product means that the specialist will have plenty to keep them busy for a decent amount of time. After that point, it's typically the case that once an engineering team has developed a competence in something, they want to add more to it. The web application starts needing new end-user features and the mobile apps needs some new functionality. Oftentimes, you'll find that within a year or two, you probably want to hire another specialist to deal with the additional work.

## The specialist tipping point

At a certain point in a company's lifecycle, it will be hard to get along without specialists. Even the generalists you have hired will start to focus in on a particular area of the product. The product and the infrastructure that supports it gets much larger, and that introduces an interesting problem. 

You started by hiring generalists who were capable of doing everything. That was possible because the infrastructure was small and it was easy to keep knowledge about everything in their heads. At a certain point, the infrastructure becomes so large that it's nearly impossible for everyone to keep the whole thing in their heads. Trying to keep tabs on how all parts of the system are changing becomes impossible and so, necessarily, people start to specialize.

Specialization at this stage means keeping less of the system in your head, and it frees up engineers to be more effective. They end up needing to understand only the boundary conditions of a particular part of the system. If they need to know more than that for any reason, there's someone to go to talk to who has that part of the system in their head. 

You'll know when you've hit this stage when people start to request to stay on particular projects longer or start coming up with new tasks on a particular part without prodding. It's the, &#8220;I see five ways this could be better,&#8221; comment that indicates the beginning of specialization. Someone took the time to learn about this part of the system and now wants to continue working on it and making it better.

At this point, it's easier to hire specialists because you already have them and it becomes harder to rationalize hiring generalists. As a company grows, teaching each engineer how to do their job or expecting them to learn something they've never done before on their own means a very slow start. At one company I worked at, it took engineers six months before they could be productive. This was the result of insisting on hiring generalists and also using proprietary instead of off-the-shelf systems. That meant we could never hire someone who already knew how something worked, we always had to hire in the hopes we could teach them. You just can't afford that amount of lag when hiring.

That doesn't mean engineers won't get bored and occasionally want to jump into something completely different. That will still happen, but to a far lesser degree, and the organization can support a small number of people doing such a thing at this stage. It can't support everyone continually shifting around to different parts of the system and needing to learn, from scratch, how to be effective in that part.

## What about just hiring the best people?

The counter argument to hiring specialists is that the company really just wants to hire the best and the brightest and put them to work. I call this the Google ideal because it's the way Google historically did hiring. Back when I interviewed with Google (circa 2006), they were the hot company that everyone wanted to work for. Just getting an interview was exciting. The interesting part was that they didn't seem to care too much about what your specialty was. You also couldn't apply for a particular position. Everyone who got hired would go into a pool and you'd find out what you were working on during your first day. So the idea was to hire the brightest people possible and find some place to put them to work. In short, the ultimate generalist approach.

I'm not sure if Google still hires this way or not, but I equate it to drafting the best player available in professional sports. If you're not a sports fan, then here's the little bit of knowledge you need to understand this analogy. Professional team sports in the United States have annual drafts in which the teams select amateur or international players for their teams. Basketball is the simplest to describe. At any given point in a game, a basketball team has five players on the court: two guards, two forwards, and a center. Each of these positions have different responsibilities and requirements. During the draft, many teams will look specifically for a player who plays a position that they need help with (the equivalent of a specialist). However, some teams opt for the &#8220;best player available&#8221;, which is to say that they don't have a specific need for the position, or they aren't sure what position the player will play, but they generally feel like the player is the most talented one available (the equivalent of a generalist).

Regardless of who the team selects, they are still limited to playing five players at a time. The goal is, therefore, to get the best center, the two best forwards, and the two best guards that you can get in order to be competitive. Refusing to see the difference between the requirements for each position and putting together a cohesive team means the whole team suffers. Basketball teams know this, and many times will pass over the player available if that player plays a position that the team already has covered with a good player. 

Personally, I'm a big believer in hiring specialists when the size of your company and product allows you to do so. Continuing to hire generalists and training on-the-job becomes a scaling issue for a growing company and you invariably end up with an unbalanced team that's not able to take on all of the new types of work that pop up. 

## Closing thoughts

I've come to believe that there's a human tendency towards specialization. Our entire life is setup this way through the education process, which starts with general knowledge (math, literature, science, history) up into college where we are expected to pick a major or focus area. It's natural that when you find something you enjoy doing, you want to do more of that and do so at the expense of other things that seem less interesting or enjoyable.

Early-stage companies definitely need generalists, and probably will for a decent amount of time until it's possible to hire a lot of people. Generalists are well-suited to this situation, or really, any situation where there is a need to be able to move quickly between a group of disparate tasks. The tradeoff you're making is in accepting &#8220;good enough&#8221; solutions for a lot of things rather than the best solution for a few. You hire generalists for their potential, for all the different things you imagine they can do for you.

You bring on specialists when &#8220;good enough&#8221; is no longer good enough. Sometimes that's because of a big mess that need to be cleaned up, or sometimes it's a natural evolution in the product where you need to deliver results quickly. In those cases, you need to bring in someone who already has the skills and knowledge to deliver. You hire specialists not for their potential to do other things, but for how they can meaningfully contribute right now. 

And over the course of careers and companies, it's not uncommon to see generalists become specialists. That's natural as the size of the system and infrastructure grows and scales. Allowing people to become specialists helps everyone become more efficient, as they need to have less of the system in their heads in order to be effective at their job. That lets everyone move faster and focus more deeply on the problem at hand.

Knowing how and when to start transitioning into a specialist-based engineering organization is more of an art than a science, and I'm hopeful that this post shed some light on the decision.
