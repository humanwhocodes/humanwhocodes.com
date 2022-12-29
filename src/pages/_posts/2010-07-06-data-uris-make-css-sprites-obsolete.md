---
title: Data URIs make CSS sprites obsolete
author: Nicholas C. Zakas
permalink: /blog/2010/07/06/data-uris-make-css-sprites-obsolete/
categories:
  - Web Development
tags:
  - CSS
  - CSS Sprites
  - Data URI
---
I was sitting in a [talk][1] given by Facebook&#8217;s Jason Sobel at Velocity this year, when I was a bit surprised by an impassioned plea that he made at the tail end of the talk. To paraphrase, Jason said that CSS sprites require too much work for average web developers and that we should be pressuring the browser vendors to make this process easier. I was perplexed for a moment. First, I don&#8217;t think CSS sprites are all that complicated anymore, especially with tools like the online [CSS Sprite Generator][2] readily available. Second, CSS sprites only really have to be used for older browsers (looking at you, IE6 and IE7), as this problem is easily solved in other browsers by using data URIs. Jason&#8217;s epilogue made it even clearer to me that people still don&#8217;t understand the true power of data URIs and how they&#8217;ll transform web development going forward.

## The purpose of CSS sprites

Before getting into how data URIs make CSS sprites obsolete, it helps to examine the problem that CSS sprites solved. The problem is that HTTP requests are a major performance bottleneck for web pages. The more requests you have, the longer it takes your page to load and the slower it is, so every little image you load onto a page fights against you in your quest for page speed.

CSS sprites solved this problem by combining multiple images into a single file, thus collapsing all of those extra HTTP requests into a single request and vastly speeding up the page. The downside is the overhead of planning for and using CSS sprite images, as the images need to be arranged in a certain order, perhaps with some extra blank space in between. That typically meant that someone had to write down the location of each individual image within the larger sprite image so that CSS could be used to position the image in the correct spot to show the correct image. For more information see Dave Shea&#8217;s article, [CSS Sprites: Image Slicingâ€™s Kiss ofÂ Death][3].

## Basic CSS sprite usage

The pattern I use the most for CSS sprites is relatively straightforward and has the goal of ensuring CSS maintainability. There is a single class that contains a reference to the CSS sprite image and several other classes that simply move the background into different positions. For example:

    .mysprite {
        background: url(mysprite.png) no-repeat;
    }
    
    .icon1 {
        background-position: 16px 16px;
    }
    
    .icon2 {
        background-position: 32px 16px;
    }

Suppose you were making a progressively enhanced toolbar with this CSS, so there&#8217;s an unordered list with each item representing a button. Imagine that these are styled such that the text is hidden and each list item link simply becomes an image to click on. The HTML for such an example would look like this:

    <ul class="toolbar">
        <li class="mysprite icon1"><a href="/save">Save</a></li>
        <li class="mysprite icon2"><a href="/open">Open</a></li>
    </ul>

For any element that wants to use the master sprite image, the class of `mysprite` is applied. Then, a second class is applied to move the sprite into position. Note that there are alternate techniques that have the same result; the reason I like this one is because the URL is only ever referenced once (good for maintainability) and it&#8217;s able to be used anywhere on the page.

In terms of performance, the benefit to this technique grows as the number of images in the same file increases. You can end up with one very large image file, but that is still better than making multiple requests for a bunch of small images. You make a single request for the sprite image and after that point it&#8217;s cached by the browser, so you no longer have to worry about making a request. Note also that if the CSS is in an external file, it too will be cached.

## Using data URIs instead

A little while back, I wrote about [what data URIs are and how to use them][4]. In short, data URIs allow you to embed images (and other files) directly into HTML and CSS. Since all of the data is represented locally, there is no extra HTTP request required to access the information.

Remember that the original problem that CSS sprites solved was having too many HTTP requests for images. Data URIs also solve that problem, and solve it in a much more manageable way. Instead of using a single extra request to get the large sprite image, you use *zero* extra requests to get the images to use. What&#8217;s more, there&#8217;s no need to combine all of the images &#8211; you can keep the images separate and use them as normal background images. The CSS doesn&#8217;t really change all that much (full data URIs omitted for space):

    .mysprite {
        /* no longer needed */
    }
    
    .icon1 {
        background: url(data:image/png;base64,<data>) no-repeat;
    }
    
    .icon2 {
        background: url(data:image/png;base64,<data>) no-repeat;
    }

Here, the `mysprite` class actually becomes unnecessary as the image data now resides in each icon class. The HTML doesn&#8217;t need to change (though you can remove `mysprite` if you so desire) in order to create the same effect.

At first glance, this may seem strange to you. The first question that people tend to ask when I describe this approach is that I&#8217;m dramatically increasing the size of the CSS by embedding the image data, doesn&#8217;t that hurt performance? The answer is no, so long as the CSS lives in an external file and is gzipped and cacheable by the browser. Base64 encoding, which is how the image data is represented, compresses remarkably well when gzipped, ultimately resulting in roughly the same amount of bytes being transferred over the write as compared to downloading the original image file. The added benefit is that you&#8217;re making zero extra calls for all of the images. And since these are in your external CSS files, they are also cached, so the next time the user comes to the page the CSS file is pulled from cache with the images already inside.

## Automatic transformation

Because I believe in this technique so much, I wrote a tool called [CSSEmbed][5] (read the [announcement][6]) that makes it trivial to update your image-based CSS into data URI-based CSS. This frees you up to write CSS code like this:

    .icon1 {
        background: url(icon1.png) no-repeat;
    }
    
    .icon2 {
        background: url(icon2.png) no-repeat;
    }

So you write CSS in the old-fashioned, non-performant way with individual images, run it through the tool, and you automatically get a CSS file with data URIs embedded. That&#8217;s it, no more arranging images into a single file or keeping track of coordinates.

Note: CSSEmbed also supports an [MHTML][7] mode to make IE6 and IE7 compatible stylesheets that use internal images similar to data URIs.

## Conclusion

CSS sprites were a solution to the problem of multiple HTTP requests to download multiple images. Data URIs allow you to embed images directly into your CSS files, solving the same problem in a much more elegant and maintainable way. Although we still need CSS sprites for older versions of Internet Explorer, that shouldn&#8217;t prevent you from investigating the use of data URIs as a better alternative to CSS sprites. Once IE6 and IE7 go away for good (some day), there really shouldn&#8217;t be the need to use CSS sprites so heavily if at all.

 [1]: http://en.oreilly.com/velocity2010/public/schedule/detail/15545
 [2]: http://css-sprit.es/
 [3]: http://www.alistapart.com/articles/sprites/
 [4]: {{site.url}}/blog/2009/10/27/data-uris-explained/
 [5]: http://github.com/nzakas/cssembed
 [6]: {{site.url}}/blog/2009/11/03/automatic-data-uri-embedding-in-css-files/
 [7]: http://en.wikipedia.org/wiki/MHTML
