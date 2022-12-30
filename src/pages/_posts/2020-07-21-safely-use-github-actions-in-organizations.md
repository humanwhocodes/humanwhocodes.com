---
title: "How to safely use GitHub Actions in organizations"
teaser: "GitHub actions have some good default security measures built in, but you can do more to protect yourself."
date: 2020-07-21
categories:
- Tutorials
tags:
- GitHub
- GitHub Actions
- Tokens
- Keys
- Secrets
- Environment Variables
---

GitHub Actions[^1] are programs designed to run inside of workflows[^2], triggered by specific events inside a GitHub repository. To date, people use GitHub Actions to do things like run continuous integration (CI) tests, publish releases, respond to issues, and more. Because the workflows are executed inside a fresh virtual machine that is deleted after the workflow completes, there isn't much risk of abuse inside of the system. There is a risk, however, to your data.

<aside>
This post is aimed at those who are using GitHub organizations to manage their projects, which is to say, there is more than one maintainer. In that situation, you may not always be aware of who is accessing your repository, whether that be another coworker or a collaborator you've never met. If you are the only maintainer of a project then your risk is limited to people who steal your credentials and the other recommendations in this post aren't as necessary.
</aside>

## Credential stealing risk

The primary risk for your workflows is credential stealing, where you provided some sensitive information inside of the workflow and somehow that information is stolen. This credential stealing generally takes two forms:

1. Opportunistic - sensitive information is accidentally output to the log and an attacker finds it and uses it
1. Intentional - an attacker is able to insert a program into your workflow that steals credentials and sends them to the attacker

GitHub, to its credit, is aware of this possibility and allows you to store sensitive information in secrets[^3]. You can store secrets either on a single repository or on an organization, where they can be shared across multiple repositories. You can store things like API tokens or deploy keys securely and then reference them directly inside of a workflow.

By default, there are some important security features built in to GitHub secrets:

1. Once a secret is created, you can never view the value inside of the GitHub interface or retrieve it using the API; you can only rename the secret, change the value, or delete the secret.
1. Secrets are automatically masked from log output when GitHub Actions execute. You'll never accidentally configure a secret to show in the log.
1. Only administrators can create, modify, or delete secrets. For individuals that means you must be the owner of the repository; for organizations that means you must be an administrator.

These measures are a good default starting place for securing sensitive information, but that doesn't mean this data is completely safe by default.

### Showing secrets in the log

Workflow logs are displayed on each repository under the "Actions" tab and are visible to the public. GitHub Actions tend to hide a lot of their own output for security purposes but not every command inside of a workflow is implemented with a GitHub Action. Luckily, workflows are designed to hide secrets by default, so it's unlikely that you'll end up accidentally outputting the secrets in plain text. When you access a secret as in the following workflow, the output will be masked in the log. For example, suppose this is part of your workflow:

```
steps:
  - name: Try to output a secret
    run: echo 'SECRET:${{ secrets.GITHUB_TOKEN }}'
```

Accessing data off of the `secrets` object automatically masks the value in the log, so you'll end up seeing something like this in the log:

```
SECRET:***
```

You're safe so long as your secrets stay within the confines of a workflow where GitHub will mask the values for you. The more dangerous situation is what happens with the command executed as part of your workflow. If they make use of a secret, they could potentially reveal it in the log.

For example, suppose you have a Node.js file named `echo.js` containing the following:

```js
console.log(process.argv[2]);
```

This file will output the first argument passed to the Node.js process. If you configure it in a workflow, you could very easily display a secret accidentally, such as:

```
steps:
  - name: Try to output a secret
    run: node ./echo.js ${{ secrets.GITHUB_TOKEN }}
```

While the command line itself will be masked in the log, there is no accounting for the output of the command, which will output whatever is passed in.

Key points about this scenario:

* This is most likely an accident rather than an attack. An attacker would most likely want to hide the fact that they were able to get access to your secret. By outputting it into the log, it's there for anyone to see and trace back to the source.
* An accident like this can open the door for opportunistic credential stealing[^4] by someone who notices the secrets were exposed.

Although accidentally outputting secrets to the log is a bad situation, remote credential stealing is worse.

### Remote credential stealing

This scenario is more likely an attack than an accident. The way this happens is that a rogue command has made it into your workflow file and is able to read your secrets and then transmit them to a different server. There isn't any overt indication that this has happened in the log so it may go unnoticed for a long time (or forever).

There are a number of ways for these rogue utilities to be introduced because GitHub workflows rely on installing external dependencies to execute. Whether you need to execute a third-party GitHub action or install something using a package manager, you are assuming that you're not using malicious software.

The most important question to ask is how might a malicious utility make it into your workflow files? There are two answers: accidentally or intentionally. However, there are several ways each can play out:

