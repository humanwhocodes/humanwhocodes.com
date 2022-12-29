---
title: "How to talk to your company about sponsoring an open source project"
teaser: "Sustainable open source funding begins and ends with companies providing money for the value they're receiving."
author: Nicholas C. Zakas
categories:
  - Open Source
tags:
  - Open Source
  - Fundraising
---

Open source sustainability is a topic that is just starting to get the attention that it deserves. So much of the technology sector is run on software that can be used for free without any further obligation. However, as companies profit from using this software for free, the maintainers of the software often struggle to find enough time to work on the software while making enough money to survive. Many are forced to work full-time jobs to subsidize the development of these open source projects, or else try to work full-time on the project while making less than they would in the industry. While donations from individuals help, the only real way to make open source sustainable for maintainers is for the companies who reap the outsize benefits of the software to donate towards their maintenance.

This post contains everything I know about convincing a company to support open source projects. I've worked with many companies to donate to ESLint, the open source project that I've founded, and in doing so, I've learned a lot about how these efforts are organized. My hope is that this post will serve as a guide to help others convince their companies to donate to the open source projects that support their businesses.

## Getting your story straight

Before you start talking to people about sponsoring an open source project, it's important to take some time to craft the story you'll tell them. A lot of developers, with their hearts in the right place, tell a story that donating to an open source project is "the right thing to do." While that might actually be true, most companies don't operate on the basis of altruism. Companies don't exist to give away their hard-earned money; they exist to make more money. If you want to convince your company to donate money to an open source project, you're going to have to make the case that doing so actually benefits the company (outside of warm fuzzy feelings).

Generally speaking, a company will spend money on something that accomplishes any of these three goals:

1. Saves time
1. Saves money
1. Generates more money

Your job is to make the case that the open source project helps achieve one or more of these goals. In most cases, you can argue that the project saves you time because it prevents you from needing to implement the functionality yourself. In some cases, you can argue that the project bootstraps common tasks that would otherwise take you weeks or months to accomplish. If the project is a code quality tool like ESLint then you can argue that it saves you time by catching bugs or other quality issues before they happen. Really take the time to think through how the project is benefitting your workflow.

Once you've tied the open source project to at least one of the three goals, imagine what would happen if the project was no longer maintained. How long does it takes before that absence starts to work against the three goals? How much will it slow you down or cost you money if you couldn't use the project anymore? That is why donating to the project is valuable: your workflow is dependent on this project and removing the project now would cause harm, either through time or money. Therefore, it makes sense to donate to the project in order to maintain the advantage you've already realized for the foreseeable future.

### Crafting the presentation

After putting together a good story of why it makes sense to donate to the project, the next step is to present that story to the correct person in your organization. It makes sense to start with your manager to get their support, though you may need to present the same information multiple times in order to get approval. The format of this presentation will be dependent upon the norms of the company, so you should be prepared to put together an email, a PowerPoint presentation, or an explainer, depending on your company's preferences.

Regardless of the format, your presentation should answer the following questions for your audience:

1. **What does the project do?** What 2-3 sentences describe the purpose of the project? Assume your audience doesn't know anything about it and introduce both the problem the project solves and what the solution looks like.
1. **Where is the project used in your company?** Is it used in a continuous integration environment? In your text editor? Is it customer facing (like a UI framework)? This gives context to your audience about how integrated the project is in your current workflow. It's likely your audience may not even be aware the project is in use.
2. **What value do you get from using the project?** Does it lead to fewer bugs? Faster feature development? Does it generate more revenue? Again, assume your audience knows nothing about the project and how you're using it. Remember to include at least one of the three goals mentioned earlier in this post.
4. **Who receives the money?** When you donate the money, where does it end up? In a foundation? In an individual's bank account? You'll have better luck getting a donation to a project if the project is set up on a reputable site like Open Collective[^1] or GitHub Sponsors[^2]. It's difficult to convince your company to send a large amount of money to a PayPal email address. If the project isn't already on Open Collective or GitHub Sponsors, it's worth reaching out to the maintainers to ask them about this.
3. **How does the project use the money it receives?** Are they paying maintainers? Do they use money for infrastructure? Again, you can't argue that it's "nice" to pay maintainers of a project. Be explicit about how the money is used. In many cases, it will go directly to pay the maintainers, so that's important to call out. It can help to mention if the maintainer doesn't otherwise have a salary, as it lends to the importance of paying the maintainers to ensure the project will continue to be maintained.
5. **What does the company get in return for the donation?** A logo on the README or website? Is there a priority support channel? Make sure there is some direct benefit for the sponsorship. Companies will be looking for some sort of recognition of their donation (explained later in this post). If the project doesn't offer anything in return, reach out to the maintainers and ask at least for a sponsorship notice in the README or website. Many maintainers will be happy to do that and it gives you a better argument.
6. **What commercial alternatives are available and what do they charge?** Would a paid alternative cost more or less than donating to support the open source project? This doesn't apply to all projects, but if there is a commercial alternative, this can be a powerful part of your story because you can tie actual dollar amounts to the value of the project. If a commercial solution costs $10,000 and you're asking the company to donate $1,000 to the open source version, that comes off looking like a big cost savings to the company.
7. **What other companies are sponsoring the project?** Are any big companies sponsoring the project? If you want to donate to a project that already has some corporate sponsors, it can help to call those out. A project that is sponsored by a well-known company such as Google or Facebook creates social proof that it is not just okay but expected to sponsor this project. As an added bonus, potentially getting your company's logo next to Google or Facebook's logo could be a selling point. If there aren't any other sponsors, it's best not to bring that up unless asked directly.

