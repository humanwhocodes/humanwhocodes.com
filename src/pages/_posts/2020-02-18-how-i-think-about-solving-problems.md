---
title: "How I think about solving problems"
teaser: "The five questions I used to help me decide, prioritize, and solve problems."
date: 2020-02-18
categories:
- Career
tags:
- Problem Solving
- Work
- Skills
---

Early on in my career as a software developer I thought my primary contribution was writing code. After all, software engineers are paid to ship software and writing code is a key component of that. It took several years for me to realize that there are numerous other contributions that go into shipping software (if not, why are there managers, designers, product managers, salespeople, etc.?). I slowly came to see myself less as a coder and more as a problem solver. Sometimes the problem could be solved by writing code while other times the solution didn't involve code at all.

Once I realized my value as a problem solver, I set out to determine the most efficient way to address problems as they occurred. Moving into a tech lead position immediately thrust me into the middle of numerous ongoing daily problems. I had to figure out some way to act decisively, prioritize effectively, and solve as many problems as possible.

Eventually, I settled on a list of questions I would ask myself for each problem as it arose. I found that asking these questions, in order, helped me make the best decision possible:

1.	Is this really a problem?
2.	Does the problem need to be solved?
3.	Does the problem need to be solved now?
4.	Does the problem need to be solved by me?
5.	Is there a simpler problem I can solve instead?

Each question is designed to reveal something about the problem that allows you to go to the next step, or if you're lucky, just avoid the problem altogether. There is some nuance to each question, so it's helpful to describe each in more detail.

## Is this really a problem?

The first step to addressing any problem is to determine if it actually is a problem, and that requires a definition. For the purposes of this article, I'll define a problem as anything that leads to an objectively undesirable outcome if not addressed. That means leaving your window open over night when it's raining is a problem because the inside will get wet and that could potentially ruin your floor, furniture, or other possessions. A solution to the problem prevents the undesirable outcome, so closing the window before you go to bed will prevent your belongings from being ruined.

When in a leadership role, it's common to receive complaints that sound like problems but are just opinions. For example, I've spoken with many software engineers who immediately upon starting a new job or joining a new team feel like the team is doing many things wrong: the framework they are using is wrong; the code style is wrong; the way files are organized is wrong. How will they ever get around to fixing all of these problems? It's a monumental task.

I ask these software engineers this question: is it a problem or is it just different?
In many cases "wrong" just means "not what I'm used to or prefer." If you can identify that a reported problem is not, in fact, a problem, then you no longer need to spend resources on a solution. A team member being unhappy with the way things are done is not an objectively undesirable outcome. There is nothing inherently problematic with disagreements on a team.
If you're able to determine that a problem is not a problem, then you can move on to other tasks.

## Does the problem need to be solved?

After you've determined that there is a problem, then next step is to determine if the problem needs to be solved. A problem doesn't need to be solved if the undesirable outcome is tolerable and either constant or slow growing. For example, if a section of a web application is used by only admins (typically five or fewer people) and is slower to load than the rest of the application, you could determine that's something you're okay with. The problem is narrowly contained and affects a small number of people on the rare occasion that they use it. While it would be nice to solve the problem, it's not required and the downside is small enough that not addressing it is unlikely to lead to bigger problems down the road.
Another way to ask this question is, "what happens if the problem is never solved?" If the answer is, "not much," then it might be okay to not solve the problem. 

## Does the problem need to be solved now?

If you have a problem that needs to be solved, then the next question is to determine whether it needs to be solved now or if it can wait until later. Some problems are obviously urgent and need to be addressed immediately: the site is down, the application crashes whenever someone uses it, and so on. These problems need to be addressed because the undesirable outcome is immediate, ongoing, and likely to grow: the longer the site is down, the more money the company loses; the more times the application crashes, the more likely a customer will use a competitor. 

Equally important is to determine if solving the problem can be deferred. There are a surprising number of non-urgent problems that bubble up to leadership. These are problems that need to be solved eventually but not immediately. The most common problem in software that fits this description is technical debt. Technical debt is any part of your application (or related infrastructure) that is not performing as well as it should. It's something that will not cause a significant problem today or tomorrow, but it will eventually. In my experience, tech debt is rarely addressed until it becomes an emergency (which is too late). However, tech debt isn't something that everything else should be dropped to address. It falls into that middle area where it shouldn't be done today but definitely needs to get done.

If a problem doesn't have to be addressed now, it's usually a good idea to defer it. By defer it, I mean plan to address it in the future, not avoid doing anything about it. If now is not the right time to solve the problem then decide when is: in a week, a month, six months? Put it on your calendar or task management system so you won't lose track of it.
Another way to ask this question is, "is the problem urgent?"

## Does the problem need to be solved by me?

This question is most applicable to anyone in a leadership position but could also apply to anyone who already has too many tasks to complete. Is this problem something that requires special skills only you possess, or is it possible someone else could complete the task?

This is a question I adapted from advice one mentor gave me. I was complaining about how I just seemed to be collecting tasks and couldn't keep up. He said I should ask myself, "is this a Nicholas problem?" There were certain things only I knew how to do and those were the things I should be focusing. Anything else should be delegated to someone else. Another important tip he gave me: just because you can do something faster than someone else doesn't mean you should do it yourself. For most non-urgent tasks, it doesn't matter if it is completed in one day or two.

So if the problem can be solved by someone else, and you're either a leader or already have too much work, then delegate.

## Is there an easier problem I can solve instead?

The final step in the process once you've determined that there's an urgent problem that you need to solve personally is to determine if there's an easier problem to solve. The key is that the easier problem must give you the same or a similar outcome to the original problem while saving time (or other resources).

When I was working on the new My Yahoo! page, one of our product managers proclaimed that beta customers had requested we add resizable columns to the page. This was something that would be fairly complicated because it was 2006 and web browsers were not anywhere as capable as they are today. The task wasn't impossible, but on a page that was already overflowing with JavaScript, adding more to manage complex mouse movements and needing to save that information back to the server was a lot of painstaking error-prone work.

I asked for the raw data from the customer feedback sessions to see if I could figure out what the problem was that resizable columns would solve. In turned out no customers had asked for resizable columns (the product manager had inferred this request from the complaints). Instead, they were complaining that they couldn't get the new My Yahoo! page to look like their old My Yahoo! page. We had created completely new layouts that didn't match the old layouts, but it turned out people really liked the old layouts. This allowed us to focus on an easier problem: recreating the old layouts.

So, we spent a little time recreating the old layouts in the new page and re-ran the customer sessions. People were delighted that the new page now looked very similar to the old page. By solving the easier problem, we saved a lot of development time and the customers ended up just as happy.

There isn't always an easier problem to solve, but it's worth taking a moment to check whenever a problem seems particularly large or difficult.

## Conclusion

These five questions have become the basis for my problem-solving approach not just in my work, but in my life in general. Going through these questions whenever presented with a problem has made me a more efficient problem solver and, in general, happier with the outcomes. Can't calculate a 15% tip for my waiter? I calculate 20% instead (or 10% if I'm displeased with the service). My high school alumni office keeps sending me notices that I'm not a verified alumnus? That's not a problem I need to solve. I need to get a new driver's license if I want to travel within the United States? That's a problem I need to address this year, but not right now.

There are many ways to approach problem solving, and I'm not sure my approach will work for everyone. What I do know is that having an approach to solving problems is better than not having any approach. Life is filled with problems, small and large, that you'll face every day. Having a clearly defined, repeatable strategy is the easiest way to make problem solving more tolerable. 
