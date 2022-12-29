---
title: GitHub workflows inside of a company
author: Nicholas C. Zakas
permalink: /blog/2013/05/21/github-workflows-inside-of-a-company/
categories:
  - Software Development
tags:
  - Git
  - GitHub
---
Recently I asked engineers to share their experiences working with GitHub at companies. I&#8217;ve always used GitHub for open source projects, but I was interested in learning more about using it professionally and how one&#8217;s development workflow might change given all of GitHub&#8217;s capabilities. I set up a gist<sup>[1]</sup> so people could leave the answers to my questions and got some great responses. The information comes from companies such as Yammer, BBC News, Flickr, ZenDesk, Simple, and more. This is an overview of the responses I received plus some detail from Scott Chacon&#8217;s post on Git Flow at GitHub<sup>[2]</sup>.

## Basic setup

Everyone has at least one GitHub organization under which the official repositories live. Some have more than one organization, each representing a different aspect of the business, however all official repositories are owned by an organization. I suspect this would be the case as it would be horribly awkward to have an important repository owned by a user who may or may not be at the company next year. Also, using an organizational owner for these repositories allows better visibility as to what&#8217;s going on with official projects just by looking at the organization.

Several people mentioned that no one is barred from creating their own repositories on GitHub for side projects or other purposes. Creating repositories for company-related work is generally encouraged. If a side project becomes important enough, it can be promoted to an organizational repository.

## Developer setup

Companies took a couple of different approaches to submitting code:

  * Most indicated that developers clone the organization repository for their product and then work on feature branches within that repository. Changes are pushed to a remote feature branch for review and safe-keeping.
  * Some indicated that each developer forks the organization repository and does the work there until it&#8217;s ready for merging into the organization repository.
  * A couple indicated that they started out with forks and then switched to feature branches on the organization repository due to better transparency and easier workflow.

The general trend is in the direction of feature branches on the organization repository. Since you can send pull requests from one branch to another, you don&#8217;t lose the review mechanism.

## Submitting code

In the open source world, external contributors submit pull requests when they want to contribute while the maintainers of the project commit directly to the repository. In the corporate world, where everyone may logically be a maintainer for the repository, does it makes sense to have developers send pull requests? The responses were:

  * <span style="line-height: 13px;">Some required pull requests for all changes.</span>
  * Some required pull requests only for changes outside of their responsibility area (i.e., making a change to another team&#8217;s repo). Other changes can be submitted directly to the organization repository.
  * Some left this up to the developer&#8217;s discretion. The developer should know the amount of risk associated with the change and whether or not another set of eyes is useful. The option to submit directly to the repository is always there.

The responsibility for merging in pull requests varied across the responses. Some required the team leads to do the merging, others allowed anyone to do the merging.

Interestingly, some indicated that they start a pull request as soon as a new feature branch is created in order to track work and provide better visibility. That way, there can be a running dialog about the work being done in that branch instead of temporary one at the time of work completion.

## Preparing code for submission

A secondary part of this process is how the code must be prepared before being merged in. The accepted practice of squashing commits and rebasing still  remains common across the board though the benefits aren&#8217;t clear to everyone. Of those who responded:

  * <span style="line-height: 13px;">Some required a squash and rebase before a pull request can be merged in.</span>
  * Some will merge in a pull request regardless of the makeup of commits.
  * Some care about keeping a strict, non-branching history while others do not.

It&#8217;s hard to outline any consistent trends in this regard. Whether or not you squash, rebase, or merge is very much a team-specific decision (not an organization-specific one).

## What about git-flow?

I didn&#8217;t ask this question specifically, but it came up enough. Git-flow[3] is a process for managing changes in Git that was created by Vincent Driessen and accompanied by some Git extensions[4] for managing that flow. The general idea behind git-flow is to have several separate branches that always exist, each for a different purpose: master, develop, feature, release, and hotfix. The process of feature or bug development flows from one branch into another before it&#8217;s finally released.

Some of the respondents indicated that they use git-flow in general. Some started out with git-flow and moved away from it. The primary reason for moving away is that the git-flow process is hard to deal with in a continuous (or near-continuous) deployment model. The general feeling is that git-flow works well for products in a more traditional release model, where releases are done once every few weeks, but that this process breaks down considerably when you&#8217;re releasing once a day or more.

## Conclusion

A lot of people shared a lot of very interesting anecdotes about using GitHub at their companies. As I expected, there&#8217;s no one accepted way that people are using GitHub for this purpose. What&#8217;s interesting is the range of ways people have chosen to adapt what is essentially an open source workflow for enterprise use. Since GitHub also has GitHub Enterprise, I&#8217;m certain that this trend will continue. It will be interesting to see if the feedback from GitHub Enterprise and corporate needs will end up changing the public-facing GitHub in any way.

I&#8217;m interested in doing more research about how Git and GitHub in particular are used inside of companies. I&#8217;ve yet to see any good research done on whether or not squashing and rebasing is important in the long run, and I think that would be great to figure out. Please feel free to share your experiences in the comments.

## References

  1. [How do you use GitHub at your company?][1] (GitHub Gist)
  2. [GitHub flow][2] by Scott Chacon (Scott Chacon&#8217;s Blog)
  3. [A successful Git branching model][3] by Vincent Driessen (nvie.com)
  4. [git-flow Git Extensions][4] (GitHub)

 [1]: https://gist.github.com/nzakas/5511916
 [2]: http://scottchacon.com/2011/08/31/github-flow.html
 [3]: http://nvie.com/posts/a-successful-git-branching-model/
 [4]: https://github.com/nvie/gitflow
