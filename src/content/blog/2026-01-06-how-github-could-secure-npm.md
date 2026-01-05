---
title: "How GitHub could secure npm"
teaser: "Why doesn't npm detect compromised packages the way credit card companies detect fraud?"
author: Nicholas C. Zakas
image: /images/posts/2026/github-npm.png
categories:
  - Programming
tags:
  - GitHub
  - npm
  - Security
---

In 2025, npm experienced an unprecedented number of compromised packages in a series of coordinated attacks on the JavaScript open source supply chain. These packages ranged from crypto-stealing malware[^1] to credential-stealing exploits[^2]. While GitHub announced changes[^3] to address these attacks, many maintainers (myself included) found the response insufficient.

## The impact of compromised packages

The scale of these attacks is staggering. In September 2025 alone, over 500 packages were compromised across two major attack waves. The first wave on September 8 compromised 20 widely-used packages with over 2 billion weekly downloads[^4]. Despite being live for only 2 hours, the compromised versions were downloaded 2.5 million times. The second wave, known as Shai-Hulud, was even more insidious: a self-replicating worm that automatically propagated across 500+ packages.

While the total financial damage appears limited (approximately $500 in stolen cryptocurrency), the potential for significant harm is clear. If this was merely a test to gauge the feasibility of self-replicating attacks, we should prepare for more damaging attempts in the future.

## The anatomy of an attack

To understand why npm's latest updates may fall short, it's important to understand how these attacks proceed.

1. **Steal credentials.** Attackers steal the credentials of an existing npm maintainer, preferably someone with access to a high-traffic package or one frequently used by the intended target. Credentials are stolen either by compromising the maintainer's npm account (as in the case of Qix) or by stealing npm tokens (as in the Nx compromise[^5]).  
2. **Add a `preinstall` or `postinstall` script.** The attacker creates a malicious script that executes during the `preinstall` or `postinstall` phase of the npm package. This script runs automatically whenever `npm install` is executed, whether for the malicious package itself or any project using it.  
3. **Publish the compromised package.** The compromised package is published to the npm registry as a semver-patch update, increasing the likelihood it will be installed before the compromise is discovered.

## How compromised packages spread

Compromised packages are often installed quickly after publishing due to npm's default behavior. When using `npm install`, packages are added to `package.json` using a semver range beginning with a caret (`^`), such as `^1.2.3`. This tells npm to install any version starting with the given version (in this case, `1.2.3`) up to, but excluding, the next major version (`2.0.0`). So if `1.2.4` is the latest version, it will be installed instead of `1.2.3`. This behavior assumes packages follow semantic versioning, meaning non-major version bumps are always backwards compatible.

Attackers exploit this behavior by publishing compromised versions as semver-patch or semver-minor increments. This ensures that anyone doing a fresh install of a project using the package will download the compromised version instead of a safe one, provided their version range includes the new version.

While individuals may not do fresh installs frequently, continuous integration (CI) systems typically do. If not properly configured, CI systems can install the compromised package, potentially giving attackers access to cloud credentials that enable further attacks.

Ultimately, package consumers must take extra steps to avoid installing compromised packages, such as using lock files and immutable installs. However, npm's defaults still make it too easy to use version ranges that result in automatic installation of compromised packages.

## GitHub’s response to the attacks

In September, GitHub announced its response[^6] to the attacks. The changes included:

* Limiting publishing to local 2FA, granular access tokens[^7], and trusted publishing[^8].  
* Deprecating legacy classic tokens and time-based one-time password (TOTP) 2FA.  
* Enforcing shorter expiration windows for granular tokens.  
* Disabling access tokens by default for new packages.

These steps targeted the Shai-Hulud attack[^9], which used a compromised package to scan for additional tokens and secrets. Those tokens and secrets were then used to publish more compromised packages, making the attack self-replicating.

GitHub's response specifically targeted preventing future self-replicating attacks of this nature. Deprecating older, less secure legacy tokens helps limit the scope of an attack if a malicious actor obtains someone's credentials.

However, the response has some limitations:

* Reducing the usable lifetime of tokens only ensures that older, possibly forgotten tokens can’t be used in attacks. Infiltration of machines with up-to-date tokens yield the same results.  
* While promoting trusted publishing as an alternative to tokens makes sense for open source projects hosted on GitHub or GitLab, it leaves others without a viable option. npm currently only supports GitHub and GitLab as OpenID Connect (OIDC) providers, so maintainers not using these systems cannot use this feature.  
* The first publish of a new package can't use trusted publishing—it must be done with a token or locally using 2FA.  
* Trusted publishing is not yet complete, most notably its missing 2FA. This caused the Open JS Foundation to recommend not using trusted publishing[^10] for critical packages.  
* Maintainers of many packages now need to rotate tokens at least every 90 days, creating significant additional maintenance burden[^11].  
* Maintainers of many packages must manually update every package through the npm web app, completing multiple 2FA verifications for each package.  
* Removing TOTP means maintainers always need a web browser available in the same environment as the publish operation.  
* The rapid rollout, along with shifting dates and lack of UI to accommodate common use cases, created confusion and frustration[^12] among maintainers.

