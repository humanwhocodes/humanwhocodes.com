---
title: "Improving developer velocity with GitHub merge queue"
teaser: "GitHub merge queue reduces the manual churn of keeping pull requests current by automatically retesting them in order before merge."
author: Nicholas C. Zakas
image: /images/posts/2026/github-merge-queue.png
categories:
  - Programming
tags:
  - GitHub
  - Git
  - Merge Queue
  - CI
---

Imagine this: you're working at a company that uses GitHub as its source control platform. Each repository follows established best practices, such as requiring continuous integration (CI) tests to pass before a pull request can be merged. Branch protection rules maintain a linear commit history and require pull requests to be approved before merging. Developers may merge their own pull requests once CI passes and they have the required approvals.

The linear commit history requirement means that each pull request must be tested on top of `HEAD` in CI before it can be merged. GitHub provides an "Update Branch" button on pull requests for this purpose. As a developer, you click "Update Branch" and wait for CI to pass again.

Unfortunately, CI takes ten minutes to run, so you step away for a bathroom break and a snack. When you get back to your desk, CI has passed, but the "Update Branch" button is enabled again. In the time it took CI to finish, someone else merged a pull request, so you have to start the entire process over.

The situation is frustrating with just one pull request, so imagine what happens if you and other engineers often have more than one open at a time. That means jumping back and forth between pull requests, repeatedly clicking "Update Branch," and waiting to see whether this is the time you actually make it through before someone else merges a different pull request.

In situations like this, the GitHub merge queue can free up developer time by eliminating the babysitting of pull requests.

## What does a GitHub merge queue do?

A GitHub merge queue acts as an intermediate step between approving a pull request and landing its commit on the target branch. Instead of merging a pull request as soon as it's ready, you add it to the merge queue. The queue collects pending pull requests and tests each one on top of the others, up to a maximum batch size of five by default. You can configure the same CI tests to run for the merge queue, and pull requests are kicked back to their authors if those tests fail.

Behind the scenes, GitHub waits until the maximum batch size is available, unless a configurable timeout is reached, and then adds the pull requests to a temporary branch based on `HEAD` in queue order. CI runs for each pull request as it is added to the temporary branch, and the next pull request is added only after the previous one's CI checks pass. If a pull request fails CI, it is removed from the queue for further review by the author. The original pull request remains open on GitHub until it is successfully merged through the merge queue. The temporary branch containing the previously passing pull requests is merged into `HEAD`, and a new temporary branch starts with the pull request immediately after the failing one. The process then continues.

Once GitHub has a temporary branch where all pull requests have passed CI, it merges those commits into `HEAD` in a single operation. The commits land in the same order they appeared in the merge queue.

The biggest advantage of this approach is that every pull request is automatically tested on top of all the pull requests that came before it in the queue. You never have to click "Update Branch" because that effectively happens as part of the merge queue process. CI now runs twice: once before the pull request is added to the queue and again during temporary branch creation. That dramatically reduces the manual work required to land a pull request on `HEAD`.

Another advantage is that the merge queue is editable. You can reorder pull requests or remove them from the queue before they are merged, giving you full control over which pull requests move forward and which ones wait.

## Setting up a GitHub merge queue

To set up a merge queue for a repository, there are three steps:

1. Ensure your CI tests run in the merge queue
2. Enable squash merges for the repository
3. Enable the merge queue with a ruleset

Each step is important for the overall operation of the merge queue.

### Ensure your CI tests run in the merge queue

The first step in setting up a GitHub merge queue is configuring CI for the queue. You can do that by adding the `merge_group` trigger[^merge-group-trigger] to the same GitHub workflow file that runs CI for pull requests:

```yaml
on:
  pull_request:
    branches: [main]
  merge_group:
    branches: [main]
    types: [checks_requested]
```

This ensures you're running the same checks when a pull request is opened or updated and when a merge queue group is tested. As of this writing, `checks_requested` is the only available `merge_group` type.

### Enable squash merges for the repository

Because a merge queue takes all commits from the temporary branch and merges them into `HEAD`, it's important to squash pull requests[^squash-pull-requests] before they are merged. That ensures each pull request adds a single commit to `HEAD`, which makes individual pull requests much easier to revert if necessary. To do that:

1. Go to the repository settings page
2. Scroll down to the Pull Requests section
3. Check the box next to "Allow squash merges"
4. Uncheck the other merge types to avoid confusion

