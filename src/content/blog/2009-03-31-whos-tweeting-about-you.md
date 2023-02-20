---
title: "Who's tweeting about you?"
author: Nicholas C. Zakas
permalink: /blog/2009/03/31/whos-tweeting-about-you/
categories:
  - Web Development
tags:
  - Atom
  - Feeds
  - Pipes
  - RSS
  - Twitter
---
Over the past few days, I've seen several people tweet that they didn't see messages referring to them in their replies list. This was one of the hard things I learned when I started using Twitter: messages only appear in your replies if your username comes first in the message. If your username comes anywhere after the first character, it's off in cyberspace somewhere. This means all retweets (RTs) or other mentions are lost to you unless you're following the person doing the tweeting. Twitter just [updated their services][1] to change replies to mentions, but now that means all replies directed at you are mixed in with mentions in one list. What to do?

[Twitter Search][2] offers feeds for any search that you execute, making it easy to subscribe to a particular search and see any updates in your favorite feed reader. A lot of people use this to track product mentions, etc., on Twitter. [Some users][3] have set up searches for their own username in an effort to keep track of people talking about them. This results in a list of tweets that mimics Twitter's new &#8220;mentions&#8221; list, with mentions and replies together in one list.

To get a list of just people who've mentioned you (but not replied to you), you want to run the search for your Twitter username and return only the items that don't begin with your username. You could do this yourself, or you can use the inexplicably awesome [Yahoo! Pipes][4] service to filter the feed. It took all of five minutes to set up the pipe and subscribe to it in my feed reader.

[<img class="size-medium wp-image-2030" src="/images/posts/2009/03/mypipe-300x229.png" alt="Yahoo! Pipe diagram" width="300" height="229" align="right" />][5] The first step was to create a new pipe and name it. Next, I added an Fetch Feed source to the pipe and supplied the Twitter Search feed URL for my username ([@slicknet][6]). A feed for your username is in the format `http://search.twitter.com/search.atom?q=%40your_username`, so mine is `http://search.twitter.com/search.atom?q=%40slicknet`.

Next, I added a Filter operator to the pipe and directed the output from the Fetch Feed source to the Filter. Filters are used to block or permit items through to the result based on one or more conditions. The easiest approach in this case was to block all items where my username was mentioned first. To figure out the best way to achieve this, I had to look at the format of the Twitter feed.

Each entry in the feed is comprised of the standard fields as well as some Twitter-specific additions. Sample:

    <entry>
      <id>tag:search.twitter.com,2005:1414008445</id>
      <published>2009-03-29T21:11:07Z</published>
      <link type="text/html" rel="alternate"
            href="http://twitter.com/goldstein/statuses/1414008445"/>
      <title>Great writeup on the performance issues of various Ajax data
        formats from @rharmes (via @slicknet)</title>
      <content type="html">Great writeup on the performance issues of
        various Ajax data formats from
        <a href="http://twitter.com/rharmes">@rharmes</a>
       (via <a href="http://twitter.com/slicknet"><b>@slicknet</b></a>)
      </content>
      <updated>2009-03-29T21:11:07Z</updated>
      <!-- The following URL is shortened for better formatting-->
      <link type="image/png" rel="image"
        href="http://s3.amazonaws.com/.../frogy_big1_normal.jpg"/>
      <twitter:source>
        <a href="http://iconfactory.com/software/twitterrific">
          twitterrific
        </a>
      </twitter:source>
      <author>
        <name>goldstein (Leonidas Tsementzis)</name>
          <uri>http://twitter.com/goldstein</uri>
      </author>
    </entry>

After looking through the code, it was easy to see that both the title and content sections would be appropriate to filter on. In the case of a reply, your username appears first in both sections. I decided to use a simple regular expression `^@slicknet` and run it against the `title` of each entry. If there is a match, then that item is blocked while all others allowed through to the result. I then attached the output of the Filter to the Pipe Output and saved the result. That's it! I simply subscribe to this pipe in my feed reader to get all of the non-reply mentions of my username in the Twitterverse.

This is, of course, a very simple example of the cool things you can do with Yahoo! Pipes. In fact, the same basic logic can be used to build a list of just direct replies to you. The possibilities for mixing multiple Twitter feeds and filtering based on some criteria are infinite. Happy piping!

 [1]: http://blog.twitter.com/2009/03/replies-are-now-mentions.html
 [2]: http://search.twitter.com
 [3]: http://http://twitter.com/mikeleeorg/status/1403314359
 [4]: http://pipes.yahoo.com/
 [5]: /images/posts/2009/03/mypipe.png
 [6]: http://www.twitter.com/slicknet/