In short, GitHub's response placed more responsibility on maintainers whose credentials were stolen and packages compromised. This created additional work for maintainers, especially those managing many packages. While these changes may reduce a certain type of attack, they don't address npm's systemic problems.

Problems like this require a different approach. To understand what that might look like, it helps to examine another industry facing similar challenges.

## How npm is like the credit card industry

The credit card industry faces challenges similar to npm's, except instead of compromised packages, they deal with fraudulent transactions. The attack vector is similar: both begin with stealing credentials. In this case, the credentials are credit card information rather than an npm login or token. I'm old enough to remember when stores would take imprints of credit cards and process all transactions in a batch at the end of the day. It was easy to commit fraud and never be caught using that system, so the credit card industry adapted.

Today, credit cards have several ways to prevent credential theft:

* The cards themselves have chips that are difficult to duplicate (as opposed to the old magnetic stripes), making it easier to authenticate a physical card.  
* In some countries, you must enter a PIN along with presenting the chipped card to make a transaction, adding second-factor authentication to the process.  
* When using a credit card online, you need to enter not just the number, but also the expiration date, CVC number, cardholder name, and sometimes the postal code. All of this helps ensure that someone possesses the physical card and not just the card number.

Even so, credit card companies know that cards will still be stolen and used for fraudulent purchases, so they don't stop at these measures. They also monitor their networks for suspicious activity.

If you're a frequent credit card user, you've likely received a text or phone call asking if you made a particular transaction. That's the credit card company's algorithms flagging a transaction as outside your normal spending pattern. Maybe you typically make small purchases and suddenly buy a new kitchen appliance. It's not fraudulent, but it's unusual, so it gets flagged for verification. Maybe you travel to another state or country and use your credit card there. Again, it's not fraudulent, but it doesn't follow your typical usage pattern, so it's best to verify before allowing the transaction. This is called *anomaly detection*, a standard practice for identifying unwanted or unexpected data in data streams.

## What npm got wrong

GitHub's response to the ongoing supply chain attacks focused solely on credential theft, which is why it falls short. We already know how packages become compromised, and while securing credentials is important, we also know that credentials will inevitably be stolen.

Credit card companies understand that fraudulent transactions will still occur regardless of how many additional factors they add to validation. That's why they invest in anomaly detection in addition to securing credentials. Once credentials are compromised, they still want to protect consumers and merchants from fraud.

GitHub, on the other hand, has not invested in protecting the ecosystem from compromised packages as they are published. The latest changes place most of the responsibility on package maintainers. Long-time maintainer Qix fell victim to a convincing phishing attack—if even experienced maintainers can be compromised, less-seasoned maintainers face even greater risk.

Meanwhile, GitHub continues taking down malicious packages after they've already caused damage. However, there are proactive measures GitHub could implement, such as investing in the same kind of anomaly detection that helps credit card companies flag fraudulent transactions.

## What GitHub could do with npm

Instead of continuing to focus solely on credential security, GitHub could analyze packages as they are published. (They already do this once they have identified Indicators of Compromise, effectively blocking new packages containing the same IoCs.) Given what we know about malicious packages, there are several ways the npm registry could be made more secure. Each of the following suggestions assumes the maintainer's npm account has been compromised and therefore we cannot rely on the npm web app for verification.

### Location tracking of publishes

Similar to how credit card companies track purchase locations and flag unexpected transactions, the npm registry could flag package publishes that occur from an unexpected location. The npm registry likely already tracks the IP address of operations, which can be used to infer the location of the person or system publishing the package. If an `npm publish` operation occurs from a location significantly different from the previous publish, npm could require verification via email to at least one maintainer.

Because we are assuming the package owner's npm account has been compromised, npm 2FA offers little validation of the package owner's identity. Instead, npm could require the maintainer to retrieve a code sent to their email to publish a package from an unusual location. This would require the attacker to have access to both the npm account and the email account, significantly raising the bar for publishing a compromised package.

What would count as an unusual location? Here are some examples:

* The publish typically happens from a GitHub Actions datacenter but this one happens from outside the datacenter.  
* The publish typically happens from a location in Florida but this one happens in California.  
* The publish typically happens from a location in the United States but this one happens in China.

These heuristics can be tuned according to the actual patterns observed in the npm registry. Popular web apps like Gmail and Facebook use similar location tracking to proactively intervene when an account appears compromised.

### Require semver-major version bumps when adding `preinstall` or  `postinstall` scripts

