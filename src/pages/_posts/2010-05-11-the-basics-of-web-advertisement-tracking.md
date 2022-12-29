---
title: The basics of web advertisement tracking
author: Nicholas C. Zakas
permalink: /blog/2010/05/11/the-basics-of-web-advertisement-tracking/
categories:
  - Web Development
tags:
  - Ads
  - CPM
  - CTR
  - HTML
  - Web
---
There is little debate over how important advertising is to the web. Web ads have made Google a powerhouse and everyone else envious. Their Adsense product made ads ubiquitous on even the smallest of web sites and yet people still don&#8217;t have a good understanding of ads are tracked, and therefore, how they make money. What follows here is a description of the modern web advertisement tracking paradigm. Keep in mind that this is a bit of a simplification, though the most important aspects are definitely covered.

## Example: Amazon Associates links

Before getting fully into a discussion of how ads are tracked, it helps to have an example. [Amazon][1] has a great program called Amazon Associates which allows you to refer visitors to Amazon. If a referred user makes a purchase on Amazon, then the associates who sent them along gets a referral fee. The fee is typically pretty low, starting at around 4%, and increases as your referred visitors sell more. All of the book pictures on this site contain an Amazon Associates link, and many other sites do the same thing.

As an associate, you can decide what kind of link to show on your site. The simplest is a text link. Here&#8217;s an example text link, pasted from the Amazon Associates site, for <cite><a href="http://www.amazon.com/gp/product/059680279X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=059680279X">High Performance JavaScript</a>:</cite>

    <a href="http://www.amazon.com/gp/product/059680279X?ie=UTF8&tag=nczonline-20&linkCode=as2&camp=1789
    &creative=390957&creativeASIN=059680279X">High Performance JavaScript (Build Faster Web Application Interfaces)</a>
    <img src="http://www.assoc-amazon.com/e/ir?t=nczonline-20&l=as2&o=1&a=059680279X" width="1" height="1"
     border="0" alt="" style="border:none !important; margin:0px !important;" />

Note that there are actually two tags in this code: an `<a>` tag and an `<img>` tag. You may be wondering why an image is present in what should be a text link. Take a look at the styles applies to the image: it&#8217;s a 1&#215;1 image with no border and no margin, which effectively keeps it at 1&#215;1 no matter what styles are on the page. What gives?

## Makeup of a web ad

This is actually a very common occurrence in the world of web advertising. Each ad is typically made up of two portions:

  1. The payload, which is the markup displayed to the user. This might be plain text, an image, a Flash movie, or other.
  2. The tracking beacon, which is used to determine when the payload was displayed. When an image is used, this is frequently called a &#8220;tracking pixel.&#8221;

In the case of the Amazon Associates link above, the payload is the text link and the image is a tracking beacon. Without the image, Amazon has no idea how frequently the given link is displayed

Most ads use images this way for a number of reasons. First, the image is virtually guaranteed to be downloaded if the payload is displayed due to the proximity of the image markup to the payload markup. The ad server returns an image that cannot be cached (through the use of HTTP headers) and so the image is requested every time the ad markup is parsed. Because it&#8217;s simply a 1&#215;1 image, it doesn&#8217;t take a long time to download and it doesn&#8217;t really affect the layout of the page.

Second, images can be loaded from a different domain than the rest of the page, allowing for different cookies to be written and read. Note that the Amazon Associates example uses two different domains: one for the text link and one for the image.

## Tracking ads

There are many metrics used to determine both the cost of an ad and how successful the ad really is. Big companies like Google are obsessed with these metrics as they are so tied to revenue.

### Impressions

Ad impressions, also called ad views, are the number of times that each ad is displayed to the user. This is precisely the measurement for which the tracking beacon is used. Each time a request is made to the tracking beacon, it means an ad was displayed to a user and so the impression count for that ad is incremented.

