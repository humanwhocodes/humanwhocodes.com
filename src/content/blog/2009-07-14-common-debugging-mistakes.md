---
title: Common debugging mistakes
author: Nicholas C. Zakas
permalink: /blog/2009/07/14/common-debugging-mistakes/
categories:
  - Software Development
tags:
  - Debugging
  - Software Development
---
When web developers think about debugging, they typically think about tools such as Firebug that are used to figure out the crazy CSS and JavaScript issues we encounter every day. Tools can be useful for debugging but debugging is more about a way of solving problems than any particular tool. As such, good debugging approaches can be applied to any type of situation where something is not working correctly. It really doesn't matter if you're debugging a web site, a desktop applications, or a car engine, the right approach to solving the problem makes all the difference.

So what is the right way to debug an issue? I usually break it down into this series of steps:

  1. Verify that the problem exists as described.
  2. Determine if this problem has always existed or if it is new.
  3. Determine the source of the problem. If the problem is new, determine what changed.
  4. Devise a solution that treats the problem at its source.

Of course, there are intricacies with each step of this process, but generally these four steps will get you heading in the right direction. The problem is that it's very easy to get sidetracked in your debugging quest by a couple of very common mistakes.

## Mistake #1: Focusing on the desired outcome

I was at my doctor this past week when the receptionist mentioned that they hadn't received any payments from my insurance company. Earlier this year, the insurance company had made a mistake and was sending payments to me instead of the doctor, which led to all kinds of fun phone calls trying to track down where money was going. The receptionist's implication was that this was happening again. She suggested I just bring in whatever checks get sent to me.

The problem with that approach is that the insurance company sends me checks regularly since it seems like no doctors in my area accept insurance directly, so I constantly need to submit claim and consequently also receive valid checks. To further complicate the problem, the checks come without any indication as to what they are for, so it is literally impossible to determine if it was a reimbursement for something I paid out of pocket or a payment to this specific doctor.

Clearly the receptionist was focusing too much on the desired outcome, which was that the doctor get paid, rather than working to find the actual issue. I explained that something was wrong and we should figure out what it is. She said that some insurance companies just send the checks to patients by default. I pointed that in the two and a half years since I started seeing this doctor, we've only started having problems in the past six months. Since my insurance company hasn't changed and the doctor hasn't changed, clearly something else has changed, and I want to know what that is. There is a problem somewhere in this system and it must be figured out so that this situation can be avoided and the normal process can be followed. She agreed to look into it and get back to me when she understood what was happening.

Focusing too much on the desired outcome often leads to hacks and cover-up programming that create the desired outcome but don't necessarily treat the source of the problem. Without addressing the source, you can't be sure that it won't cause other problems in the system.

The classic example is having a function that accepts two numbers, adds them and returns the result. If, using this function, the result of 2 + 2 is 5, focusing on the desired outcome would mandate you subtract 1 from the result. This sounds ridiculous, but it's exactly where you end up when you ignore the source and address only what you want to happen.

## Mistake #2: Focusing on tangential problems

I recently received a gift card to Whole Foods. The card was accompanied by a receipt indicating how much money the card was worth and I happily used that for my weekly groceries. Except for one problem: when I tried to use it, there was far less on the card than there should have been. I showed the receipt to the cashier, who then called the manager to try and sort out the problem. I explained to him what happened and showed him the receipt for the gift card. Immediately he latched onto something he considered suspect: the gift card was purchased using a check.

&#8220;We don't accept checks for gift cards,&#8221; he told me. I explained that I hadn't purchased the card myself nor was it purchased in his store. He even went so far as to call up the store from which the card was purchased to verify that it was legitimate. Trying to ignore the fact that he was almost accusing me of fraud, I tried once again to explain the real problem: there's less on the card than expected.

&#8220;Well,&#8221; he began again, &#8220;the thing I can't figure out is how you got a gift card paid for with a check, because we just don't do that.&#8221;

&#8220;Look,&#8221; I said, trying very hard to mask my displeasure, &#8220;regardless of your policy regarding checks, clearly it was accepted and this gift card was purchased. The only thing I'm interested in is the location of the rest of the money that should be on this card.&#8221;

Selling the gift card to someone who could pay with a check was a violation of their protocol, for sure, but that wasn't the problem I was trying to get addressed. The real problem was an unexpected amount of money on the card, and that was the problem I needed to have rectified.

## Conclusion

The mindset of debugging is useful in any sort of problem-solving situation. As the previous examples indicate, you can apply the same methodology to non-technical issues and still solve the problem effectively. It's easy to get sidetracked when there's a lot of moving parts in a system or when deadlines are looming, but keeping your head and focusing on the problem at hand gets you farther than any other approach.