Pulling all of this information together can take some time, but ultimately, these are the details you will need to convince your company to sponsor an open source project.

Hopefully, you will get approval for sponsoring a project not long after making the presentation. Your work is far from over, though. To move forward, you need to understand a little bit about how companies manage their money, and in doing so, where you can find the money to sponsor a project.

## Finding the money

Companies generally work on budgets at two levels: yearly and quarterly. The yearly budget for the next year is set towards the end of the fourth quarter of the current year and is typically when the top-level budget items (sometimes called *cost centers*) are established. You can think of these as defining the row labels in a spreadsheet -- these are the categories under which funds are assigned. The quarterly budget for the next quarter is established towards the end of the current quarter, and typically you cannot add budget items during the quarterly process, you can only adjust the amounts assigned to each item. This is important to understand because it is unlikely that you'll be able to get funding for an open source project within three months. You'll need to get the request into one of the windows for the yearly or quarterly budget planning process, and sometimes that can take several months.

Because getting a budget item added is difficult and make take a year, it's usually easier to work within the existing budget items to find funds that can be used for open source. Here are some budget items that are typically used to sponsor open source projects:

1. Dedicated Open Source Fund
1. IT/Software
1. Marketing
1. Recruiting

Each of these budget items have different reasons why they might be appropriate, so it's helpful to dig in to the details.

### Dedicated Open Source Fund

Obviously, if your company has a dedicated open source fund, then that is where the money should come from. This is money that has already been set aside from the company to sponsor open source projects and there is likely more money in there than is being used at the moment. It may be as simple as filling out a form or emailing the right person to get a new project considered for sponsorship. This is a good sign that your company is a leader when it comes to open source sustainability and the process for devoting funds to a project is already established.

Your ultimate goal should be to get a dedicated open source fund budget item established at your company because that is the only way to ensure that (or at least increase the likelihood that) the funds will actually be used for open source sponsorships. Whenever you are dipping into other budget items to sponsor open source, it's possible for those funds to be reallocated to something else each quarter.

### IT/Software

Any modern company runs on a large amount of software, whether that be Gmail, GitHub, AWS, Salesforce, or any number of other software-as-a-service products. As such, there is usually a dedicated budget for this type of software, and once again, there is usually some extra dedicated for unanticipated software needs during the quarter. Because open source software is, afterall, software that your company is relying on, you can make a strong argument that funds in this budget item can be used to sponsor a project.

If your company doesn't already have a dedicated open source fund, looking at the IT/Software budget item is a good place to start. Your manager or director should have direct insight into whether this is possible because they likely receive a specific amount each quarter. The amount you receive is likely to go on in the future unless you stop using the project you want to sponsor.

### Marketing

One of the underrated aspects of sponsoring open source projects is just how much good publicity it brings to companies. Companies spend a lot of money on something called *brand awareness*, which is basically whether or not people know the company in the industry. Google, Facebook, and Apple all have great brand awareness: you know what they do and how they benefit you. The result is more sales, and also, an easier time recruiting new employees. So how does sponsoring an open source project increase brand awareness?