Impressions are important because they are typically used to determine the cost of ads. It&#8217;s quite common to sell ads based on a thousand impressions (called CPM or cost per thousand &#8211; &#8220;M&#8221; is the Roman numeral for a thousand). Because impressions are so closely tied to cost, it&#8217;s imperative that this number be as correct as possible. Tracking beacons are the current state-of-the-art to assure accurate impression count.

### Clickthroughs and clickthrough rate

A clickthrough occurs when a user clicks on the given ad. Clickthroughs are tracked by the link in the ad, so in the Amazon Associates example, a click is tracked through the amazon.com domain name based on the extra query string parameters. A clickthrough means that the user arrived on the ad&#8217;s destination site and, presumably, is ready to spend money on the product.

Clickthrough rate, often called CTR by businessfolk, is the measure of how many users who saw the link actually clicked on it as a percentage. In order to calculate this number, you divide the total clickthroughs for a given period by the total impressions for the same time period.

Clickthrough rates are typically used to measure the success of an advertising campaign. Most ads clickthrough at a very low rate (0.5% or less, source: [8 ways to improve your clickthrough rate][2]), so an ad that clicks through at a rate of 2% is considered a big success. Advertisers frequently use the known clickthrough rate of a given ad spot combined with CPM to determine whether it would be a good idea to buy an ad in that position or not.

There are pay-per-click (PPC) advertising campaigns, as well, for which the clickthrough count and clickthrough rate are very important.

### Page views

Another important metric that is frequently tracked are the page views of the page on which a given ad is displayed. This has to be done by the site that is hosting the ad, since the ad provider has no way of knowing this data. A page view is typically counted when the page begins to output markup from the server. In effect, once the opening `<html>` tag is sent, a page view is counted.

Page views are important because they are a checkpoint for how many impressions to expect for a given ad. For example, if there are 1,000 page views for a single page during a specific time but 100,000 ad impressions, that could mean something is very wrong. Basically, you&#8217;d like to see one ad impression for each page view, though in reality these numbers rarely ad up.

### Metrics mixups

Page views and ad impressions are usually tracked together to determine what a &#8220;normal&#8221; relationship looks like between the two. For some, a normal relationship may be 80% of page views have an ad impression, where for others it may be 90% and still others may be lower or higher. The numbers don&#8217;t typically add up to 100% for a few reasons:

  * **Page abandonment.** There are times when the user leaves a page while it&#8217;s still loading, so a page view is counted but an ad impression is not. This can happen for any number of reasons: server error results in the page not completely rendering, a network connection is lost so the page isn&#8217;t fully served, the user clicks on a link at the top of the page before the rest of the page is rendered, etc. Since the page view is counted right at the beginning but the ad impression isn&#8217;t counted until the ad markup is returned, a page view without a corresponding ad impression is considered to be an &#8220;abandoned&#8221; page.
  * **Browser cache.** It&#8217;s possible that the page may be served from the browser&#8217;s cache. This happens most frequently when someone clicks a link on the page and then hits the back button. In that case, the page is served from the browser&#8217;s cache and so does not generate a page view (remember, page views are measured by the server that is serving the page). Because the tracking beacon is not cached, it will still fire and count as an ad impression, so you have the opposite scenario of page abandonment: an ad impression without a page view.

These two circumstances tend to happen with a predictable rate for any given page on the web, so the ratio of page views to ad impressions tends to remain constant even as traffic increases and decreases due to seasonality (different browsing behaviors based on the time of year). Big traffic increases or decreases may change the ratio. A big change in the ratio without an accompanying big change in traffic means that there&#8217;s a serious problem with ads.

## Conclusion

Web ads aren&#8217;t going away anytime soon, and at some point you may need to understand how they work. What I&#8217;ve shared here are the basics that you need to know in order to grasp the concept of web ads and tracking. At some point, you may be asked to help debug some ads tracking and it&#8217;s my hope that this post serves as a good jumping off point to help those who end up in that position.

 [1]: http://www.amazon.com/?tag-nczonline-20
 [2]: http://www.imediaconnection.com/content/25781.asp
