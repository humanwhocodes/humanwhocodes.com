---
title: "Making your open source project sponsor-ready, Part 2: Project hygiene"
teaser: "Attracting sponsors isn't always about reaching directly. Sometimes it's about doing the little things right that make your project successful."
author: Nicholas C. Zakas
categories:
  - Open Source
tags:
  - Open Source
  - Fundraising
  - Sponsorship
---

In part 1[^1] of this series, I described how companies make decisions about spending their money and why they might (or might not) sponsor an open source project. If you haven't yet read that post, I'd suggest going back to do so now before continuing. Everything in this post builds off the topics discussed in part 1, the most important of which is establishing a level of trustworthiness as both a maintainer and a project.

You are either building or destroying trust with everything that you and your project do online. Making sure that the trail you are leaving speaks well of both is important for attracting potential sponsorships. Fortunately, most of the steps are straightforward and, if you've been running your project for some time, you are likely already doing them.

## Use an OSI-approved license

The Open Source Initiative (OSI), which is the organization that officially defined the term "open source," has a list of approved open source licenses.[^2] These licenses have been fully verified to be open source licenses, ensuring software using these licenses can be "freely used, modified, and shared." This list is used by governments, companies, and lawyers when evaluating open source projects.

Double-check to make sure you are using an OSI-approved license without any custom modifications. Using other licenses creates a legal gray area for companies, which means they need to spend time reviewing the licenses with their legal team, and that might prevent them from using the project or sponsoring it. Companies are more likely to sponsor free and open source software than they are projects with custom licenses that might send a signal that the project isn't going to be free and open source forever. Don't make the companies do work to validate your license.

If you have already started your project with one license, don't be afraid to change it. There are numerous projects that have changed their licenses based on feedback from their users, including JSHint[^3] (which inherited the infamous "no evil" license from JSLint) and React[^4]. Depending on how dramatic the license change, you may want to adjust your version number accordingly.

If you are just starting out and unsure what license to use, I personally prefer the Apache 2.0 license[^5]. This license contains an explicit patent grant that companies tend to favor as opposed to the MIT or BSD license, neither of which mention patents in any way (which makes some companies nervous).

**Action item:** Double-check that your project is using an OSI-approved license and feature the license prominently on the README.

## Set up a code of conduct

Imagine that you are in charge of open source sponsorships at a company and someone suggests a certain project. Wanting to do your due diligence, you go to the project's GitHub page and look through recent issues and pull requests. What you see is a maintainer who is swearing and being defensive, commenters insulting code submissions, and just overall aggressive behavior by more than a few people. What message does that send about the project? Is that a recipe for attracting contributors and long-term support? Will a company want to be associated with such behavior? Of course not.

How you behave as a maintainer, and to a larger extent, the behavior of those who are collaborating on your project, reflects on the project as a whole. For the best example, look no further than Linux, which for years had a culture of conflict that ultimately led to the formal adoption of a code of conduct[^6]. Don't wait for things to reach that point. Establishing a code of conduct early on in the life of a project makes it more appealing to both contributors and sponsors.

The Contributor Covenant[^7] is a good place to start if you don't want to do much research. Keep in mind that you are expected to follow your code of conduct as well. Make sure your behavior is above reproach while interacting with (sometimes irrational) people on GitHub. Companies absolutely do look at issues to see how things are being handled. (And you never know when a new contributor might turn into an ally in getting their company to sponsor your project.)

**Action item:** Establish a code of conduct and feature it on your README and in GitHub.

## Publish documentation

A project without users is a project without sponsors, and one of the biggest barriers to open source project adoption is a lack of documentation. At a minimum, your project needs two sets of documentation:

* **Getting Started Guide** - this documentation is targeted at your project's users and guides them through installation and setup. If there are any prerequisites to installing your project, this should also be mentioned. The guide should continue through to using the project (executing it if it's an executable, using the API if it's an API, etc.).
* **Developer Guide** - this documentation is targeted at people who want to contribute code. At a minimum, this should describe how to get the source code and set up a local development environment. Ideally, it also describes any commit message formatting you require, the process for accepting contributions, and anything else between writing code and submitting a pull request.

Where the documentation lives is up to you. To start, it's fine to put most of the documentation on your README. As the documentation grows, you may want to have a dedicated documentation folder in your project that the README links to. Eventually, if your project gets popular enough, having a dedicated documentation website will help your users tremendously.

Remember, the more users and contributors you have, the more likely one of them will lead to a sponsorship, and documentation is a key part of attracting people to your project.

**Action item:** Write your Getting Started and Developer guides. Include them in, or link to them from, your README.

## Develop a roadmap and release plan

The most important question people ask about a project is "What's next?" Both users and sponsors want to know where the project is headed. For users, they want to know that the project is continuing to grow and develop; for sponsors, they want to know what their money is paying for. To answer both groups, it helps to develop a roadmap and a release plan.

