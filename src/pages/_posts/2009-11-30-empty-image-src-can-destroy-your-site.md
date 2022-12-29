---
title: Empty image src can destroy your site
author: Nicholas C. Zakas
permalink: /blog/2009/11/30/empty-image-src-can-destroy-your-site/
categories:
  - Web Development
tags:
  - HTML
  - PHP
  - Web Development
---
This is a problem I&#8217;ve come across frequently, and since it has come up again recently, I thought I&#8217;d explore this issue in the hope that it will save others some trouble. There are so many problems that this one issue can lead to that it&#8217;s baffling browsers still behave this way. The issue? An HTML image, either via `<img>` tag or JavaScript `Image` object, that has its `src` set to &#8220;&#8221; (an empty string).

## The offending code

There are basically two patterns to identify. The first pattern is just straight HTML:

    <img src="" >

The second pattern is JavaScript and involves the dynamic setting of the `src` property on either a newly created image or an existing one:

    var img = new Image();
    img.src = "";

Both patterns cause the same effect: another request is made to your server. There are two different ways that browsers do this.

  * Internet Explorer makes a request to the directory in which the page is located. For example, if you have a page running at `http://www.example.com/dir/mypage.htm` that has one of these patterns, IE makes a request to `http://www.example.com/dir/` to fill in the image.
  * Safari and Chrome make a request to the actual page itself. So the page running at `http://www.example.com/dir/mypage.htm` results in a second request to `http://www.example.com/dir/mypage.htm` to fill in the image.

You&#8217;ll note that Opera and Firefox aren&#8217;t mentioned at all. Opera behaves as you might expect: it doesn&#8217;t do anything when an empty image `src` is encountered; the attribute is ignored. Firefox 3 and earlier behave the same as Safari and Chrome, but Firefox 3.5 addressed this issue and no longer sends a request ([related bug][1]).

Both cases, of course, are problematic because it&#8217;s an image making a request for a document. You can easily see this behavior using an HTTP debugging proxy (I highly recommend [Fiddler][2]).

## The problems

There are two basic problems that this browser behavior causes. The first is a traffic spike.Â  Imagine that have `<img src="">` on the page at `http://www.example.com/`. The big problem is that each instance of `<img src="">` makes a request to `/` in all browsers, which is the homepage of the domain. Congratulations, you&#8217;ve effectively doubled your traffic to the homepage.

For small sites, this may not be that big of a deal; jumping from 10,000 to 20,000 page views probably isn&#8217;t going to raise any flags for you or your host. If you&#8217;re a page that gets millions of page views per day, and probably have a lot of machines to handle that load, doubling or tripling traffic can be crippling. You can very easily run out of capacity.

Another issue with the traffic increase is the computing power needed to generate that homepage. If the page is personalizable or is updated with some regular frequency, you could be wasting computing cycles creating a page that will never be viewed by anyone.

The second problem is user state corruption. If you&#8217;re tracking state in the request, either by cookies or in another way, you have the possibility of destroying data. Even though the image request doesn&#8217;t return an image, all of the headers are read and accepted by the browser, including all cookies. While the rest of the response is thrown away, the damage may already be done.

## How does this code happen?

The first time I encountered this problem, I naively thought that it was a bad developer writing crappy code. Had this been 2000 or earlier, I probably would have been right. In today&#8217;s web development world, however, I&#8217;m mostly wrong. Today, there are so many templating engines and content management systems responsible for constructing pages on-the-fly that it&#8217;s quite possible for good developers to end up producing pages with this code. All it takes is something as simple as this PHP:

    <img src="$imageUrl" >

If some other part of the code is responsible for filling in `$imageUrl`, and that code fails, then the offending code gets output to the browser.

In today&#8217;s web development world, we&#8217;re all doing something along these lines, whether we know it or not. Download a new WordPress theme? Make sure you&#8217;ll filled in all default arguments. Using a CMS at work? Make sure all your image URL fields are validated. It&#8217;s frightening easy to end up with this bad code on your page.

## Other tags with problems

Before getting too angry at browser vendors, I think it&#8217;s fair to take a look at the [HTML 4 specification][3], specifically the part [defining images][4]. Even though the specification indicates that the `src` attribute should contain a URI, it fails to define the behavior when `src` doesn&#8217;t contain a URI. Of course, images aren&#8217;t the only tags that reference an external resource, and so it should come as no surprise that there are other tags with the same problem.

As it turns out, Internet Explorer is the most sane browser out there. It&#8217;s problems are thankfully limited to images with an empty `src` attribute. It does make for this by making it a pain to detect, but that will be discussed later.

For other browsers, there are two additional problem scenarios: `<script src="">` and `<link href="">`. Chrome, Safari, and Firefox all initiate another request.

Thankfully, no browser has a problem with `<iframe src="">`, as all correctly do not make another request.

## What can be done?

Of course, the best thing to do is eliminate the offending code from your pages whenever possible. That&#8217;s fixing the problem at the source. If you can&#8217;t do that, though, your next best option is to attempt to detect it on the server and abort any further execution.

For browsers other than IE, it&#8217;s not too difficult to detect what&#8217;s going on from the server side. Since the request comes back to the exact same location that contains the offending code, there are two things you can do. First, you can check the request&#8217;s referrer. A request resulting from this issue coming from `http://www.example.com/dir/mypage.htm` will have a referrer of `http://www.example.com/dir/mypage.htm`. Assuming that there are *no valid situations under which your page links to itself*, this is a fairly safe way to detect these requests on the server-side.

