---
title: Data URIs explained
author: Nicholas C. Zakas
permalink: /blog/2009/10/27/data-uris-explained/
categories:
  - Web Development
tags:
  - Base 64
  - CSS
  - Data URI
  - Images
---
One of the most frequently requested browser features in recent memory is data URI support. There&#8217;s been a fair amount written about data URIs recently: my colleague Stoyan Stefanov has written a [couple][1] of [posts][2] about data URIs, and my former colleague Hedger Wang also penned a [post][3] about how to use data URIs in IE. Surprisingly, there&#8217;s still a lot of misunderstanding and confusion about data URIs, what they are, how they work, and why you&#8217;d ever want to use one.

## URI, not URL

URL is short for uniform resource locator, which is a combination of protocol (how to retrieve the data) andÂ  the address at which a given resource exists. Every publicly-accessible resource, such as an image, JavaScript file, HTML file, or style sheet, has a URL that tells the browser from where to download the file. The browser then makes a connection and begins to download and/or execute the file.

Every URL is also a URI, which is short for uniform resource identifier. A URI indicates a protocol for retrieving information as well as additional information about the resource. That additional information may or may not be an address (if it is, then the URI is a URL) but it is always related to the specified protocol. Hence, data URIs are not URLs since they do not contain address information.

## Data URI format

The data URI format is pretty simple and is spelled out in [RFC 2397][4] (which actually is short enough that you can read it all). The basic format is as follows:

    data:[<mime type>][;charset=<charset>][;base64],<encoded data>

In this format, `data:` is the protocol of the URI, indicating that this is a data URI. The second part, the MIME type, indicates the type of data being represented. For PNG images, for example, this would be `image/png`. When not specified, the MIME type defaults to `text/plain`. The character set can, most often, safely be omitted and isn&#8217;t used at all for images. The next section indicates the encoding used. Contrary to popular belief, you do not have to use base 64 encoding. If the content isn&#8217;t base 64 encoded, then the data is encoded using standard URL-encoding (URL-safe ASCII characters represented as themselves, all others represented as a hex encoding in the format `%xx`). The encoded data may contain white space, which is not considered significant.

## Base 64 encoding

[Base 64][5] encoding is a system of encoding whereby data is converted into bits and then grouped numerically into a set of base 64 digits. Base 64 digits include A through Z, both uppercase and lowercase, numbers, and plus (+) and slash (/). The equals sign (=) is used to indicate padding has occurred (please read the Wikipedia article for more information about this). All you really need to understand is that base 64 encoding makes the encoded data much smaller.

Here&#8217;s an example of a GIF image as a base 64-encoded data URI ([source][6]):

    data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge
    8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1h
    LnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g
    77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7

The same image can be represented without base 64-encoding as follows:

    data:image/gif,GIF89a%22%00%1B%00%F7%00%00lll%D6%D6%D6%FF%EB%85
    %FF%E0%7B%FF%F7%91%FF%D4o%DF%DF%DF%F6%F6%F6%87%87%87%FE
    %CBf%FF%F4%8E%E6%B3NKKK%C5%92-%FF%FF%99%FF%FF%FF%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00
    %00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00
    %00%00%22%00%1B%00%00%08%A9%00%1F%08%1CH%B0%A0%C1%83%08
    %13*%5C%C8%B0%A1%C3%87%10%23J%9CH%91%60%83%8B%0D%0C%1C
    %A8h%B0%81%C5%00%1B9%0A%F4%E8%A0%A4%83%07%181j%9C%D8%80
    %80%82%97%2F%0B6%40%60%80%A5%00%01)s%AA%94%D8%60%80G%84
    %02P%22%E0Y%A0%81%C9%A3%25%138h%00%80g%02%A3%04%A2J%8D
    %BA%60i%D3%88%0D%9E%3A%B8%C9%95kU%A6N%8D%0E%18Kv%EC%D7
    %AB%10%B3%1A-%C0%B6-%5B%A3%60%23%1A%D0I%97%C1%D0%88%07
    %02%20%00%C0%B7%AF_%00%08%02L%3C%60%20%80%E1%C3%88%03
    %AC%14%C9%B8%B1%E3%C7%90%23K%9EL0%20%00%3B
    

