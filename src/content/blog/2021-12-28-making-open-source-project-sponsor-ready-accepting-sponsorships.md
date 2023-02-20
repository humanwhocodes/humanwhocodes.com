---
title: "Making your open source project sponsor-ready, Part 3: Accepting sponsorships"
teaser: "When your project is ready to accept sponsorships from companies, there are several things you can do to improve your chances. This post describes how to prepare your project to ensure sponsorships can start flowing in."
author: Nicholas C. Zakas
categories:
  - Open Source
tags:
  - Open Source
  - Fundraising
  - Sponsorship
---

In the previous two posts in this series, I described why companies sponsor open source projects[^1] and how following some basic project hygiene can help attract sponsors[^2]. Now that your project is functioning at a high level and is attractive to companies, it's time to talk specifics about accepting sponsorships from companies. 

## Making it easy for companies to donate

If you only accept donations through Bitcoin, paper checks, or direct deposit into your personal checking account, what signal do you think you're sending to companies? How you accept sponsorships largely determines how many you will receive in two ways:

* Establishes (or destroys) trust with the company
* Makes it easy (or hard) for the company to donate

Companies are not going to create a new process to pay you. You need to find a way to accept donations using the processes that companies already use. By accepting donations through a trusted intermediary, you're signaling that you've taken the time to think through your sponsorship program and are comfortable with some transparency and traceability when it comes to your sponsorships. Both are important for making companies comfortable with donating. Fortunately, there are two excellent options available:

* **Open Collective**[^3] - Open Collective is an open source-focused sponsorship site that is  popular among many projects and contributors. Open Collective offers a number of different ways for companies to donate, including through direct debit, lump sum payments that are distributed to many projects over time, and gift cards. Many large companies signed up for Open Collective early on and are familiar with the platform. Donations are received through the Open Source Collective, which is a nonprofit, which may be important for some companies. There is a small fee for handling funds. 
* **GitHub Sponsors**[^4] - If a company cares about open source, then they likely have a corporate GitHub account. That is good news for you because they can donate through GitHub Sponsors using their existing billing relationship with GitHub. If you already have a GitHub account, there's no reason not to set up a GitHub Sponsors page. It's free, and GitHub doesn't take any fees from the donations collected. You can also have money from GitHub Sponsors transferred to your Open Collective account so the money is all in one place (more on why you might want to do this later).

Once you have set up your funding options, be sure to configure your funding.yml file so GitHub will display a sponsor button on your project page.[^5] You can add Open Collective, GitHub Sponsors, and other links that will appear on your project page.

**Action item:** Set up Open Collective, GitHub Sponsors, or both. Set up your GitHub project to show how people can donate.

## Establish where sponsor logos will go and how they get there

As discussed in part 2, companies will sponsor your project to generate good publicity for them in the open source community. The most common way to deliver this to your sponsors is through placing their logos in highly visible places. If you've ever been to a tech conference then you've probably seen sponsor logos placed on the projector screen in between or at the end of talks as well as on the print schedules. As a maintainer, you are trying to deliver the same level of attention to your sponsors.

Projects typically display their sponsors' logos in at least two places:

* **Website -** if your project has a website, then displaying sponsor logos on the homepage is the best way to promote your sponsors. Some projects also choose to show these logos throughout the site, sometimes in a sidebar or a footer.
* **README -** at a minimum, sponsor logos should be displayed on your README. Sometimes the README gets more views than a project's website. Not every user will go to your website but most will take a look at the README. Because READMEs are often copied to other locations (such as npm for JavaScript projects), sponsor logos get the most visibility.

Once you've determined where the sponsor logos will go, the next step is to set up some automation to update those logos. Both Open Collective and GitHub offer APIs that allow you to pull your sponsor information for this purpose. Investing in this automation early will save you the time it takes to manually track down, resize, and place logos in the correct places for each new sponsor.

**Action item:** Determine where your sponsor logos will go and establish automation to update logos in those locations.

## Explain how the funds are (or will be) used

If you've ever driven along a highway and seen a sign next to some construction that reads "Your tax dollars at work," you'll know the importance of letting sponsors know how their money is being spent. Similarly, another consideration for accepting sponsorships is how you will spend the funds. It's important to think this through before you accept your first sponsorship because companies will want to know your plans for the money. 

This is where having a roadmap (discussed in part 2) helps. It's an easy story to tell that money collected will go towards fulfilling the plans on the roadmap. While it's not easy to estimate how much it costs to implement a feature, it can help to think about how many hours it will take. Then, multiply that by some hourly rate you'd feel comfortable working at and use that as the cost to implement that feature. That way, you can put together a funding goal that companies can contribute towards. For instance, let's say that you estimated the cost to implement your 12-month roadmap is $20,000 USD. You can then set up your goal on Open Collective and GitHub Sponsors and explain how much of your funding goal needs to be reached to implement which parts of your roadmap.

