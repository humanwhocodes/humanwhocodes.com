---
title: "GitHub Copilot's pricing gamble"
teaser: "GitHub's switch to usage-based Copilot pricing is a calculated bet that competitors will follow suit before too many users defect."
author: Nicholas C. Zakas
image: /images/posts/2026/copilot-gamble.png
categories:
  - Programming
tags:
  - AI
  - GitHub
  - Pricing
  - Developer Tools

---

On June 1, GitHub switched the pricing model for Copilot from a request-based model to a usage-based model. This followed years of losing money[^1] on every Copilot plan in an effort to gain AI market share. Tech companies use this approach regularly, offering free or low-cost introductory rates to attract their user base before scaling back those offerings in favor of higher-priced services (often moving upmarket in the process). This is a well-worn path trodden by many companies who went on to make a lot of money on their products. It's no wonder that GitHub, along with Anthropic and OpenAI, priced their products to attract the most users in the shortest period of time while losing money[^2]. Most users didn't realize that these prices were heavily subsidized and that those subsidies would eventually come to an end.

It appears that, after three years, GitHub decided that it was tired of losing money. (This change may or may not be related to the Microsoft-OpenAI divorce[^3], which means less revenue for Microsoft's Azure service and potentially higher costs for OpenAI model access.) Instead of subsidizing Copilot users' access to LLM APIs, Copilot now passes those costs directly to the user, functioning more like OpenRouter[^4]. The result has been staggering.

**Disclosure:** As a GitHub Star[^5], I have received the Copilot Pro+ plan for free for the last two years and was privy to NDA-covered conversations around the pricing change.

## What is usage-based pricing?

Usage-based pricing means that you're charged based on your usage of the APIs rather than paying a fixed flat fee. For GitHub, this usage is allocated in dollars as *AI credits*, and each AI credit buys you a certain number of tokens for each model[^6]. Users receive both a fixed allotment of credits based on their subscription and a "flex" allotment that may change at any time, giving GitHub the ability to throttle requests as needed.

The previous pricing model was based on the number of premium requests per month. This also had a fixed allotment per month, but each request could use as many tokens as it wanted without users incurring further charges.

I've used Copilot Pro+ for over two years and rarely used more than 40% of my allotted monthly requests in the previous pricing plan. That included use on open source projects, contract work, and private projects. During the first week of June on a very light work schedule, I used 33% of my allotted credits. It would easily have been 50% or more on a typical work week.

To understand the context of this problem, consider what would happen if Netflix followed a similar pricing scheme. Instead of paying a flat monthly fee and watching as many videos as you want, you'd pay based on the amount of transmitted data. That data is the product of the video resolution (determined by Netflix), the quality of the video (also determined by Netflix), and the length of the video. The five minutes of end credits? That counts toward your data even if you don't watch it. The three-minute recap of the previous episode? That also counts. The ads Netflix inserts? You're paying for that data too. Now imagine how many straight hours of Netflix you'd watch if you were presented with a bill at the end of each show. That's where GitHub Copilot is right now.

## The problem

GitHub always knew that subsidies were going to come to an end. However, two factors contributed to this decision:

1. **Copilot's agentic evolution.** The way people use Copilot (and AI in general) has changed dramatically in the past three years.  
2. **Pushing more agent use.** GitHub itself has continued to implement more agentic user experiences.

Both factors contribute to the growing frustration of GitHub users who feel like there's been a bit of a bait-and-switch here.

### Copilot's agentic evolution

When Copilot first launched, it was essentially a better (and often worse) version of autocomplete. The "ghost text" would appear as you typed and try to guess what code you wanted to write. Autocomplete gave way to the sidebar conversation where you could directly interact with Copilot and ask it to complete different tasks. In hindsight, it's easy to see that things would evolve beyond that point, but in 2023, no one really knew what to expect from AI.

Fast-forward to 2026 and Copilot can run on its own, read relevant documentation, fetch resources from the web to learn more, and implement complex features that take hours to complete. This move from a "copilot" editor to a fully-autonomous agent meant Copilot consumed and produced ever-larger amounts of tokens on an ongoing basis, 10-100x more tokens according to some estimates[^7]. Further, Visual Studio Code continued adding features to allow multiple agents to operate simultaneously in a single project. Cost-per-token is decreasing, but not at a rate that can offset the increased token usage.

We started with Copilot as something you'd work with interactively on a few files and ended up with Copilot running autonomously for hours completing larger projects on its own. That's a dramatically different usage pattern than the early version of the product, and yet the pricing strategy hadn't changed. This is the same problem that resulted in Anthropic blocking third-party agents[^8] from using regular monthly subscriptions (they can now use usage-based APIs for this purpose).

If GitHub (and the industry) couldn't foresee how AI usage patterns would evolve in just three years, they really couldn't wait another three years to address likely skyrocketing model costs. Given that, it's still curious why GitHub embarked on an aggressive campaign to introduce agentic experiences in more and more places.

### Pushing more agentic use

While Copilot initially lived in a sidebar in VS Code, it has since expanded into the GitHub web application as well as other desktop and mobile experiences. I've used all of them, and the experiences range from good to great. However, they were clearly built with the "all-you-can-eat" Copilot plan in mind. Each of these experiences relies on the same monthly AI credits, which is problematic because most of them run in the background asynchronously and can easily eat up all of your credits without you ever realizing it. Here are the various ways GitHub eats your AI credits:

* Copilot Code Review (CCR)[^9] – Assign Copilot to review your pull request. The reviews have improved significantly over the last couple of years and have helped me catch many bugs before they hit production. Because this runs in the cloud without direct interaction, it's difficult to know how many credits will be used.  
* Copilot Cloud Agent (CCA)[^10] – Ask Copilot to do some work on a repository, including opening a pull request. I used this when it first came out and it burned through my entire month of AI premium requests in one PR. After that, they changed it so each PR counted as only one premium request. With usage-based billing, we are right back to worrying that a single session, which can run for 30 minutes or longer, can eat up your AI credits before you realize what's happening.  
* Agentic Workflows[^11] – You can use Copilot as part of a GitHub workflow, making it an ideal tool for regular but not deterministic workflows such as issue triage. Because these are run automatically in the cloud, it's very difficult to discover workflows that are using too many tokens.  
* GitHub desktop app[^12] – The entire desktop application is built around using AI for everything: searching, managing issues and pull requests, and writing code. Almost everything you do costs an indeterminate amount of AI credits. The encouraged usage pattern is to run multiple agents at the same time.  
* VS Code agents window[^13] – The VS Code equivalent to OpenAI Codex, this new window inside the application is agent-focused, once again encouraging multiple agents to run at the same time.  
* Copilot CLI[^14] – GitHub's answer to Claude Code, Copilot CLI on its own isn't a problem. However, rubber ducking[^15] (asking a second model to check your work) means a second agent will check the work of the first, and `/fleet`[^16] allows Copilot to figure out how many parallel agents to run at once.

In each of these experiences, you're encouraged to use more agents and let them do their job until the goals are accomplished. Once again, that made sense when you didn't have to carefully monitor your monthly AI credit allotment. With the new usage-based billing approach, using any of these turns into a slot machine where you might get what you want for cheap, or you might blow all of your credits in one turn.

GitHub knows this is the case and still made the pricing change because it's making a big bet: it won't be alone for long.

## GitHub's big gamble

The subsidization of AI is one of the worst-kept secrets in technology, and yet most users were still unaware. Prior to 2026, every major AI company offered subsidized services. Whether you were using Claude, GPT, or Gemini, companies priced their APIs at competitive rates to increase their market share. Each company knows that it's possible only one will emerge as the long-term winner (like Google in search) and so no one wants to blink when the race is neck-and-neck. Except for GitHub in June.

GitHub is in an interesting position because they have always packaged AI services from other companies. Microsoft finally released its first homegrown model for Copilot, MAI-Code-1-Flash, just this month. Otherwise, they've always relied on services from the major AI companies, meaning that GitHub (and Microsoft itself) were effectively paying for Copilot users' AI usage. With new models increasing in cost, there was no way this could go on forever. So GitHub pulled the plug.

In the wake of the change, users took to social media to announce that they were canceling their Copilot plans and switching to monthly subscriptions from competitors like Claude, OpenAI, and OpenCode. Copilot users openly shared how they used up all of their monthly credits on the first day. There was anger and frustration all around. Make no mistake: GitHub was fully aware that this would happen. They did it anyway. The reason? They're betting other companies will soon follow their lead.

GitHub knows that subsidies will come to an end across the board, probably soon, and likely before the end of the year. The gamble is that they won't lose enough Copilot users to matter before the other companies also change their pricing models, leaving users with nowhere else to go. The bet is that GitHub users are so tied into the entire GitHub ecosystem that they'll learn to live with the new pricing, and that choice will be easier to make once Claude, GPT, and Gemini become more expensive too.

Of course, with both OpenAI and Anthropic planning to go public this year, they are unlikely to dramatically change their pricing structure before an IPO. The last thing pre-IPO companies want is lower sales or higher customer turnover. If those IPOs are delayed past 2026, they could hold off on pricing changes this year. At that point, steady attrition from Copilot could eventually kill off the product altogether. All companies are looking for ways to reduce costs so they can spend more money on AI, and Microsoft is certainly not above shutting down a service that can't make any money.

Another part of this gamble is that GitHub is effectively reselling API access to Claude, GPT, and Gemini. If you check the pricing as of this writing, you can see that Copilot pricing for these models matches the AI companies' API access fees. Those API access fees are also currently subsidized, meaning that when they inevitably increase, Copilot plans will be affected (which they also understand, hence the "flex" credits included as part of Copilot plans). Microsoft's investment in its own models is certainly a way to help control some of this cost, effectively following Cursor's approach[^17] to reining in both cost and reliance on external models.

Can Copilot hold onto enough users to remain relevant before the other companies also increase their prices? Only time will tell.

## Conclusion

GitHub's pricing change is a calculated risk, not a miscalculation. The company understood the frustration it would cause and decided the long-term payoff justifies the short-term pain. Whether that bet pays off depends on factors largely outside GitHub's control: when competitors make similar moves, how quickly AI costs fall, and how patient their user base is willing to be.

For users, the practical takeaway is to audit your Copilot usage now. Disable background agents you're not actively monitoring, be selective about which agentic features you keep enabled, and track your credit balance regularly. The new pricing model rewards intentional use and penalizes the "set it and forget it" habits that GitHub itself encouraged.

GitHub is betting you'll adapt and that its competitors will follow suit. If they're right, the AI tools industry will look very different by the end of 2026. If they're wrong, they may have handed Anthropic, OpenAI, and Cursor their most effective recruiting campaign yet.

[^1]: [Microsoft Lost $20 for Every $10 Copilot AI Subscription: Report](https://www.tomshardware.com/news/microsoft-lost-money-on-ai)
[^2]: [Sam Altman says he's losing money on OpenAI's $200-per-month subscriptions: 'People use it much more than we expected'](https://fortune.com/2025/01/07/sam-altman-openai-chatgpt-pro-subscription-losing-money-tech/)
[^3]: [Microsoft and OpenAI broke up — now they're ready to fight](https://www.theverge.com/ai-artificial-intelligence/942242/microsoft-build-ai-agents-openai-competition)
[^4]: [The Unified Interface For LLMs](https://openrouter.ai/)
[^5]: [Nicholas C. Zakas](https://stars.github.com/profiles/nzakas/)
[^6]: [Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing#pricing-tables)
[^7]: [Agentic AI Cost Runaway: Why One Cursor User Burned $4,200 in a Weekend (And How to Stop It)](https://leanopstech.com/blog/agentic-ai-cost-runaway-token-budget-2026/)
[^8]: [Anthropic cuts off the ability to use Claude subscriptions with OpenClaw and third-party AI agents](https://venturebeat.com/technology/anthropic-cuts-off-the-ability-to-use-claude-subscriptions-with-openclaw-and)
[^9]: [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
[^10]: [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
[^11]: [GitHub Agentic Workflows](https://github.github.com/gh-aw/)
[^12]: [Download GitHub Desktop](https://desktop.github.com/download/)
[^13]: [Use the Agents window (Preview)](https://code.visualstudio.com/docs/agents/agents-window)
[^14]: [Less // TODO: more done](https://github.com/features/copilot/cli/)
[^15]: [About the rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
[^16]: [Running tasks in parallel with the /fleet command](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)
[^17]: [Introducing Composer 2](https://cursor.com/blog/composer-2)