Internet Explorer throws a wrench into the works by sending the request to the directory of the page instead of the page itself. If you&#8217;re only using path URLs (i.e., nothing with a file extension), then the effect is the same and you can use the same referrer detect. Some sample code for use with PHP:

    <?php
        //Works for IE only when using path URLs and not file URLs
    
        //get the referrer
        $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    
        //current URL (assuming HTTP and default port)
        $url = "http://" . $_SERVER['HTTP_HOST']Â  . $_SERVER['REQUEST_URI'];
    
        //make sure they're not the same
        if ($referrer == $url){
            exit;
        }
    ?>

The goal here is to detect that the page refers to itself and then `exit` immediately to prevent the server from doing anything additional. Another option, and probably a good idea, is to log that this has happened so it shows up on a dashboard for evaluation.

Another way to attempt to detect this type of request on the server is by looking at the HTTP `Accept` header. All browsers except IE send different HTTP `Accept` headers for image requests than they do for HTML requests. As an example, Chrome sends the following `Accept` header for an HTML request:

    Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5

Compare this to the `Accept` header that is sent for an image, script, or style sheet request:

    Accept: */*

Firefox, Safari, and Opera all send roughly the same `Accept` header for HTML requests, meaning that you can check for an individual part, such as &#8220;text/html&#8221;, to determine if the request is an HTML request or something else. Unfortunately, IE only sends the latter `Accept` header for all requests, so there is no way to differentiate this on the server. For browsers other than IE, you can use something like the following:

    <?php
        //Warning: Doesn't work for IE!
    
        //make sure the Accept header has 'text/htmnl' in it
        if (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false){
            exit;
        }
    ?>

This check is a little safer than the previous, but its big downside is that it doesn&#8217;t work in IE.

## Why does this happen?

The real problem is the way that URI resolution is performed in browsers. This behavior is defined in [RFC 3986 &#8211; Uniform Resource Identifiers][5]. When an empty string is encountered as a URI, it&#8217;s considered a relative URI and is resolved according to the algorithm defined in [section 5.2][6]. This specific example, an empty string, is listed in [section 5.4][7]. Firefox, Safari, and Chrome are all resolving an empty string correctly per the specification, while Internet Explorer is resolving it incorrectly, apparently in line with an earlier version of the specification, [RFC 2396 &#8211; Uniform Resource Identifiers][8] (this was obsoleted by RFC 3986). So technically, the browsers are doing what they&#8217;re supposed to do to resolve relative URIs. The problem is that in this context, the empty string is clearly unintentional.

## It&#8217;s time to fix this

This is a serious flaw in browsers, and I&#8217;m not sure you can look at it in any way where it&#8217;s not considered a bug. The inconsistent behavior, from Opera completely ignoring all invalid external references, to IE falling victim only for `<img>` tags while others do the same for `<script>` and `<link>` as well, seem to indicate a bug in browsers. Though browsers seem to be following correct URI resolution (except IE), I think this is a case where common sense must win over the letter of the specification. There is no way that an image can possibly render an HTML page, and the same goes for `<script>` and `<link>`. This bug has cost web developers hundreds of lost hours and has potentially brought down sites, pushing servers over capacity. Enough is enough. It&#8217;s time for the browser vendors to fix this bug. I&#8217;ve taken the liberty of filing or locating bugs:

  * Firefox: [Bug 531327][9]
  * WebKit (Safari/Chrome): [Bug 30303][10]

Please show support for fixing these bugs, as I don&#8217;t see any reason why we should still be dealing with this browser behavior. And if anyone can get the note to Microsoft so they can address IE, we&#8217;d all greatly appreciate it.

## HTML5 to the rescue

HTML5 adds to the description of the `<img>` tag&#8217;s `src` attribute to instruct browsers not to make an additional request in [section 4.8.2][11]:

> The `src` attribute must be present, and must contain a valid URL referencing a non-interactive, optionally animated, image resource that is neither paged nor scripted. If the base URI of the element is the same as the document&#8217;s address, then the src attribute&#8217;s value must not be the empty string.

Hopefully, browsers won&#8217;t have this problem in the future. Unfortunately, there is no such clause for `<script src="">` and `<link href="">`. Maybe there&#8217;s still time to make that adjustment to ensure browsers don&#8217;t accidentally implement this behavior.

**Update (2 Dec 2009):** It appears that `<img src="">` has been patched in Firefox 3.5 ([bug 444931][1]). Problems with `<script src="">` and `<link href="">` still remain. Also, added a reference to the HTML5 section that aims to help this issue.

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=444931
 [2]: http://www.fiddlertool.com/
 [3]: http://www.w3.org/TR/html4/
 [4]: http://www.w3.org/TR/html4/struct/objects.html#h-13.2
 [5]: http://tools.ietf.org/html/rfc3986
 [6]: http://tools.ietf.org/html/rfc3986#section-5.2
 [7]: http://tools.ietf.org/html/rfc3986#section-5.4
 [8]: http://tools.ietf.org/html/rfc2396
 [9]: https://bugzilla.mozilla.org/show_bug.cgi?id=531327
 [10]: https://bugs.webkit.org/show_bug.cgi?id=30303
 [11]: http://www.w3.org/TR/html5/text-level-semantics.html#attr-img-src