The next step after a target funding goal is to describe how the money will actually be spent. Not every maintainer wants to work 40 hours a week on their project, nor is that required to receive sponsorships. ESLint, for example, started receiving sponsorships in 2019 and has never (up to the time of my writing) had a single full-time maintainer. Other projects like Babel and Webpack do have full-time maintainers. How you plan to spend your sponsorship money is up to you, but it is helpful to explain that to potential sponsors.

The best place to do this is right alongside your call for donations, but you can also do it in a blog post or a paragraph on your README. Just make sure this information is readily available for any potential sponsors who come along. Here are some examples:

* Donations will be used to pay the maintainer(s) with an eventual goal of working full time on the project.
* Donations will be used to pay the maintainer(s) with an eventual goal of working one eight-hour day each week on the project.
* Donations will be used to pay all contributors for their contributions.
* Donations will be used to fund community events, T-shirts, promotional materials, and speaking engagements.
* Donations will be used to implement a specific feature or hire outside help.

After you receive your first sponsorships, be sure to update everyone on how the money was actually spent. This can also be in the form of a blog post or a message to your sponsors (both Open Collective and GitHub Sponsors allow you to send messages directly to your sponsors). In general, it's beneficial to post this information publicly because it can also send a signal to potential new sponsors about how your project is operating with the money it has already collected.

If you are using Open Collective to disburse funds, all transactions are visible to the public, which is a great way to show how the funds are being used. This is why you may want to consider having your GitHub Sponsors funds deposited into your Open Collective account. That way, all funds can be disbursed from Open Collective in a public ledger that makes it easy for sponsors to see how the funds are being used and also allows you to easily generate reports off the transaction data.

Regardless of how you decide to explain how funds are used, make sure you issue regular updates. Never give the appearance that the money is disappearing into a black hole. It's going somewhere, so be sure to tell that story.

**Action item:** Come up with a plan for how sponsorship money will be used and publish it on your README or website in addition to Open Collective and GitHub Sponsors.

## Be prepared to say "no"

An underrated part of accepting sponsorships is to choose your sponsors wisely. While you may think any company that is willing to give you money is a sponsor you'd want, think again. Some companies will sponsor your project because they use it internally and want to ensure its success, but others will see sponsorship a lot like buying an advertisement: it's just publicity in exchange for money, and they don't care what happens to the project.

Open Collective, in particular, has a problem with less-than-reputable companies signing up to sponsor projects just for publicity. While Open Collective is putting more controls in place to limit these companies' ability to donate to projects, you'll still need to monitor incoming sponsorships to ensure that these are companies you want to do business with.

Aside from ensuring your sponsors align with your values, you also need to make sure you're accepting sponsorships from companies that other companies want to have their logo next to. If your first couple of sponsor logos are for overseas online casinos, is that something Google or Microsoft or Amazon would want their logos next to? Of course not. 

Your first sponsorships, in particular, may have a disproportionate impact on how potential sponsors see your project. If your first logo is Microsoft, that will encourage other companies to sponsor your project; if your first logo is Joe's Tackle and Sports Book Shop, that's not going to entice new sponsors.

**Action item:** Create a sponsorship policy that lists out what types of companies you will (or won't) accept sponsorships from. Post this publicly so everyone is aware, though keep in mind that few companies will read this upfront. It's just helpful to be able to point them to your policy when questions arise.

## Conclusion

Early on in ESLint's fundraising, several companies told us they would sponsor the project if we signed up for Open Collective. Not all companies will be that forward with projects they want to sponsor. That's where the suggestions in this post come in. By using trusted third parties to collect donations, display sponsor logos, explaining how you'll use the funds, and being careful about which companies you accept sponsorships from, your project will be more attractive to companies. Meeting companies where they are, especially if they are already sponsoring other open source projects, is the best way to get started.

I hope you've enjoyed this three-part series about making your open source project sponsor-ready. I wish your project a lot of success and sponsors.



<i>Thanks to [Fred Schott](https://fredkschott.com/) and [Ben Nickolls](https://twitter.com/benjam) for reviewing early drafts of this post.</i>


[^1]: [Making your open source project sponsor-ready, Part 1: Companies and trust](https://humanwhocodes.com/blog/2021/12/making-open-source-project-sponsor-ready-companies-trust/)
[^2]: [Making your open source project sponsor-ready, Part 2: Project hygiene](https://humanwhocodes.com/blog/2021/12/making-open-source-project-sponsor-ready-project-hygiene/)
[^3]: [Open Collective](https://opencollective.com)
[^4]: [GitHub Sponsors](https://github.com/sponsors)
[^5]: [GitHub - Displaying a sponsor button in your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository)