This matters because the merge queue can use only merge strategies that are enabled for the repository.

### Enable the merge queue with a ruleset

Merge queues can be enabled only through a ruleset applied to a branch. You can add a merge queue to an existing ruleset or create a new one. Here are the steps:

1. Go to the repository settings page
2. On the left navigation, click "Rules" and then "Rulesets".
3. Click on an existing ruleset or create a new one.
4. Scroll down and check the box next to "Require merge queue".

There are several merge queue settings you can customize for your use case:

* **Build concurrency:** The maximum number of queued pull requests running checks at the same time.
* **Minimum group size:** The minimum number of queued pull requests required before a temporary branch is created to test them together. This is set to 1 by default; otherwise, a single queued pull request could get stuck waiting for others. Consider increasing this only in a high-velocity repository where you want to throttle temporary branch creation.
* **Maximum group size:** The maximum number of queued pull requests to include in a single temporary branch. The default is 5, which strikes a good balance between being too small, which creates more temporary branches, and being too large, which increases the likelihood of a failure as more pull requests must work together.
* **Wait time to meet minimum group size:** The number of minutes to wait for the minimum group size to be met. The default is five minutes, which means GitHub waits up to five minutes to see whether the minimum group size is reached. If it is not, GitHub starts merging queued pull requests anyway. This backstop keeps queued pull requests from waiting too long before moving to a temporary branch.
* **Require all queue entries to pass required checks:** When checked, which is the default, each queued pull request must pass status checks after being added to the temporary branch on top of the preceding pull requests. When unchecked, only the `HEAD` pull request on the temporary branch must pass status checks. Checking only `HEAD` provides faster feedback and uses fewer resources, but it also makes failures harder to diagnose because you do not immediately know which pull request caused the problem.
* **Status check timeout:** The number of minutes GitHub waits for status checks to complete for queued pull requests. If status checks take longer than this limit, GitHub assumes they failed. This prevents queued pull requests from waiting indefinitely for checks that will never complete.

Be sure to click "Save changes" at the bottom of the page whenever you edit these settings.

## Example

Assume you're using the default settings for a merge queue on the `main` branch and there are seven pull requests, numbered 1 through 7, that have passed CI and are ready to be added to the merge queue. The developer clicks the "Merge when ready" button at the bottom of each pull request to add them, in order, to the queue. The merge queue looks like this:

1. Pull request 1
1. Pull request 2
1. Pull request 3
1. Pull request 4
1. Pull request 5
1. Pull request 6
1. Pull request 7

Because the minimum group size of 1 has been met, GitHub creates a temporary branch and squashes pull request 1's commits into it. Pull request 1's status checks run, and because they pass, pull request 2's commits are squashed into the temporary branch. Its status checks also pass, so pull request 3's commits are squashed into the branch. Unfortunately, pull request 3's status checks fail. The pull request on GitHub is marked as failed, and the squashed commit is removed from the temporary branch. Pull requests 1 and 2 are merged into `main` and closed. The merge queue now looks like this:

1. Pull request 4
1. Pull request 5
1. Pull request 6
1. Pull request 7

Pull request 3 has been removed from the queue pending developer intervention to fix the failing status checks. A new temporary branch is created, and pull request 4's commits are squashed into it. It turns out that fixing pull request 3 is fairly easy, so the developer clicks "Merge when ready" again. The merge queue now looks like this:

1. Pull request 5
1. Pull request 6
1. Pull request 7
1. Pull request 3

The remaining pull requests are then added to the temporary branch one by one so their status checks can run. This time, all five pull requests pass their checks, so they are all merged into `main`.

## Conclusion

The GitHub merge queue is one of those features that sounds like a small quality-of-life improvement until you start using it and realize how much time you were spending babysitting pull requests. By automating the "update and wait" cycle, it frees developers to focus on writing code instead of monitoring CI dashboards. The setup is straightforward: add the `merge_group` trigger to your CI workflow, enable squash merges, and turn on the merge queue through a ruleset. From there, the defaults work well for most teams, and the configurable settings give you room to tune behavior as your repository's velocity grows. If your team spends meaningful time managing pull request ordering or waiting for CI to clear, the merge queue is worth enabling.

[^merge-group-trigger]: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#merge_group)
[^squash-pull-requests]: [Configuring commit squashing for pull requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests?versionId=free-pro-team%40latest&productId=actions&restPage=reference%2Cworkflows-and-actions%2Cevents-that-trigger-workflows)