The clear winner for size is the base 64-encoded version of the image, which is significantly smaller.

**Note: **Base 64-encoding actually makes images larger. If you&#8217;re using HTTP compression, however, you likely won&#8217;t notice a difference because base 64-encoded data compresses extremely well. If for some reason you can&#8217;t use HTTP compression, you may want to check how many bytes you&#8217;re sending over the wire to determine if the tradeoff is worth it.

## Not just for images

Even though most people talk about data URIs as the way to embed images inside of an HTML or CSS file, there is nothing here that is image-specific. You can encode and embed any type of file, even HTML itself. Ian Hickson, of HTML 5 fame (or infamy, depending on your position), has a [tool][7] that allows you to play with data URIs. THe default example is an HTML file that can be turned into a data URI either with or without base 64-encoding. Playing around with this data URI generator for a while really helps to solidify the core concepts.

**Note:** Internet Explorer 8 has [security restrictions][8] on data URIs that make them less useful for non-image data.

## Performance implications

The most interesting part of the data URI story is that it gives you the ability to embed files inside of other files. Most [writeups][6] focus on embedding data URIs in CSS files as a way to improve performance. Indeed, there&#8217;s been a lot of [research][9] indicating that HTTP requests are one of the major performance holes for web sites, and decreasing the number of requests results in better page performance. &#8220;Minimize HTTP requests&#8221; is actually the first rule of the [Yahoo! Exceptional Performance Best Practices][10], and it specifically mentions data URIs:

> Inline images use the data: URI scheme to embed the image data in the actual page. This can increase the size of your HTML document. Combining inline images into your (cached) stylesheets is a way to reduce HTTP requests and avoid increasing the size of your pages. Inline images are not yet supported across all major browsers.

This is good advice for using data URIs: you want to use them where they will be cached most frequently. Regular images downloaded over HTTP are cached according to their headers and/or browser-specific settings so that they needn&#8217;t be re-downloaded all the time. Data URIs are considered to be part of the file that contains them, so they are part of the HTML or CSS file in which it is embedded. This means that the data URI has no standalone cache control policy. Embedding data URIs in your files make the files themselves larger, and if the file changes frequently (such as the homepage of a blog), then the larger file must be downloaded frequently. This slows down your site.

The easiest usage is to embed data URIs in external style sheets that are aggressively cached. That way, the empty cache experience is faster (due to fewer overall requests) and the primed cache experience is the same.

## Browser support

Most modern browsers support data URIs:

  * Firefox 2+
  * Opera 7.2+ &#8211; data URIs must not be longer than 4100 characters
  * Chrome (all versions)
  * Safari (all versions)
  * Internet Explorer 8+ &#8211; data URIs must be smaller than 32k

Since data URIs are not supported in IE prior to version 8, you need to decide whether or not it&#8217;s worthwhile to serve alternate content to those browsers (read [Stoyan&#8217;s post][2]).

## Conclusion

Data URIs are an interesting and unique concept on the Web, and are likely to get more coverage going forward. For the time being, it seems that they are best suited to performance-related tasks, but who knows where the future will take us. In the short term, you can see some good performance savings by using data URIs to eliminate additional HTTP requests for fetching images. Data URIs also open up the possibility of generating images dynamically using JavaScript, though growing support for `<canvas>` may make this use case obsolete.

 [1]: http://phpied.com/data-urls-what-are-they-and-how-to-use
 [2]: http://www.phpied.com/mhtml-when-you-need-data-uris-in-ie7-and-under/
 [3]: http://www.hedgerwow.com/360/dhtml/base64-image/demo.php
 [4]: http://tools.ietf.org/html/rfc2397
 [5]: http://en.wikipedia.org/wiki/Base64
 [6]: http://www.websiteoptimization.com/speed/tweak/inline-images/
 [7]: http://software.hixie.ch/utilities/cgi/data/data
 [8]: http://msdn.microsoft.com/en-us/library/cc848897(VS.85).aspx
 [9]: http://stevesouders.com/hpws/rule-min-http.php
 [10]: http://developer.yahoo.com/performance/rules.html
