---
title: "Posting to Medium using Node.js and fetch()"
author: Nicholas C. Zakas
teaser: "A workaround for the unsupported Node.js Medium SDK."
date: 2019-01-05
categories:
  - Node.js
tags:
  - JavaScript
  - Fetch
  - Node.js
  - Medium
---


You can use the [Medium REST API](https://github.com/Medium/medium-api-docs) to post new articles on Medium. They previously had a [Node.js SDK](https://github.com/Medium/medium-sdk-nodejs) to make using the API a bit simpler, but that SDK is no longer supported. Rather than relying on an unsupported SDK, you can call the REST API endpoints directly using the `node-fetch` package. The following code expects you to define `MEDIUM_PUBLICATION_ID` and `MEDIUM_ACCESS_TOKEN` (the Medium [integration token](https://help.medium.com/hc/en-us/articles/213480228-Get-integration-token)) yourself.

```js
const fetch = require("node-fetch");

// construct the URL to post to a publication
const MEDIUM_POST_URL = `https://api.medium.com/v1/publications/${MEDIUM_PUBLICATION_ID}/posts`;

const response = await fetch(MEDIUM_POST_URL, {
    method: "post",
    headers: {
        "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
        "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    },
    body: JSON.stringify({
        title: "Title of my post",
        contentFormat: "html",
        content: "Body of my post",
        tags: ["Hello", "World"],
        publishStatus: "draft", // or "public" to immediately publish

        // optional: the canonical URL if posted elsewhere first
        canonicalUrl: "https://example.com/blog/1"
    })
});

const messageData = await response.json();

// the API frequently returns 201
if ((response.status !== 200) && (response.status !== 201)) {
    console.error(`Invalid response status ${ response.status }.`);
    throw messageData;
}
```
