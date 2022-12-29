---
title: "Sponsoring dependencies: The next step in open source sustainability"
teaser: "We are at a point in open source development where it's become clear that not all projects have the same opportunity to receive funding and maintainers are the key to fixing this."
author: Nicholas C. Zakas
categories:
  - Open Source
tags:
  - Open Source
  - Fundraising
  - Sustainability
---

When the JavaScript Standard Style (StandardJS) project[^1] decided to show ads during installation, the backlash was swift and harsh. The project is an opinionated JavaScript style guide, formatter, and linter all in one, and it was also the first npm project to try and raise money by inserting an ad in the command line.[^2] The "experiment" was terminated soon after it was started.[^3] But to me, this opened up a big question: given that StandardJS is simply a wrapper around ESLint that disables customization, what responsibility does StandardJS have to ESLint?

Open source maintainers should be able to accept sponsorships for their work, but does that funded project have a responsibility to the project on which it was built to pass some portion of the funds along? After all, if the majority of the benefit of your project is based on the work of someone else's project, is it really fair for you to profit?

Isn't there some level of responsibility when a project receives funding to help all of the projects on which it is built?

## The stratified open source ecosystem

When people say "open source," it could mean any number of things. Vue,[^4] the UI framework upon which many modern web applications are built, is an open source project with 2.8 million weekly npm downloads; `he`,[^5] a small npm package that helps with encoding and decoding HTML entities in strings, is also an open source project, and it has 13.5 million weekly npm downloads. Which one would you rather donate to? Does one inherently deserve more funding than the other?

Some may say that both projects have a responsibility to find their own funding. They are both equally capable of setting up a website to accept donations. They are both equally capable of reaching out to individuals and companies for funding. They are both equally capable of giving presentations about their project to attract interest. But there is a fundamental difference between these two projects.

The reality is that we live in a stratified open source ecosystem. The very top spot is reserved for those projects that get a lot of name recognition and use. Projects like Vue that are end-user facing (the result is visible directly to end-users because the user interface is built with it) and those that are developer-facing (developers specifically choose to use the project) get a lot of attention as people share their experiences, best practices, tooling, testing, and other tips and tricks to best use the project. Because Vue is constantly being mentioned, the project gets more mindshare, and that makes it easier to attract sponsorships; because Vue is end-user facing, it's easier to understand its value proposition to the companies that use it. Both companies and developers are more motivated to support these projects both financially and through code contributions.

On the other end of the spectrum, there are ecosystem projects that provide utilities or low-level functionality, like `he`, that most people will never hear of. These projects are included as dependencies by the projects that companies and developers choose to use, and so sit in the background without much visibility. And even if companies and developers hear about a dependency like `he`, would they think it's important enough to fund? Can you imagine approaching a company for funding and explaining that your utility encodes and decodes HTML entities? They would probably think you were joking, and in any case would laugh.

There is no doubt that Vue requires more ongoing maintenance and development than `he`, so `he` clearly doesn't need as much funding, but does it deserve zero? Yet, Vue depends on `he`, so clearly it has value to Vue. What responsibility does Vue then have to `he`?

## The consequences of stratified open source

We have already seen major security issues in open source projects that weren't properly funded. The heartbleed bug in OpenSSL essentially made the web unsafe until it could be fixed.[^6] At the time (2014), OpenSSL was receiving just $2,000 per year in donations and had one developer working on it. OpenSSL is still a foundational piece of internet technology, embedded in everything from web browsers to web server software, and yet it was terminally underfunded. Eventually, the Linux Foundation stepped up to pledge support to ensure that such an important project was never left without funding again.

Closer to the JavaScript ecosystem, the creator of faker.js and colors.js Marak Squires intentionally crippled[^7] the projects over frustration about a lack of funding. He is quoted as saying he was, "no longer going to support Fortune 500s (and other smaller-sized companies) with my free work." He had tried to set up a GitHub Sponsors account and an Open Collective account, but he still wasn't able to make enough money.

If a foundational piece of internet security like OpenSSL has struggled with a lack of funding for years, how do you think that the conversation would have gone asking to sponsor faker.js (a project for creating fake data) and colors.js (a project to add colors and styles into console applications) would have gone?

The harsh reality is that not all open source projects have the same opportunity to raise funds. So how can we expect these projects to survive?

## With great power...

It's too easy to say that each project should be responsible for its own funding when there is such a clear stratification of projects. If a company has an open source sponsorship budget, a package like `he` has very little chance of competing for those funds against Vue. Vue will win 99% of the time. When scaled across all open source projects, we end up with a small number of large projects that receive the majority of funding, and then a large number of smaller projects that receive little or no funding. And when the bigger projects rely on the smaller projects, this is unsustainable. A single broken low-level dependency can risk the entire larger project and all of its users.

The solution to this problem really is simple: open source projects should fund their own dependencies. I would even go so far as to say this isn't just the best solution to the problem, it is, in fact, a *responsibility* of those larger, well-funded projects to support their dependencies. The spirit of open source is one of giving recognition to those pieces upon which your software is built, and there isn't any reason that recognition can't be extended to funding.

There are several projects in the JavaScript ecosystem that receive over $100,000 each year in donations, including:

* Babel[^8] - $303,000
* Webpack[^9] - $250,000
* ESLint[^10] - $190,000
* Vue[^11] - $150,000 (plus unknown amount on GitHub Sponsors)

Imagine if each of these projects carved out a percentage of their sponsorships to give to their dependencies. At 10%, that would mean over $80,000 would end up in the hands of other projects that are less able to attract funding. That amount of money would make a significant difference to smaller projects.

## A practical sponsorship pledge

