---
title: "Improving developer velocity with GitHub merge queue"
teaser: ""
author: Nicholas C. Zakas
image: /images/posts/2026/github-merge-queue.png
draft: true
categories:
  - Programming
tags:
  - GitHub
  - Git
  - Merge Queue
---

Imagine this: you're working at a company that uses GitHub as its source control system. Each repository follows established best practices like requiring continuous integration (CI) tests to pass before a pull request can be merged. Branch protection rules ensure a linear commit history is maintained and that pull requests must be approved before merge. Developers may merge their own pull requests once CI passes and they have the required approvals. 

The linear commit history requirement means that each pull request must be tested on top of `HEAD` in CI before it can be merged. GitHub helpfully provides an "Update Branch" button on pull requests for this purpose. So as a developer, you click "Update Branch" and wait for CI to pass again. 

Unfortunately, CI takes ten minutes to run and so you go for a bathroom break and to pick up a snack. When you arrive back at your desk, you find that while CI has passed, the "Update Branch" button is once again enabled. In the time it took your CI to pass, someone else had merged a pull request and so you must start the entire process over.

The situation is frustrating for just one pull request, so imagine what would happen if you (and other engineers) frequently had more than one pull request open at a time. That would require jumping back and forth between pull requests, constantly clicking "Update Branch" and waiting to see if this was the time you actually made it through before someone else merged a different pull request.

In situations like this, the GitHub merge queue can free up developer time by eliminating the babysitting of pull requests.

## What does a GitHub merge queue do?

A GitHub merge queue acts as an intermediate step between merging a pull request and landing the commit on the target branch. Instead of merging a pull request when it's ready, you instead add it to the merge queue. The merge queue builds up a series of pending pull requests, each tested on top of the other, up to a maximum number of pull requests (the default is 5). You can configure the same CI tests to run in a merge queue and pulls requests are kicked back to the authors if those tests fail.

Behind the scenes, GitHub waits for the maximum batch size of pull requests to be available (there is a configurable timeout so it won't wait forever) and then adds them all, in order, to a temporary branch based off of `HEAD`. CI tests are run for each pull request as it's added to the temporary branch and the next pull request is added only once the previous pull request's CI tests have passed. If the CI tests for a pull request fail, then it is removed from the queue for further review by the author. The original pull request in GitHub remains open until it has successfully been merged using the merge queue. The original temporary branch with the previously passing pull requests is merged to `HEAD` and a new temporary branch is started with the pull request that came immediately after the failing one. Then, the process continues.

Once there is a temporary branch where all pull requests have passed their CI, all of those commits are merged into `HEAD` with one operation. The commits end up in the order in which they appeared in the merge queue.

The advantage of this approach is that every pull request is automatically tested on top of all the pull requests that came before it in the merge queue. You never have to click "Update Branch" because that effectively happens as part of the merge queue process. The CI tests now run twice: once before the pull request is added to the merge queue and once during the temporary branch creation. This dramatically reduces the amount of manual work and time to land a pull request on `HEAD`.

Another advantage is the editability of the merge queue, which allows you to reorder pull requests or remove them from the merge queue before they are merged. You have completely control over which pull requests get merged and which need to wait.

## Setting up a GitHub merge queue

1. Ensure your CI tests run in the merge queue
2. Enable squash merges for the repo
3. Enable the merge queue with a ruleset


### Update your GitHub workflow file

The first step to setting up a GitHub merge queue is to configure the CI tests for the merge queue. You can do this by adding the [`merge_group` trigger](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#merge_group) to the same GitHub workflow file that runs CI on your pull requests, like this:

```yaml
on:
  pull_request:
    branches: [main]
  merge_group:
    branches: [main]
    types: [checks_requested]
```

This ensures that you're running the same checks when a pull request is opened or updated, and when a merge queue group is tested. (At the time of my writing, `checks_requested` is the only type of `merge_group` available.)

### Enable squash merges on the repo

Because a merge queue takes all commits from the temporary branch and merges them into `HEAD`, it's important to [squash pull requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests?versionId=free-pro-team%40latest&productId=actions&restPage=reference%2Cworkflows-and-actions%2Cevents-that-trigger-workflows) before they're merged. This ensures that each pull request ends up adding a single commit to `HEAD`, making it much easier to revert individual pull requests if necessary. To do that:

1. Go to the repository settings page
2. Scroll down to the Pull Requests section
3. Check the box next to "Allow squash merges"
4. Uncheck the other merge types to avoid confusion

This is important because you can only choose enabled merge strategies for the merge queue.