* As with outputting secrets to the log, a well-intentioned developer might have copy-pasted something from another workflow file and introduced it into your codebase. Maybe it was committed directly to the development branch without review because it's a small project. This scenario plays out every day as attackers try to trick developers into installing malicious software that otherwise looks harmless.
* An attacker might have gained control of a package that already has a reputation as reliable and update it to contain malicious code. (I'm painfully aware of how this can happen.[^5]) Your workflow may blindly pull in the package and use it expecting it to be safe.
* An attacker might submit a pull request to your repository containing a workflow change, hoping no one will look at it too closely before merging.
* An attacker might have stolen someone's credentials and used them to modify a workflow to contain a malicious command.

In any case, there are enough ways for attackers to introduce malicious software into your workflow. Fortunately, there are a number of ways to protect yourself.

## Protection strategies

Generally speaking, the strategies to further protect your GitHub workflows fall into the following categories:

1. Protect yourself
1. Protect your development branch
1. Limit scopes
1. Workflow best practices

### Protect yourself

The easiest way to steal credentials is for an attacker to pretend that they're you. Once they have control of your GitHub or package manager account, they have all the access they need to not only harm you but also harm others. The advice here is timeless, but worth repeating:

* Use a password manager and generate a strong, unique password for each site you use. Your GitHub password should not be the same as your npm password, for example.
* Enable two-factor authentication (2FA) on GitHub[^6] and any other sites you use. Prefer to use an authentication app or a security key instead of text messages whenever possible.
* If you are a GitHub organization administrator, require all organization members to enable 2FA.[^7]

By protecting your own login information, you make it a lot harder for attackers to use your projects to attack you or others.

### Protect your branches

At a minimum, you should protect your development branch with rules about what is allowed to be merged. Your development branch is the branch where pull requests are sent and where your releases are cut from. In many cases that will be the `master` branch, but some teams also use `dev`, `trunk`, or any number of other names. Once code makes it into your development branch, it is effectively "live" (for workflows) and highly likely to make it into a release (where it could negatively affect others). That's why protecting your development branch is important.

GitHub allows you to protect any branch in a number of ways.[^8] To set up a protected branch, go to your repository settings, click on "Branches" on the menu, then under "Branch Protection Rules" click the "Add Rule" button. Then, you can specify the branches to protect and exactly how to protect them.

There are a lot of options, but here are the ones I recommend as a starting point for your development branch:

1. **Require pull requests before merging** - this prevents you from pushing directly to the development branch. All changes must go through a pull request, even from admins (though you can override this to allow specific people to override the protection -- but that's not advisable). This is important to ensure that there's some notification of any changes made to the development branch and someone has the opportunity to review them before merging.
  1. **Required approval reviews** - by default this is set to one. Ideally, you should require approvals from at least two people to avoid the case where a malicious actor has secured the login of one team member and can therefore self-approve a pull request.
  1. **Dismiss stale pull request approvals when new commits are pushed** - by default this is off, and you should turn it on. This prevents an attack where a malicious actor submits an appropriate pull request, waits for approval, and then adds new commits to the pull request before merging. With this option enabled, new commits pushed to the pull request will invalidate previous approvals.
  1. **Require review from Code Owners** - it's a good idea to set up code owners[^8] for workflow files and other sensitive files. Once you do, you can enable this option to require the code owners approve any pull requests related to the code they own. This ensures that those who are most knowledgeable about GitHub Actions are required to approve any pull requests.
1. **Require status checks to pass before merging** - assuming you have status checks running on pull requests (such as automated testing or linting), enable this option to ensure pull requests can't be merged that have failing status checks. This is another layer of security to prevent malicious code from making it into your repository.
1. **Include administrators** - this option ensures that even administrators must adhere to the rules you've set up for the branch. While a compromised administrator account can turn this setting off, turning it on ensures administrators don't accidentally merge or push changes.
1. **Allow force pushes** - this is off by default and should remain off. Force pushes allow someone to completely overwrite the remote branch, which opens you up to all kinds of bad situations. Force pushes to the development branch should never be allowed in an organization.
1. **Allow deletions** - this is also off by default and should remain off. You don't want to accidentally delete your development branch.

While these settings won't prevent all attacks, they certainly make a number of common attacks a lot more difficult. You can, of course, create rules that are more strict if you have other needs.

<aside class="warn">
Because GitHub Actions and workflows are executed in every branch of your repository, it's important to consider whether or not you need to protect all of your remote branches. If your team doesn't use remote branches for feature development then I would recommend protecting all of your branches.
</aside>

### Limit scopes

One of the classic pieces of computer security advice is to always limit the scope of changes allowed at one time. For protecting your secrets, here are a number of ways you can limit scope:

* **Favor repository-only secrets** - if you only have one repository that needs access to a secret, then create the secret only on the repository instead of on the organization. This further limits the attack surface.
* **Limit organization secret scope** - organization secrets can be scoped to only public, only private, or just specific repositories. Limiting the number of repositories with access to the secrets also decreases the attack surface. Your credentials are only as secure as your least secure repository with access to your secrets.
* **Limit the number of admins** - keep the number of repository or organization administrators small. Only admins can manage GitHub secrets, so keeping this group small will also minimize the risk.
* **Minimize credentials** - ensure that any credentials generated to use in secrets have the minimal required permissions to be useful. If an app needs write permission and not read permission, then generate a credential that only allows writes. This way you minimize the damage if a credential is stolen.

Even if you don't follow any of the other advice in this article, limiting the scope of your secrets is really the minimum you should do to protect them.

<aside class="warn">
Never store a GitHub token with administrator privileges as a secret. This would allow any workflow in any branch (even unprotected branches) to modify your repository in any way it wants, including pushing to protected branches.[^10] 
</aside>

### Workflow best practices

The last step is to ensure your workflows are as safe as possible. The concern here is that you pass secrets into a utility that will either log that data unmasked or steal the credentials silently. Naturally, the first step is to verify the actions and utilities you are using are safe to use.

#### Disabling Actions

If you don't intend to use GitHub Actions in your organization, you can disable them for the entire organization. On the organization Settings page, go to "Actions" and then select "Disable actions for this organization."[^11] This ensures that no repositories can use GitHub Actions and is the safest setting if you don't intend to use them.

#### Use only local Actions

Another options is to allow the organization to use workflows but only with actions that are contained inside the same repository. This effectively forces repositories to install their own copies of actions to control which actions may be executed.

To enable this setting, go to the organization Settings page, go to "Actions", and then select "Enable local Actions only for this organization."[^11]

#### Identifying safe Actions

There are a couple ways you can know that a published GitHub Action is safe:

1. It begins with `action/`, such as `actions/checkout`. These are published by GitHub itself and are therefore safe to use.
1. The action is published in the GitHub Action Marketplace[^12] and has a "verified creator" badge next to the author. This indicates that the creator is a verified partner of GitHub and therefore the action is safe.

If an action doesn't fall into one of these two categories, that doesn't mean it's not safe, just that you need to do more research into the action.

All actions in the GitHub Action Marketplace link back to the source code repository they are published from. You should always look at the source code to ensure that it is performing the operations it claims to be performing (and doing nothing else). Of course, you happen to know and trust the publisher of the Action, you may want to trust that the action does what it says.

#### Provide secrets one command at a time

When configuring a workflow, ensure that you are limiting the number of commands with access. For example, you might configure a secret as an environment variable to run a command, such as this:

```
steps:
  - name: Run a command
    run: some-command
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Here, the `GITHUB_TOKEN` environment variable is set with the `secrets.GITHUB_TOKEN` secret value. The `some-command` utility has access to that environment variable. Assuming that `some-command` is a trusted utility, there is no problem. The problem occurs when you run multiple commands inside of a `run` statement, such as:

```
steps:
  - name: Run a command
  - run: |
      some-command
      some-other-command
      yet-another-command
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

In this case, the `run` statement is running multiple commands at once. The `env` statement now applies to all of those commands and will be available whether they need access to `GITHUB_TOKEN` or not. If the only utility that needs `GITHUB_TOKEN` is `some-command`, then limit the use of `env` to just that command, such as:

```
steps:
  - name: Run a command
    run: some-command
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  - run: |
      some-other-command
      yet-another-command
```

With this rewritten example, only `some-command` has access to `GITHUB_TOKEN` while the other commands are run separately without `GITHUB_TOKEN`. Limiting which commands have access to your secrets is another important step in preventing credential stealing.

## Conclusion

While GitHub Actions are a great addition to the GitHub development ecosystem, it's still important to take security into account when using them. The security considerations are quite a bit different when you're dealing with a GitHub organization maintaining projects rather than a single maintainer. The more people who can commit directly to your development branch, the more chances there are for security breaches.

The most important takeaway from this post is that you need to have protections, both automated and manual, in order to safely using GitHub Actions in organizations. Whether you decide to only allow local actions or to assign someone as a code owner who must approve all workflows, it's better to have some protections in place than to have none. That is especially true when you have credentials stored as GitHub secrets that would allow people to interact with outside systems on your behalf.

Remember, you are only as secure as your least secure user, branch, or repository.

[^1]: [GitHub: GitHub Actions](https://docs.github.com/en/actions)
[^2]: [GitHub: Configuring and managing workflow files and runs](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-and-managing-workflow-files-and-runs)
[^3]: [GitHub: Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
[^4]: [Credential Stealing as an Attack Vector](https://www.schneier.com/blog/archives/2016/05/credential_stea.html)
[^5]: [ESLint postmortem for malicious package publishes](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)
[^6]: [GitHub: Securing your account with two-factor authentication (2FA)](https://help.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa)
[^7]: [GitHub: Requiring two-factor authentication in your organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/requiring-two-factor-authentication-in-your-organization)
[^8]: [GitHub: Configuring protected branches](https://docs.github.com/en/github/administering-a-repository/configuring-protected-branches)
[^9]: [GitHub: About code owners](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners)
[^10]: [Allowing github-actions(bot) to push to protected branch](https://github.community/t/allowing-github-actions-bot-to-push-to-protected-branch/16536/2)
[^11]: [GitHub: Disabling or limiting GitHub Actions for your organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/disabling-or-limiting-github-actions-for-your-organization)
[^12]: [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
