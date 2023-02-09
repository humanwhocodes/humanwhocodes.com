---
title: The importance of being versioned
author: Nicholas C. Zakas
permalink: /blog/2011/02/22/the-importance-of-being-versioned/
categories:
  - Web Development
tags:
  - API
  - Versioning
  - Web Services
---
If you write or use a public web service, please read this post carefully. I'm shocked and saddened at just how poorly many of these APIs are designed. I'm not necessarily talking about the choice of REST or not, or XML vs. JSON, as these are somewhat matters of preference and usage patterns. I'm talking about whether or not the API is versioned.

## What is a versioned API?

A versioned API is one where you can select the version that your site consumes. As a very simple example, consider YUI. The most recent version is YUI 3.3.0 and can be included in your page using the following code snippet:

<pre>&lt;script src="http://yui.yahooapis.com/3.3.0/build/yui/yui-min.js"&gt;&lt;/script&gt;</pre>

Note the embedding of the version in the URL &#8211; this is how YUI handles API versioning. That means you can choose to use an earlier version, say YUI 3.1.0 by using this code instead:

<pre>&lt;script src="http://yui.yahooapis.com/3.1.0/build/yui/yui-min.js"&gt;&lt;/script&gt;</pre>

Many web services use a similar methodology, either providing the version number in the URL or as a parameter to the API.

## Why versioned APIs are important

A versioned API is a contract between the producer of the API and its consumers saying, &#8220;I guarantee that this API will continue to work this way for the foreseeable future.&#8221; Put simply, if `api(2, 3)` returns 5 now, it will always return 5. And that's the number 5, not a string &#8220;5&#8243;, or a JSON object `{ value: 5 }`.  Of course, not all APIs are this simple.

Realistically, APIs need to change. Bugs need to be fixed, security holes closed, out-of-date schemas updated, and so on. You absolutely cannot expect an API to never change. It's how you manage these changes that makes all the difference to consumers. Versioned APIs provide the ability to make *breaking changes* without breaking already-existing implementations.

Consider an API that is called by your site to embed a list of articles from a RSS feed. When you test, the API returns HTML as an ordered list with a class name of &#8220;rss-list&#8221;. You write your CSS to style the list appropriately. Your integration server is setup and verified by your QA team and the site is pushed live. The next day, the layout in production is completely broken. What happened? The API was changed to return JSON instead of HTML, as the API author believed it was inappropriate to force markup on the API consumers. While that may be a rational API design decision (though arguably one that should have been made early on), it's irresponsible to make such a dramatic change to an API that others are using in production. Congratulations, you just broke the Internet.

A versioned API allows API producers to make those changes whenever you want. Will the change break code already in use? Just change the version. Whether it's a minor point release or a major point release, just introducing the new version allows the API to continue to evolve while not breaking existing implementations. You can then notify the API consumers that there is a new version available and they can schedule an upgrade to use the new API version. The API consumers then can go through their normal integration and testing cycle to ensure that what goes out into production is fully functional.

## Managing versions

There are a fair amount of decisions that have to be made when providing a versioned API. The most important decision is how to determine when the version should change. To be clear, not all API changes require a version change. Here's the key determinant for a new version: are you changing the functionality in such a way that breaks current implementations? If the answer is yes, then it's time for a new version; if no, then a new version isn't necessary.

For example, consider an API that fetches article text. This API is experiencing problems returning data so that 50% of the time an empty string is returned. It's unlikely that the API consumers are relying on this behavior so improving the rate at which actual article contents are returned doesn't require a version change.

Schema changes can be tricky, both for input parameters and response formats. Adding additional optional parameters may not require a version change. The same can be said for adding additional fields in the response format. If you add a new required input parameter or change the name of a field in the response format, then a new version is required.

Bug fixes may or may not require a version change based on the scope of the change. Feature changes almost always require a version change &#8211; this includes adding new features and removing or altering existing features. To repeat: the key determinant is if the change you're making breaks current implementations.

## Supporting past versions

Just because your API is versioned doesn't mean you need to continue to support all versions ever created. The correct rules for managing versions depend largely on the API itself, how frequently the API changes, and for how long you want to support old versions. The rules for JavaScript APIs are different than for web service APIs. There are, however, some general guidelines that you can start with:

  * Keep track of your API consumers. You may want to require an API key for use and tie that to a verified email address.
  * Plan to maintain at least two previous versions of the API.
  * The API should be backwards compatible for at least one version. That means parts of the API can be deprecated immediately but shouldn't be removed immediately.
  * Each previous version should be supported (still available, but not under active development) for a minimum of six months. This gives consumers enough time to upgrade.
  * When a new version is released, notify the consumers (via email if you have an API key) and inform them of the timeframe for upgrade. The timeframe must be in months &#8211; many companies plan at least a couple months ahead of time.
  * Monitor usage of older versions. When you get within one month of end-of-life for a version, notify those consumers that are still using that version to give them fair warning. Do the same two weeks later.

Keeping API consumers informed of changes to the API is the most important aspect of these guidelines. No one likes it when their site worked yesterday and doesn't work today &#8211; especially when they didn't make any changes.

You'll note that not all APIs have API keys, such as JavaScript libraries. Whether or not you use one is entirely dependent on whether or not you want to track API usage by consumers. If there's no advantage to doing so, then you may not use API keys &#8211; you'll just need to find some way to communicate with consumers about version changes.

## Conclusion

The example I used earlier was for YUI, but this article also applies to any web services you may consume or produce. If you're providing a public-facing API, please ensure that it's versioned. If you're considering using a public-facing API, inoculate yourself from random and unexpected errors by using only versioned APIs. There are too many companies that still insist on providing unversioned APIs for public consumption. These APIs put a tremendous burden on development and testing teams that is unfair and prevents their sites from being as reliable as possible. Give them that feedback &#8211; you'll be doing yourself and all other API consumers a great service.
