---
title: On the politics, cargo-culting, and maintainability of JavaScript
author: Nicholas C. Zakas
permalink: /blog/2013/05/28/on-the-politics-cargo-culting-and-maintainability-of-javascript/
categories:
  - Web Development
tags:
  - Conventions
  - JavaScript
---
There has recently been a renewed focus on what I've come to call the anti-convention movement in JavaScript. It seems like once or twice a year, someone either does a talk or writes an article saying that all of the things so-called JavaScript experts tell you are wrong and you should do whatever you want. I take notice because frequently I'm listed along with those who are telling you not to do certain things (you know, the people you shouldn't listen to). The most recent contributions are Angus Croll's Politics of JavaScript talk[1] from Web Directions and James Padolsey's NetTuts article, Cargo-Culting in JavaScript[2]. Both take stances against commonly held beliefs in how you should write JavaScript. While I always enjoy a good debate about whether best practices makes sense or not, I feel that sometimes the discussion ends up in the wrong place.

## Maintainability

I have a bias. I think that maintainability is important in all code (not just with JavaScript). If you are at all familiar with my work, then this will come as no surprise. After all I've written a book about maintainability practices in JavaScript and I've written several articles and given talks about the subject as well. To me, maintainability is about creating high functioning teams that can move seamlessly between one another's code. Code conventions and other best practices designed to increase maintainability do so by decreasing the likelihood that two people on the same team will solve the same problem differently. That may seem like a minor point some, but in practice, seeing things the same way is important for teams.

I like to think of American football as a good example. Perhaps the most interesting relationship on the field is that between the quarterback and his wide receivers. The quarterback's main job is to read the defense and figure out how best to make progress. The wide receivers' job is to read the defense and figure out how best to get open so the quarterback can throw the ball to them . The most interesting part of this process is that the quarterback must actually throw the ball before the receiver arrives at the reception location. Because it takes a couple of seconds for the ball to get there, waiting until the receiver is wide open means waiting an extra couple of seconds during which the defense can get in the way. That's why it's important that the quarterback and the wide receivers see the same thing on defense and react the same way. When a defensive player behaves a certain way, both the quarterback and the wide receiver must realize it and react in complementary ways. That's the only way a pass will work.

It's the same thing with a team of developers. You want everyone reading the field the same way. The fewer unique patterns there are in the code base, the easier it is for everyone to work with. As I've said in many of my writings and talks, code is actually a communication medium between developers. Making sure everyone speaks the same dialect is important.

## What I do

The very first talk that I gave was on maintainability. I wasn't trying to trail blaze nor was I trying to prevent anyone from doing anything they wanted to do. What I did then, and what I continue to do now, is to share my experiences. When I say to avoid something, it's because I actually ran into trouble using it. When I say something is a good way to approach a problem, it's because I found it to be successful in my own work. Most of my advice has to do with building large web applications and working on large teams because that's how I've spent the past several years of my career. If you have ever seen me give a talk in person, you probably heard me say that some of these don't apply when it's just you working on a project all by yourself or with a couple of other people.

Because I enjoy working on large projects and with large numbers of people, I focus most of my own energy on making those systems work. I love the scalability problem because it is much more difficult than anything else. I never talk from a theoretical background and I never claim that my way is the only way to do things. everything I share publicly, from my blog posts, to my books, to my talks, is just about sharing what I've learned in the hope that it also helps you. If it doesn't help you, I wholeheartedly invite you to leave my advice off to the side where it doesn't get in the way. I have no desire to convince you that I'm right or that you're wrong, my only desire is to share what I've learned and let you use that however you see fit.

## &#8220;I'm not stupid!&#8221;

Both Angus and James base their arguments around the assumption that those who are recommending certain practices believe that everyone else is stupid. While I can't speak for everyone, I don't think that this is the case. Recommending certain practices has nothing to do with whether or not you think that developers are stupid. If that were true, you could say the same thing about every person who gave a talk or wrote a book recommending anything. I don't know when people started getting so upset about recommendations, but pointing the finger back at those making the recommendations and saying, &#8220;don't call me stupid,&#8221; is ridiculous. Unfortunately, this seems to happen whenever somebody disagrees with a recommendation.

That's not to say that all advice is good. That's also not to say that you should follow all of the advice all the time. You should, though, stop and think about the context in which the advice is given and whether or not that context applies to you. There is no rule that applies 100% of the time. That's not just true with JavaScript, it's true with every rule in the entire world. The fact that there are exceptions doesn't mean that it's a bad rule. If the rule holds 99% of the time than it's worth codifying as a good idea. The recommendations that people make around best practices should be treated the same way. All rules are starting points and it's up to you to continue the journey.

Think about driving. Most roads have a line down the center and some have guardrails along the side. Most of the time, you expect people to drive on the correct side of the road and not drive off of the road onto the sidewalk. Why bother having those lines and guardrails? I'm relatively sure that everyone within a country knows which side of the road to drive on and that staying within your defined driving lane is expected. The lines and guardrails just serve to reinforce what you already know when you're driving a car. They give you a few extra hints. So if you start to veer over the line in the middle of the road, you know that you may be entering into some dangerous territory. The line doesn't stop you from doing it, it's just an indicator of expectations. Yet I don't know anyone who is offended by the lines in the road or guardrails.

And just like with best practices, sometimes you actually have to cross over the line or drive over a sidewalk. What if you're making a turn to the other side of the street? What if you need to pull into a driveway? What if a car is broken down and you need to get around it? There are even exceptions to the rules of the road. No one really thinks about it because we all just do it naturally.

If you come from a position that anyone recommending a practice to you thinks you're stupid then you are doing yourself a disservice. There is no global JavaScript contest to see who can get the most people to follow their practices. No one wins anything by having more people using comma-first than comma-last. Literally there is no skin in this game for anyone.

## Coding for the maintainer

Both Angus and James use the following quote (one of my favorites, from Code for the Maintainer[3]):

> Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.

Unfortunately both miss the context of this quote before dismissing it as bad advice. This quote doesn't speak about your current teammates nor does it imply the person who is going to maintain your code will be stupider than you. The meaning behind this quote is that you don't know who is going to be maintaining your code in the future and that person will lack context to figure out what your code is doing. Lacking context has nothing to do with intelligence.

Think back to a time when you had to take over code from somebody else. Maybe that person was still at the company or maybe not. How did you feel needing to work with that code? I can tell you from personal experience, I've inherited some really bad code over the years. Code that is hard to work with because it's very difficult to understand what it's doing. I consider myself to be reasonably intelligent, typically above average on most days, but if you sit me down in front of some code that I've never seen before and tell me to fix a problem it will likely take me a while to do that.

If I were to restate the quote in a way that would hopefully make people understand the intent better, I would restate it as this:

> Always code as if the person who ends up maintaining your code will not be able to talk to you for help.

Removing the scare tactic phrases from the quote makes it a bit more palatable. The idea is that the person who maintains your code won't have you as a resource and therefore the code has to make sense on its own. The assumptions and organizational knowledge that exist only in your head are the enemy of that maintainer. It doesn't matter how intelligent that person is, the job is a nightmare without proper context. That's why I can't jump in and start maintaining your JavaScript library even though I know JavaScript pretty well. That's why things like code conventions and documentation are so important for maintainability.

If your code can't be easily maintained by someone else, then that's not a mark of quality. The teams I've worked on have all converged on common conventions and that has allowed anyone to be able to work with any file at any point in time. Understanding the conventions means that you understand the files and that means you can do your job with a very low barrier to entry. It's a point of pride for my teams that code ends up looking the same regardless of who wrote it because ultimately it's the team's responsibility for that code rather than an individual's responsibility.

## It's a starting point

Thankfully, Angus ends his presentation with a very important statement: there are no absolutes. All of the rules and best practices that you hear about are simply a starting point. I always tell people on my teams that we're going to define some rules and follow them until they don't make sense. When they don't make sense, we're going to talk about why that is and figure out what we've learned. The rules are there to help you get off on the right foot and make sure that you don't need to stop and ask at every moment what the right approach is. That's important because our jobs are fundamentally repetitive.

We go into work mostly doing the same thing every day. If your job is to create features on a product, you'll find that the features can get implemented in very similar ways even though the features themselves are very different. If your job is to fix bugs, you tend to debug and fix things in the same way. It's the same for all of us, programming is repetitive. If everyone ends up doing the same task in different ways than the code becomes harder to manage. So you start by defining some rules about how things will be written and deal with the exceptions as they come up.

And there will be exceptions. Exceptions don't mean that the rule is bad, it just means that the context has changed and the rule may not apply.

What we're really talking about here is skill acquisition[4]. The rules are there to get you started on a journey of learning. All beginners are taught the rules that let them get moving quickly while avoiding common pitfalls. As you get more experienced, you learn more rules and also start to figure out the context in which the rules don't apply. Not everyone is at the same level of professional development and so everyone doesn't have a proper handle on what they're doing to throw the rules away. It's only through experience that these becomes more apparent, as the novice chess player eventually becomes a grandmaster.

## Effective learning

This really all comes down to how you choose to learn. Every single person who takes the time to write a blog post or give a talk or otherwise share their knowledge is saving you valuable time. They are doing the heavy lifting of presenting an idea and it's just up to you to decide if that idea fits with what you do or not. Thinking those people automatically believe you are stupid is counterproductive and doesn't matter at all. Recommendations are simply ideas presented for consideration. Many times, the ideas flow from a problem that the recommender experienced at some point in time. Figure out the problem and you can figure out whether or not the context applies to you. That's the most effective way to learn. Or to put it more eloquently:

> Do not believe in anything simply because you have heard it. Do not believe in anything simply because it is spoken and rumored by many. Do not believe in anything simply because it is found written in your religious books. Do not believe in anything merely on the authority of your teachers and elders. Do not believe in traditions because they have been handed down for many generations. But after observation and analysis, when you find that anything agrees with reason and is conducive to the good and benefit of one and all, then accept it and live up to it.
> 
> - Buddha

## References

  * <span style="line-height: 13px;"><a href="https://speakerdeck.com/anguscroll/the-politics-of-javascript">The Politics of JavaScript</a> by Angus Croll (SpeakerDeck)</span>
  * [Cargo-Culting in JavaScript][1] by James Padolsey (NetTuts)
  * [Code for the Maintainer][2] (Cunningham & Cunningham)
  * [Dreyfus Model of Skill Acquisition][3] (Wikipedia)

 [1]: http://net.tutsplus.com/tutorials/javascript-ajax/cargo-culting-in-javascript/?utm_source=buffer
 [2]: http://c2.com/cgi/wiki?CodeForTheMaintainer
 [3]: http://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition
