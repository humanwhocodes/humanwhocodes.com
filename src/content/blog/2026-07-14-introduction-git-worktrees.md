---
title: "A gentle introduction to Git worktrees"
teaser: "Git worktrees let you check out multiple branches into separate directories simultaneously, making parallel local development straightforward whether you're working solo or alongside AI coding agents."
author: Nicholas C. Zakas
image: /images/posts/2026/git-worktrees.png
categories:
  - Programming
tags:
  - Git
  - Version Control
  - AI
  - Productivity

---

Git worktrees have been around for over ten years, but if you're like me, you might not have heard of them until recently. AI coding tools now regularly use worktrees to make local changes in parallel, allowing multiple coding agents to work autonomously without interfering with each other's work. Once complete, you can then merge those worktrees back into your repository. This allows you to avoid sending code to the cloud while still parallelizing as much work as possible.

Worktrees are an elegant solution to the parallelization problem, although they are frequently misunderstood and, more importantly, poorly explained. This post demystifies worktrees so you can get up and running quickly.

## Creating branches

You can think of a worktree as a branch that exists in a different location from the project root. It still maintains all of the commit history from the root, it just exists in a different space. You can push and pull from remotes, too. For all intents and purposes, it functions like any other branch in your repository. The only difference is where the files live.

Without worktrees, you'd create a branch like this:

```shell
git checkout -b feature/name main
```

This creates a new branch off of `main` called `feature/name` in your project root. For example, if your project exists in `~/projects/my-project`, that's also where the branch is created. (The project root is also called the *main worktree*.)

If instead you want to create a worktree with that branch name, you can do so with this command:

```shell
git worktree add ../projects/my-project.worktrees/feature-name -b feature/name main
```

This creates the directory `project.worktrees/feature-name` and creates a branch off of `main` called `feature/name`. All of your files from `main` now exist in this separate directory, and you can `cd` into that directory to continue work as usual, with a couple of caveats:

1. **Dependencies are not shared.** If you are working on a Node.js project, you'll need to run `npm install` again inside the worktree directory. This directory doesn't have access to the main worktree's `node_modules` directory, so it needs its own copy. This is true for any projects requiring installation of dependencies to work.
2. **The worktree owns the branch.** Back in your main worktree, you'll get an error if you try `git checkout feature/name` because every branch can only be checked out to one directory. The worktree directory currently has that branch checked out so no other directory can do so.

Otherwise, you can treat a worktree directory like any other directory with a clone of your repository.

## Directory conventions

There are two conventions for creating worktree directories:

1. **Direct sibling.** A lot of tutorials describe creating worktree directories as direct siblings of the main worktree. So if your main worktree is `~/projects/my-project`, you might create a worktree directory of `~/projects/my-project-feature-name`. 
2. **Shared sibling ancestor.** Some coding agents create a single sibling directory within which all worktree directories are created. For example, `~/projects/my-project.worktrees` contains all of the worktree directories related to `~/projects/my-project`. I prefer this approach and use it in this post.

## Merging changes

How you merge changes from a worktree back into your main worktree is a matter of preference. 

### Pull requests

If you're working in a collaborative environment, you might just push your worktree branch to `origin` and open a pull request. That pull request can then be merged directly into `main` just like any other pull request. Because a worktree contains a complete copy of your repository, the relationship between the worktree branch and the remote persists.

### Merge locally

If you'd rather merge changes from your worktree manually, you can do that much the same way you would with any other branch. First, be sure you have all of your changes committed in your worktree. Then, you can merge into the main worktree:

```shell
# Go into worktree
cd ../my-project.worktrees/feature-name

# Rebase on top of main to ensure a clean merge
git rebase main

# Go to main worktree
cd ../my-project

# Merge in your changes
git merge feature/name
```

At this point, you can decide whether you want to keep the branch and worktree around.

## Cleaning up

When you're done with a worktree, you can remove it:

```shell
# Deletes the directory but not the branch
git worktree remove ../my-project.worktrees/feature-name
```

This physically removes the worktree directory but does not remove the branch. At this point, with the branch no longer checked out in a worktree, you can once again check it out in the main worktree if you'd like.

When you're sure you no longer need the branch, you can delete it as usual:

```shell
# Delete the branch
git branch -d feature/name
```

## Other tips

There are a few other useful things to know about worktrees.

### List all worktrees

To see all worktrees that currently exist (including the main worktree):

```shell
git worktree list
```

This is especially helpful when using AI coding agents who may be creating worktrees without your direct knowledge.

### Fewer characters to type

If you'd like to type fewer characters, you can set up an alias for `worktree`:

```shell
# Set wt as an alias for worktree
git config --global alias.wt worktree

# Much shorter commands
git wt add ../myproject.worktrees/ -b feature/name main
git wt list
git wt remove ../myproject.worktrees/
```

## Conclusion

Git worktrees are a powerful, underappreciated feature that fit naturally into modern development workflows, especially as AI coding agents become a bigger part of the picture. Once you understand that a worktree is really just a branch checked out to a different directory, the mental model clicks quickly. You get all the benefits of parallel development without shipping your code to a remote service to make it happen.

The workflow is straightforward: create a worktree for each task, do your work, merge or open a pull request when done, and clean up. Commands like `git worktree list` give you visibility into what's checked out where, and a simple alias like `wt` keeps the overhead low. Give worktrees a try next time you need to juggle multiple tasks in the same repository.
