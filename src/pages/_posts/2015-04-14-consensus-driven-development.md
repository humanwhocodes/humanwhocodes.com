---
title: Consensus-Driven Development
author: Nicholas C. Zakas
permalink: /blog/2015/04/14/consensus-driven-development/
categories:
  - Professional
tags:
  - consensus
  - team
---
If you grew up in a democratic country, chances are you were taught at a young age about the importance of democracy and people's right to vote. Children growing up in the United States, in particular, are inundated with the message that democracy is the best form of government and voting is the best way to determine the correct course of action. We are then often shell-shocked when we get out of school and discover that, in may cases, our voices don't matter. Democracy and voting, while important for running the country, are often inefficient and ineffective in our every day lives.

## The challenges of software

Software engineering is interesting due to the plurality of opinions around nearly everything: which programming language to use, how to write your code using that language, the patterns to apply in your code, how to name things, feature language features are good or bad, and the list goes on. What's more, software engineers tend to be quite loud about their preferences, sometimes at the expense of decorum, even in situations where the outcome has already been determined or doesn't matter. 

And yet, somehow we need to move the conversation forward and get our work done. Everyone's first reaction? We should vote on it, and the majority rules. However, making group decisions based on a vote is rarely the right way to go. As a technical leader, you need to find a way to move forward.

## The problem with voting

There is a hierarchy in any group of people. At one end are the people of power and influence and at the other end are those without. This spectrum exists even in today's &#8220;flat org structures,&#8221; meaning that there is an imbalance within any group as to who is able to affect the most change. The most influential and the most willing to speak up can sway a group in one direction or another as the shy or less self-assured people feel content to follow their lead. 

The long-term effects of such a setup are, I believe, detrimental to the health and well-being of the team as a whole. Voting can help determine the winner but cannot ensure that everyone is on the same page. Some of the negative effects I've seen in these situations are:

  * **Holding grudges** &#8211; there are few things more demoralizing than having your idea voted down. If it happens frequently, it tends to lead to hard feelings and people being less willing to share their ideas.
  * **Centralized power** &#8211; the people whose ideas get voted up most frequently start to have an overwhelming effect on the group as a whole. Those people can easily sway the group, effectively changing it from a democracy into an authoritarian system (which leads to resentment).
  * **Split decisions** &#8211; when a vote ends up tied or is mostly split down the middle (6-5, 2-3), it means the group really hasn't made a decision.

When these situations start to happen, the code and people's behavior will reflect the growing angst on the team. People will explicitly not do what was voted on as a form of rebellion against what they perceive to be an unfair system; people will leave because they feel like they don't have a voice; people will quietly grow more resentful and their work will suffer. 

So how can a group make decisions in an effective way where everyone buys in?

## Driving consensus

<cite>Wikipedia</cite> defines<sup>[1]</sup> consensus as:

> Consensus decision-making is a group decision-making process that seeks the consent of all participants. Consensus may be defined professionally as an acceptable resolution, one that can be supported, even if not the &#8220;favourite&#8221; of each individual.

This is why consensus is a much better tool for making decisions on a team: it requires the input of each individual and an explicit agreement to abide by the decision even if you don't personally agree. This is a powerful difference from the majority rules approach of democratic voting.

Consensus-building, however, takes a lot more work than simple majority-rules voting. It requires significantly more discussion because you must find a resolution that everyone will agree to follow. In order to do that and avoid going back to vote, there are some things I do to move the process forward:

  1. **Agree on how to agree** &#8211; the first step is set expectations for the group and explain that you're looking to gain consensus, and that means having everyone bought into the decision. It's also helpful to frame the discussion based on the impact of the decision. For low-impact decisions, you should set a time limit by which a decision will be made (it doesn't make sense to debate for days a decision whose implementation has no significant impact); for high-impact decisions, lay out the important points to be discussed.
  2. **Take the temperature of the room**** &#8211; **before getting started, ask for people's thoughts on the topic at hand in a free-form way. Sometimes you'll find there is already general agreement and therefore you can move to a final decision fairly quickly. Don't extend the conversation any further than necessary. The other times, you can get a sense of how** **far apart various sides are on a topic. Either way, you get a good picture of how the team is feeling about the topic.
  3. **Encourage competing views** &#8211; when someone makes a strong point, ask if anyone would like to counter the claim. The only way you can drive consensus is to make sure all the information is presented. Questions like, &#8220;does anyone feel differently?&#8221; or, &#8220;does anyone disagree with that?&#8221; help to everyone to focus in on the issue and think more deeply about their perspective.