Companies regularly spend thousands of dollars sponsoring tech conferences to get their logo in front of 1,000 people for three days. Many open source projects offer logo placement on their READMEs and websites, which can easily reach more eyes even for projects that aren't well-known. Plus, open source projects are good at promoting their sponsors. ESLint, for example, tweets out a public thank you and will also publish a blog post touting the sponsorship. This type of publicity is a big win for companies, as it is a grassroots effort that shows the company believes in supporting its developers and tools they use.

Getting access to these funds often takes a bit of digging. As always, you can start with your manager, but you'll ultimately need to find someone who works in marketing to talk with and explain the opportunity. Just be careful: the marketing department thinks in terms of "campaigns," which are fixed-length periods of spending a certain amount of money to get a certain result. In short, sometimes this ends up being equated to an ad buy and you'll need to discuss renewing the commitment after some period of time. 

### Recruiting

As previously mentioned, brand awareness is important to the company for a number of reasons, and one of those is the ability to attract and hire new employees. Even though a good amount of these efforts fall under marketing, some are recruiting-specific. Recruiting departments regularly spend money on sourcers (those folks who email you directly asking if you'd like to apply), software like LinkedIn and Indeed, booths at college job fairs and tech conferences, and swag like t-shirts, cups, and hats. All of this is to say: recruiting spends a lot of money to try and attract job candidates.

Sponsoring an open source project is a good way to attract job candidates. As long as the project does a decent job at promoting its sponsors (and most of them do), your company is likely to get in front of exactly the people who they are looking to hire. Developers know what open source projects they prefer to use, and if they can find a company where they can no only use it but also contribute to it, that's a big selling point for a job applicant.

I put this as the last option of the four because it tends to be the hardest to get and is also prone to strict timelines after which you'll have to discuss renewing the contribution. Your manager likely has someone who they work with in recruiting regularly, and so that person is a good place to start the conversation. Going through recruiting will likely take longer than going through other budget items, but it is an option nonetheless.

## Sponsorship approaches

At this point, you have hopefully identified where in the budget the money for open source sponsorships will come from. The next step is to determine what type of sponsorship your company will make. As with finding money in the budget, there are many approaches that companies take when sponsoring open source projects. You'll need to find the solution that best matches your company's culture and approach to open source. Fortunately, there are many options to choose from.

### Monthly contributions

Open source projects generally prefer monthly contributions to keep the project funded. If at all possible, getting your company to commit to donating a monthly amount for 12 months gives the project the most financial stability. There are ongoing costs to maintaining an open source project and having a reliable amount of money coming in every month helps the maintainers to plan ahead of time. Platforms like Open Collective and GitHub Sponsors allow you to pledge contributions both monthly and yearly. When specifying a yearly donation, the amount can be set up to be evenly split among the upcoming 12 months.

This option works well if your open source donations are coming from your IT/Software budget item, as most software is billed on either a monthly or yearly basis.

### Open source grants

For some companies, the idea of donating monthly will not be the best option. It feels like a commitment without an end, and that can be a hard sell. Another approach is to create an open source grant, which is a one-time donation to a project based on some set of criteria. It's up to the individual companies to determine what those criteria are, and there is no one right way to do it. 

Companies like Indeed[^3], Microsoft[^4], and Salesforce[^5] have set up Free and Open Source Software (FOSS) Contributor Funds, where the employees who have contributed to open source projects during the quarter are then allowed to nominate and vote for open source projects to receive a one-time donation (typically $10,000). FOSS Contributor Funds tend to be popular within their host companies because they allow the developers themselves to determine which projects are considered for a donation.

Some companies also provide open source grants that must be applied for. Mozilla[^6], the Sloan Foundation[^7], Google[^8] [^9], and Comcast[^10] have grant programs where anyone is welcome to apply for a one-time grant. The decisions are typically made by a committee who is dedicated to reviewing and choosing grantees.

Grants are a great way to support open source projects if your company isn't willing or able to provide ongoing monthly support. Grants are less favored by open source projects because there is far less predictability of income, but in the end, any donations are appreciated. There is also a bit of a downside for the company because there is administrative overhead associated with a grant program.

Using grants is more beneficial if you end up using marketing or recruiting budget to fund open source projects because there is a set amount and duration.

### Employee gift cards

Another option that is available exclusively through Open Collective is to give open source gift cards[^11] to employees. The gift cards can then be used to fund any project that is on Open Collective. With this approach, the company would transfer some amount of money to Open Collective in a lump sum. Gift cards would then be issued for any number of employees, with each gift card representing a set amount of that lump sum. The employees are then free to use those gift cards to donate directly to any project they want, so long as it is capable of receiving funds through Open Collective.

This can be a nice option for companies who can't commit to a monthly or yearly donation and who don't want the overhead of running a grant program.

## Other things to keep in mind

There are just a few other notes I'd like to share as your work on convincing your company to sponsor an open source project:

* Don't expect that you can hand off this initiative to someone else. Your manager is unlikely to take this on as their own task. In every company I've worked with to get a donation, the process has been driven to completion by a passionate engineer or group of engineers. You will have more success with a bottom-up approach rather than expecting your manager to make time for it.
* Leverage existing vendor relationships as much as possible. Getting a vendor approved at your company can require a large amount of effort on its own. Asking the company to onboard several different vendors to allow you to donate to several different projects is unlikely to succeed. Instead, focus your efforts on getting vendor approval for Open Collective and GitHub Sponsors. With Open Collective, you can set up a fund[^12] where you can transfer a lump-sum of money and then donate to individual projects from that fund; with GitHub, if your company is already paying for a GitHub organization, you can leverage that relationship by having donations appear on the monthly bill[^13].
* If your company already donates to an open source foundation, such as the Linux Foundation, they may not realize that those donations to not go directly to projects. For example, ESLint is part of the Open JS Foundation, however the Open JS Foundation does not provide any money directly to ESLint. Open source foundations exist to provide a legal infrastructure and technical resources to projects. These are important, but they are very different from providing funds to the projects. You may need to explain this to your company.
* Be patient with your company. Especially in large companies, progress is slow and changes happen with persistence over time rather than all at once. If your company has never even considered donating to an open source project then you'll need to provide a lot of context and get a lot of signoffs. This is completely normal. Don't take it personally, just realize that giving away money for some unknown benefit is not high on most company's lists of priorities.

## Conclusion

In this post, I've explored all of the topics I'm aware of with regards to company open source sponsorships. As I'm sure you realize if you're read this far, it can take a lot of work to get your company started with donations to open source projects. My own experience has taught me to allow at least six months from first contact until the first donation is made, so patience is key throughout this process.

Making sure you have a good story to tell, finding the budget, and the establishing the structure of the program are the three most important steps in this process. And once all of this has been established for one project, it's easy to apply to the next project. Indeed, companies tend to increase donations after they've accomplished one because the infrastructure is already in place. Establishing your company's open source sponsorship program is a fixed, upfront cost that then allows less friction for other donations going forward.

My hope is that we are moving towards a time when companies, especially those large corporations, who benefit from using open source software will also start seeing open source sponsorships as part of their core business activities. It's this software, available for free, that allows small startups to grow into massive multinational companies. It would be nice for more companies to pay it back in some way.

## References

[^1]: [Open Collective](https://opencollective.com)
[^2]: [GitHub Sponsors](https://github.com/sponsors)
[^3]: [Indeed FOSS Contributor Fund](https://opensource.indeedeng.io/FOSS-Contributor-Fund/)
[^4]: [Microsoft's Free and Open Source Software Fund](https://github.com/microsoft-sponsorships/microsoft-foss-fund)
[^5]: [Announcing the first Salesforce FOSS Contributor Fund Recipient](https://engineering.salesforce.com/announcing-the-first-foss-contributor-fund-recipient-60a295201497)
[^6]: [Mozilla Open Source Support Awards](https://www.mozilla.org/en-US/moss/)
[^7]: [Sloan Foundation Digital Technology](https://sloan.org/programs/digital-technology)
[^8]: [Google Summer of Code](https://summerofcode.withgoogle.com/)
[^9]: [Google Season of Docs](https://developers.google.com/season-of-docs)
[^10]: [Comcast Innovation Fund](https://innovationfund.comcast.com/)
[^11]: [Open Collective Gift Cards](https://opencollective.com/gift-cards)
[^12]: [Open Collective Funds](https://docs.opencollective.com/help/financial-contributors/organizations/funds)
[^13]: [Companies can now invest in open source with GitHub Sponsors](https://github.blog/2020-12-08-new-from-universe-2020-dark-mode-github-sponsors-for-companies-and-more/#companies-can-now-invest-in-open-source-with-github-sponsors)
