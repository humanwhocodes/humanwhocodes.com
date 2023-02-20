---
title: "How to validate the signature of a GitHub webhook using Node.js"
author: Nicholas C. Zakas
teaser: "It's important to secure your GitHub webhooks using signatures. This is how to do it in Node.js."
date: 2020-08-05
categories:
  - Web Development
tags:
  - Node.js
  - GitHub
  - Security
  - Webhooks
  - Crypto
---

When you have GitHub send a [webhook](https://docs.github.com/en/developers/webhooks-and-events/about-webhooks) to your server, you can optionally specify a [secret](https://docs.github.com/en/developers/webhooks-and-events/securing-your-webhooks) that is used to generate a signature for the webhook request. It's highly recommend to use the secret to check the signature of the payload to ensure it's actually coming from GitHub.

You'll need to generate a signature based on the request body and the secret you gave to GitHub when configuring the webhook. For JSON-based payloads, you can can calculate and verify the signature using this JavaScript:

```js
import crypto from "crypto";

const { WEBHOOK_SECRET } = process.env;

function validateJsonWebhook(request) {

    // calculate the signature
    const expectedSignature = "sha1=" +
        crypto.createHmac("sha1", WEBHOOK_SECRET)
            .update(JSON.stringify(request.body))
            .digest("hex");

    // compare the signature against the one in the request
    const signature = request.headers["x-hub-signature"];
    if (signature !== expectedSignature) {
        throw new Error("Invalid signature.");
    }
}
```

As long as `request.body` is an object (which most Node.js server frameworks will provide JSON requests), then the `validateJsonWebhook()` function will work.
