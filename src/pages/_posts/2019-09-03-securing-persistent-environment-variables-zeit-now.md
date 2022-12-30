---
title: "Securing persistent environment variables using Vercel (formerly Vercel)"
author: Nicholas C. Zakas
teaser: "The way to securely add environment variables to your Vercel isn't obvious. Here's how to do it."
date: 2019-09-03
categories:
  - Tutorial
tags:
  - Vercel
  - Secrets
  - Environment Variables
  - Security
---

I'm a big fan of Vercel[^1] as an application hosting provider. The way the service abstracts all of the cloud computing details and allows teams to focus on building and deploying web applications is fantastic. That said, I had a lot of trouble setting up secure environment variables for my first application to use. I was used to other services like Netlify[^2] and AwS Lambda[^3] exposing environment variables in the web interface to allow secure transmission of important information. When Vercel didn't provide the same option in its web interface, I had to spend some time researching how to securely set persistent environment variables on my application.

For the purposes of this post, assume that you need to set two environment variables, `CLIENT_ID` and `CLIENT_SECRET`. These values won't change between deployments (presumably because they are used to authenticate the application with OAuth). As such, you don't want to manually set these environment variables during every deployment but would rather have them stored and used each time the application is deployed.

## Setting environment variables in Vercel

According to the documentation[^4], there are two ways to set environment variables for your Vercel project. The first is to use the `vercel` command line tool with the `-e` option, such as:

```bash
vercel -e CLIENT_ID="abcdefg" -e CLIENT_SECRET="123456789abcdefg"
```

This approach not only sets the environment variables but also triggers a new deploy. The environment variables set here are valid only for the triggered deploy and will not automatically be available for any future deploys. You need to include the environment variables any time you deploy, which isn't ideal when the information doesn't need to change between deploys.

The second way to set environment variables is to include them in the `vercel.json` file. There are actually two keys that can contain environment variables in `vercel.json`:

1. `env` is used for environment variables needed only during application runtime.
1. `build.env` is used for environment variables needed only during the build process.

Whether you need the environment variables in one or both modes is up to how your application is built.

<aside class="warn">
Be particularly careful if your build process uses the same JavaScript configuration file as your runtime, as you may find both the build and runtime will require the same environment variables even if it's not immediately obvious (this happened to me). This is common with universal frameworks such as Next.js and Nuxt.js.
</aside>

Both the `env` and `build.env` keys are objects where the property names are the environment variables to set and the property values are the environment variable values. For example, the following sets `CLIENT_ID` and `CLIENT_SECRET` in both the build and runtime environments:

```json
{
    "env": {
        "CLIENT_ID": "abcdefg",
        "CLIENT_SECRET": "123456789abcdefg"
    },
    "build": {
        "env": {
          "CLIENT_ID": "abcdefg",
          "CLIENT_SECRET": "123456789abcdefg"
        }
    }
}
```

The environment variables in `vercel.json` are set for each deploy automatically, so this is the easiest way to persist important information for your application. Of course, if your environment variables contain sensitive information then you wouldn't want to check `vercel.json` into your source code repository. That's not a great solution because `vercel.json` contains more than just environment variables. The solution is to use `vercel.json` with project secrets.

## Using Vercel secrets

Vercel has the ability to store secrets associated with each project. You can set a secret using the `vercel` CLI. You can name these secrets whatever you want, but the documentation[^4] suggests using lower dash case, Here's an example:

```bash
vercel secrets add client-id abcdefg
vercel secrets add client-secret 123456890abcdefg
```

These commands create two secrets: `client-id` and `client-secret`. These are automatically synced to my Vercel project and only available within that one project.

<aside class="warn">
By default, secrets will be added to your personal account. To assign to a team account, be sure to use `--scope team-name` as part of the command.
</aside>

The next step is to reference these secrets inside of the `vercel.json` file. To specify that the value is a secret, prefix it with the `@` symbol. For example, the following sets `CLIENT_ID` and `CLIENT_SECRET` in both the build and runtime environments:

```json
{
    "env": {
        "CLIENT_ID": "@client-id",
        "CLIENT_SECRET": "@client-secret"
    },
    "build": {
        "env": {
            "CLIENT_ID": "@client-id",
            "CLIENT_SECRET": "@client-secret"
        }
    }
}
```

This `vercel.json` configuration specifies that the environment variables should be filled with secret values. Each time your application is deployed, Vercel will read the `client-id` and `client-secret` secrets and expose them as the environment variables `CLIENT_ID` and `CLIENT_SECRET`. It's now safe to check `vercel.json` into your source code repository because it's not exposing any secure information. You can just use the `vercel` command to deploy your application knowing that all of the important environment variables will be added automatically.

## Summary

The way Vercel handles environment variables takes a little getting used to. Whereas other services allow you to specify secret environment variables directly in their web interface, Vercel requires using the `vercel` command line tool to do so.

The easiest way to securely persist environment variables in your Vercel project is to store the information in secrets and then specify the environment variables in your `vercel.json` file. Doing so allows you to check `vercel.json` into your source code repository without exposing sensitive information. Given the many configuration options available in `vercel.json`, it's helpful to have that file in source control so you can make changes when necessary.

## Updates

**2020-August-04** - Updated to rename from ZEIT Now to Vercel.


[^1]: [Vercel](https://vercel.com)
[^2]: [Netlify](https://netlify.com)
[^3]: [AWS Lambda](https://aws.amazon.com/lambda)
[^4]: [Vercel - Build Step - Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables)