It's important to keep control over the conversation by making sure the tone stays positive and constructive, and that the group doesn't start recycling topics. Equally important is ensuring that everyone who wants to speak is heard, and that missing details are added into the conversation whenever possible. Some phrases that help to guide the conversation:

  * Does anyone have experience with that? Has anyone experienced the opposite?
  * Has anyone else found that to be true?
  * How do people feel about that suggestion?

## Finding agreement

Once you feel that there is enough information to make a decision, it's time to get everyone in the room to commit. There are several ways to determine the final decision. I've used all of these at some point, depending on the situation:

  * **General agreement** &#8211; if it seems like there's already consensus, you can stop and ask if there's any strong objections to moving forward with the decision. If not, then you're done.
  * **Defer to the champion** &#8211; sometimes a topic is very important to one or two people, and not at all important to everyone else. Those people will give impassioned speeches about their point while the rest of the group doesn't seem to have an opinion. In this case, I tend to suggest that the group follow the lead of those who are most passionate about the topic. This works on a number of levels: people know that their voice will be heard when they are passionate about something and the group learns that debating just for the sake of debating isn't useful. If someone is willing to champion a position, and there is no strong opposition, then it makes sense to drive towards the champion's position.
  * **Champions debate** &#8211; sometimes there are people who are passionate about opposite positions, so you have two champions rather than just one. In this case, it can be helpful to focus the conversation around these champions and see if they can determine between them if one is truly more passionate than the other. I've found that you can get to a point where one of them will defer and realize they don't care as much about the outcome as they previously thought. If that happens, then you're back to a one-champion model. If it doesn't, then it's time to move on to another strategy.
  * **Taking turns** &#8211; sometimes the best way to drive consensus is through the childhood practice of taking turns. This approach is most useful when there are opposing champions who can't seem to work out their differences. If one of them has more recently had a group decide in their favor, then it helps to suggest that it may be the other person's turn to have their opinion be the consensus. The innate sense of fairness that most people have can sometimes short circuit an otherwise contentious battle.
  * **Voting** &#8211; yes, sometimes consensus can be gained through voting. However, the difference between this and majority-rules is that voting is used simply to determine how close to consensus the group is. If it's still a split, it means that there's information in the discussion; if there are a handful of outliers, you can use of the previous approaches to see if they will abide by the general agreement; if it is unanimous, then consensus has been reached. I tend to use voting only as a last resort if the other approaches have failed.

The most important aspect of driving consensus is that everyone must be bought into the decision once made. That means people must be comfortable with the idea of disagreeing while supporting the decision. To gain that closure, it's important that any dissenters are asked specifically, &#8220;I know you disagree with the decision, but is it something you can live with and support?&#8221; You haven't reached consensus until each dissenter answers that question with a, &#8220;yes.&#8221;

## Conclusion

Consensus-driven development, the use of consensus on software development teams, is a health way to solve disputes and make decisions as a group. I've found that using this approach leads to better morale and stricter adherence to decisions. It doesn't matter if the topic is code conventions, third-party libraries, or which tools to use, making these decisions by consensus has a positive effect on the process.

Keep in mind that consensus is best used in situations where the available options are similar enough that there's no clear best choice (or no clear worst choice). It's also important to remember that not all decisions are suitable to be made in groups. In all companies, there are some decisions that are individual and some that are group; trying to recast an individual decision as a group decision tends not to work, and consensus isn't appropriate in such situations.

In situations where group decisions are appropriate, consensus is a great tool to use. It does require a strong leader who can manage the process and keep the level of discourse up (consensus can't be built without someone guiding the conversation), so make sure that someone is appointed to do so before giving it a try.

## References

  1. [Consensus decision making][1] (Wikipedia)

 [1]: http://en.wikipedia.org/wiki/Consensus_decision-making