Because these attacks frequently use `preinstall` or `postinstall` scripts on packages that didn't have one previously, detecting when a package is published with a `preinstall` or `postinstall` script for the first time is key. This could be done with a single bit indicating whether a major release line has a `preinstall` script and a single bit indicating whether it has a `postinstall` script. For instance, when `1.0.0` is published, the `1.x` release line bits are set to indicate whether it has either a `preinstall` or `postinstall` script.

When the next version of the package is published in the same major release line (for example, `1.1.0` or `1.0.1`), check the bits of the `1.x` release line to see whether a `preinstall` script already exists. If the bit is set, there's no need to further investigate `preinstall` for this new version (`preinstall` is already allowed). If the bit is not set, check `package.json` to see whether a `preinstall` script exists. If it does, this is a violation and the package publish must fail. If desired, the package may be published as the next major version (in the previous example, `2.0.0`). Repeat the process with the `postinstall` bit.

This type of anomaly detection effectively removes one of the attacker's main weapons: the speed with which a compromised package is installed. Because forcing a semver-major version bump removes it from the default range for npm dependencies, it will not automatically be installed in most projects. Some projects with customized dependency ranges (such as `> 1.0.2`) will still be affected, but the majority will be safe. This delay will hopefully both dissuade some attackers and make it easier to detect problems before they affect too many systems.

### Require email-based 2FA when adding `preinstall` or `postinstall` scripts

In addition to requiring a semver-major version bump when adding `preinstall` or `postinstall` scripts, npm could also enforce verification via email to publish a new version with a `preinstall` or `postinstall` script where one didn't previously exist. This could use the same email-based 2FA system as location anomaly detection.

### Require double verification for invited maintainers

The current system for inviting maintainers to a package leaves a gap that could allow attackers to circumvent email-based 2FA. Because the invitation process is single opt-in on the part of the invitee, an attacker could compromise an npm account and then invite a separate npm account as a maintainer to receive any email-based 2FA requests. To prevent this, the invite system should be updated so that all current maintainers receive an email asking them to confirm they intended to invite the new maintainer. As long as one of the current maintainers approves, the invite will be sent to the new maintainer.

## A plea to GitHub

We know you want to be responsible stewards of the JavaScript ecosystem. We know the npm registry requires significant effort to maintain and is costly to run. However, npm's infrastructure needs more attention and resources. The response to these attacks was reactive and implemented without gathering feedback from the community most affected. Now is the time to invest in proactive security measures that can protect the registry against what is certain to be an increasing number and intensity of attacks.

## Conclusion

GitHub has an opportunity to take a more proactive approach to securing the npm registry. Rather than placing the burden solely on maintainers to protect their credentials, GitHub could implement anomaly detection systems similar to those used by the credit card industry. The suggestions outlined here (location tracking, restrictions on lifecycle scripts, and improved verification processes) would create multiple layers of defense that work even after credentials are compromised. These measures wouldn't eliminate all supply chain attacks, but they would significantly reduce the window of opportunity for attackers and limit the damage compromised packages can cause. Most importantly, they would demonstrate a commitment to protecting the entire JavaScript ecosystem, not just responding to attacks after they've already succeeded. The technology and patterns for these protections already exist in other industries. It's time for GitHub to apply them to npm.

[^1]: [npm Author Qix Compromised via Phishing Email in Major Supply Chain Attack](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack)
[^2]: [Popular Tinycolor npm Package Compromised in Supply Chain Attack Affecting 40+ Packages](https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages)
[^3]: [Our plan for a more secure npm supply chain](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
[^4]: [New compromised packages identified in largest npm attack in history](https://jfrog.com/blog/new-compromised-packages-in-largest-npm-attack-in-history/)
[^5]: [Nx Investigation Reveals GitHub Actions Workflow Exploit Led to npm Token Theft, Prompting Switch to Trusted Publishing](https://socket.dev/blog/nx-supply-chain-attack-investigation-github-actions-workflow-exploit)
[^6]: [Our plan for a more secure npm supply chain](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
[^7]: [About granular access tokens](https://docs.npmjs.com/about-access-tokens#about-granular-access-tokens)
[^8]: [Trusted Publishers for All Package Repositories](https://repos.openssf.org/trusted-publishers-for-all-package-repositories)
[^9]: [Updated and Ongoing Supply Chain Attack Targets CrowdStrike npm Packages](https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages)
[^10]: [Publishing More Securely on npm: Guidance from the OpenJS Security Collaboration Space](https://openjsf.org/blog/publishing-securely-on-npm)
[^11]: [Comment: Classic token removal moves to December 9, bundled with new CLI improvements](https://github.com/orgs/community/discussions/179562#discussioncomment-15221604)
[^12]: [Update: Classic token removal moves to December 9, bundled with new CLI improvements](https://github.com/orgs/community/discussions/179562)