A roadmap is simply a list of the work you plan to do within a specific time period. Your roadmap can be for any length of time you think is reasonable, but typically they are in the range of three months to one year. On your roadmap, list out anything that you think is important for people to know is coming. Features are an obvious addition to any roadmap, but you can also add bug fixes, documentation updates, integration tasks, and more. People just want to know how you plan on spending your time to improve the project going forward, and a roadmap lays this out for easy reference.

A release plan is a companion to a roadmap and establishes a schedule for when to expect releases. A lot of smaller open source projects have a "whenever I feel like it" release plan that, unfortunately, doesn't work as the project grows. Larger projects, and especially those that would like sponsorship, are well-served to come up with a release plan so users know when changes are coming. For example, Node.js has a well-defined release plan[^8] based on six-month intervals; ESLint does minor releases every two weeks. You can choose a schedule that works best for you. The most important thing is that this schedule is communicated so you can answer the question "When will this be released?"

When you do a release, be sure to explain how it relates to your roadmap. The easiest way to do this is to generate release notes from your commit history. GitHub can generate these release notes for you[^9] based on your pull request labels. Release notes are an important part of the release process so users and sponsors can see what changes are made.

**Action item:** Come up with a roadmap for the next year and establish a release plan for your project. Document both, either on your README or with your other documentation.


## Be responsive on GitHub

No one starts an open source project dreaming of the fun they'll have triaging issues and pull requests, yet maintaining a project often means spending a significant amount of time doing so.

Your level of responsiveness on GitHub speaks volumes about your level of commitment to the project. Few things say "abandoned project" more than GitHub issues and pull requests that don't get responses from maintainers.

Does that mean you need to rush to respond to every issue or pull request? No. Those will come in 24 hours a day, 7 days a week, and it's not reasonable to expect maintainers to be on call for every question or suggestion. However, you should have a regular schedule for responding to issues and pull requests. Maybe you respond just once or twice a week, and that's fine. It's more important to come up with a schedule you can keep than it is to respond immediately. If you know you won't be able to respond within a week, then you might want to note this on your README or with an automated message on your issues and pull requests.

**Action item:** Come up with a schedule for dealing with incoming issues and pull requests. Optionally, publish this schedule in your README or with an automated message.

## Establish support channels

Even though you'll spend time writing documentation, people will still have questions about your project, and for that, you'll need to establish one or more support channels. You probably don't want people opening issues for every question they have, so where would you like those questions to go? You can choose whatever will work best for you. Some popular options include:

* GitHub Discussions
* Discord or Slack
* A mailing list
* A forum

It's reasonable to just have one support channel for your project based on your preferred way of communicating, or you can establish multiple support channels if you have the team to respond. The important thing is that users (and sponsors) have a way to contact you that doesn't involve opening an issue.

**Action item:** Set up at least one support channel for your users and mention it on your README.

## Establish communication channels

Along similar lines, it's important for you to have a way to communicate with your users directly. When there is a new release, or a new team member joins, or a new sponsor signs up, you need a way to let your project's community know about these changes. Once again, the channel(s) you choose should fit with how you prefer to communicate. Some popular options are:

* Blog
* Twitter account
* Announcements channel in Slack/Discord
* Mailing list

Whichever channels you choose to use, be sure that they are listed in your README (and website, if you have one). It's important for users to know where they can go to get the latest information about the project.

**Action item:** Establish one or more communication channels and add them to your README and website.

## Conclusion

In this post, I've described some basic open source hygiene that all projects, regardless of sponsorship status, should follow. Doing all of these things won't automatically result in sponsorships, but they will set your project up for success when seeking sponsors. High-quality, valuable projects are the ones that companies are more likely to sponsor, and following the suggestions in this post helps set your project apart from a hobby project that a maintainer might lose interest in after a few weeks. The more professional your project appears, the easier it will be to find sponsors.

Now that your project is practicing good hygiene, it's time to prepare for the actual sponsorships. I'll cover that topic in my next post.


<i>Thanks to [Fred Schott](https://fredkschott.com/) and [Ben Nickolls](https://twitter.com/benjam) for reviewing early drafts of this post.</i>


[^1]: [Making your open source project sponsor-ready, Part 1: Companies and trust](https://humanwhocodes.com/blog/2021/12/making-open-source-project-sponsor-ready-companies-trust/)
[^2]: [Open Source Initiative Approved Licenses](https://opensource.org/licenses/)
[^3]: [JSHint - 2020 Relicensing](https://jshint.com/relicensing-2020/)
[^4]: [Relicensing React, Jest, Flow, and Immutable.js](https://engineering.fb.com/2017/09/22/web/relicensing-react-jest-flow-and-immutable-js/)
[^5]: [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
[^6]: [Linus Torvalds apologizes for years of being a jerk, takes time off to learn empathy](https://arstechnica.com/gadgets/2018/09/linus-torvalds-apologizes-for-years-of-being-a-jerk-takes-time-off-to-learn-empathy/
)
[^7]: [Contributor Covenant](https://www.contributor-covenant.org/)
[^8]: [Node.js - Releases](https://nodejs.org/en/about/releases/)
[^9]: [GitHub - Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
)