What does a practical dependency sponsorship program look like? Certainly, a project can't be expected to give away the majority of its funding to dependencies, and I wouldn't suggest that. Instead, there are a few simple steps maintainers can take to get started:

* **Budget to give away 10% of your funding to your dependencies.** The best way to plan is just to budget right from the start. In most cases, 10% of your funding isn't enough to hurt your project's maintenance and development. If in your case it is too much, then cut it down to 5%. Or 1%. The important part is that you plan to start supporting your dependencies on a monthly basis by budgeting for it. 
* **Start with the have-nots and work your way up.** When deciding which projects to sponsor, start with the ones that have little or no funding. You can use BackYourStack[^12] to identify your dependencies and determine if they have an Open Collective account. If they don't have a mechanism set up to accept donations, you can always pledge them on Open Collective[^13] or reach out and encourage them to set up a way to donate. It's fine to start with sponsoring one project rather than trying to spread funding across multiple. As you raise more money, you can always sponsor more projects. It doesn't make sense to donate money to projects that already have more money than yours. Even though ESLint uses Webpack, Webpack has more funding than ESLint, so it doesn't make sense for ESLint to donate to Webpack. Instead, ESLint donates to dependencies like lint-staged, which have significantly less funding.
* **Reward excellence.** In addition to financial need, you may want to add other criteria that show how well the project is maintained. Does it have a proper open source license? Does it have a code of conduct? You can use donations as a way to help level up your dependencies in addition to supporting them.

In this way, projects of any size can contribute to the well-being of their dependencies. Sponsorships then flow from the largest, best-funded projects all the way down the dependency tree to the zero-dependency packages. Even if your project is receiving as little as $100 each month, you can still make a difference to another project that isn't receiving any funding.

## A call to action: do your part

If you are the maintainer of a well-funded open source project, *now* is the time to step up. For too long, we have sat back and taken in sponsorships for our own use even as the projects that we depend upon have struggled to find funding. We have the power and responsibility to improve the situation for maintainers of all open source projects. ESLint[^14] and Astro[^15] have already established programs to donate to dependencies. You can join them in spreading the wealth around.

If you maintain a smaller open source project that needs funding, figure out if there are any well-funded projects that depend on your project directly and contact the maintainer. Feel free to ask for their financial support and reference this blog post. Make sure that you have set up both a GitHub Sponsors[^16] account and an Open Collective[^17] account to make it easy to accept donations. Don't be afraid to approach these folks and ask for their help. They have benefited from your work for a long time, so you're not asking for something in return for nothing; you're asking for compensation for the value you've already provided.

If you are sponsoring an open source project, ask them what their dependency support program looks like. Sponsors are in a unique position to apply pressure on projects to distribute their funds appropriately. For the ESLint project, we have heard from sponsors that we were chosen over other projects partly because we were supporting our dependencies. As in any marketplace, the people with the money have an outsize effect on how the marketplace runs.

We all need to do our parts to ensure that we are moving towards an open source ecosystem where the most valuable projects don't struggle with funding. Let's open up a downstream transfer of funding wherever possible.

## Conclusion

> "We need to fund projects based on what we use rather than what we see."
> – Ben Nickolls, Executive Director, Open Source Collective

Open source isn't going to survive if we keep doing things the same way they've been done. Relying on individual donations of $5-$10 each month isn't anywhere near enough for most projects to survive. The only solution is corporate funding. And while more companies are willing to donate to open source, the number of projects they are willing to donate to is small and often limited to what is providing the most immediate value to them. Those projects that are fortunate enough to have the visibility and mindshare to attract funding have a responsibility to their dependencies to ensure the entire ecosystem's survival. If we can end up in a place where companies donate to a small number of open source projects, and those projects, in turn, donate to others, we will help spread funding throughout the entire ecosystem and truly create a path to sustainability.

<i>Thanks to [Fred Schott](https://fredkschott.com/) and [Ben Nickolls](https://twitter.com/benjam) for reviewing early drafts of this post.</i>

## References

[^1]: [JavaScript Standard Style](https://standardjs.com)
[^2]: [npm install funding](https://github.com/standard/standard/issues/1381)
[^3]: [StandardJS Pauses Experiment with Ads in the Terminal after Linode Pulls Sponsorship](https://wptavern.com/standardjs-pauses-experiment-with-ads-in-the-terminal-after-linode-pulls-sponsorship)
[^4]: [Vue](https://vuejs.org)
[^5]: [`he`](https://npmjs.com/package/he)
[^6]: [Tech giants, chastened by Heartbleed, finally agree to fund OpenSSL](https://arstechnica.com/information-technology/2014/04/tech-giants-chastened-by-heartbleed-finally-agree-to-fund-openssl/)
[^7]: [JavaScript dev deliberately screws up own popular npm packages to make a point of some sort](https://www.theregister.com/2022/01/10/npm_fakerjs_colorsjs/)
[^8]: [Open Collective: Webpack](https://opencollective.com/webpack)
[^9]: [Open Collective: Babel](https://opencollective.com/babel)
[^10]: [Open Collective: ESLint](https://opencollective.com/eslint)
[^11]: [Open Collective: Vue](https://opencollective.com/vuejs)
[^12]: [BackYourStack](https://backyourstack.com)
[^13]: [Open Collective: Make a Pledge](https://opencollective.com/pledges/new)
[^14]: [ESLint: Supporting our dependencies](https://eslint.org/blog/2020/09/supporting-eslint-dependencies)
[^15]: [Astro dependencies donation announcement](https://twitter.com/astrodotbuild/status/1512144331666247694)
[^16]: [GitHub Sponsors](https://github.com/sponsors)
[^17]: [Open Source Collective: What We Offer](https://docs.oscollective.org/what-we-offer)
