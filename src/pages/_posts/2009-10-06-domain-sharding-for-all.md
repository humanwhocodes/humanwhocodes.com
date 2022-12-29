---
title: Domain sharding for all
author: Nicholas C. Zakas
permalink: /blog/2009/10/06/domain-sharding-for-all/
categories:
  - Web Development
tags:
  - Domains
  - Performance
---
One of the most frequently talked about performance improvements for web sites is the sharding of domains. This was one of [Steve Souders&#8217; original rules][1] (mentioned in [High Performance Web Sites][2]) and still one of the [Yahoo! Exceptional Performance guidelines][3]. The basic problem is that browsers limit the number of parallel connections opened to a particular domain. Although recent browsers have upped the number of parallel connections for HTTP 1.1 from 2 to 6, your page still downloads faster if you have at least a couple of other domains from which to download resources. The guideline is to have at least two different domains but no more than four (as you increase DNS lookups and therefore negatively impact performance).

When I&#8217;ve discussed this with other developers, everyone agrees that this is a good idea. Most major web sites use multiple domains to download page components. It&#8217;s relatively cheap and easy to setup a new CNAME entry for your domain and direct some resources there. The pain point I usually here is that for personal or small business web sites, they don&#8217;t have access to creating subdomains and certainly don&#8217;t have a CDN to use. Fortunately, there&#8217;s a variety of places you can store resources that will allow event the smallest site to enjoy the performance gain of using multiple domains.

## Photos &#8211; Flickr

If you regularly use photos on your site, then [Flickr][4] is a great option. Flickr not only hosts your photo files, but also creates several different sizes of the original image, all of which can be embedded on your page. Once your photos are on Flickr, you can click on &#8220;All Sizes&#8221; to choose the image size you want and then scroll to the bottom of the page where you&#8217;ll see a section with both HTML to embed the image and a direct link. The only thing to keep in mind is that, according to the Flickr terms of service, you&#8217;ll need to link that image back to its Flickr page (very easy using the provided HTML). Your photos are then loaded from the Flickr servers, so there&#8217;s no need to upload them to your own site.

Flickr comes with both free and pro versions, and photo embedding on your site can be done with either plan. The pro version is $24.95 per year and removes all limits on uploads, [among other things][5].

## Graphics &#8211; Photobucket

For non-photo images, such as background images or decorative page enhancements, [Photobucket][6] is a great alternative. Photobucket gained popularity with the rapid rise of [MySpace][7] as people needed free locations to upload photos in order to create those crazy MySpace profile page designs. Photobucket makes it easy to embed images by providing links for various services as well as a direct URL to each image. Unlike Flickr, you can only share the exact same image you uploaded, which makes Photobucket less useful for photos (which are often quite large) but quite useful for other graphics. This is currently where I store the graphics of my books that you see on this site.

Photobucket also comes in free and pro flavors. The [free version][8] has a limit on both uploads and data transfer while the [pro version][9] ($24.95 per year) removes those restrictions and also allows videos and SWF files to be uploaded and shared.

## JavaScript libraries &#8211; Yahoo! and Google

If you use a popular JavaScript library, YUI, Dojo, jQuery, MooTools, etc., there&#8217;s no need to have those files on your server since both Yahoo! and Google host various parts on their own CDNs. Yahoo!, of course, does so for the YUI library (both the [2.x][10] and [3.x][11] versions), allowing you to use the same CDN that is used on the Yahoo! network to load YUI. Google offers a [much wider selection][12] of libraries, including YUI, that can be loaded from their CDN. Not only do Yahoo! and Google offer other domains from which to load the libraries, since these are CDN domains, the resources are loaded from the best possible geographic server location (adding an even bigger performance boost). There is no charge from either Yahoo! or Google to access these libraries.

## Presentations &#8211; Slideshare

If you&#8217;ve been at a tech conference recently, you&#8217;re probably familiar with [Slideshare][13]. It&#8217;s where many notable speakers upload their presentations to share with everyone. Slideshare translates Powerpoint, Keynote, and other presentation formats into a Flash movie that is embeddable anywhere, making it the &#8220;YouTube of presentations.&#8221; Beyond that, Slideshare stores a copy of the presentation that can be downloaded directly from their site. Since presentations tend to be quite large, it&#8217;s a good idea to store those elsewhere so as not to affect your monthly bandwidth. All of [my presentations][14] are up on Slideshare.

## Anything &#8211; Amazon S3

I&#8217;d be remiss if I didn&#8217;t mention [Amazon&#8217;s S3][15]. While not a free services, Amazon S3 has some very [reasonable pricing][16] for data transfer and storage (we&#8217;re talking cents per GB of storage and transfer). While not strictly a service for web sites, Amazon S3 allows you to store any file of any type and size in the same location for a low cost. If you want all of your files in the same location on a dependable system, Amazon S3 is a great option, which is why companies like [Twitter use Amazon S3][17].

## Others?

I&#8217;m sure there are many more free and pay sites to use for web data storage, but these are the ones I&#8217;ve personally used and would recommend. What are you favorite sites for storing data?

 [1]: http://www.stevesouders.com/blog/2009/05/12/sharding-dominant-domains/
 [2]: http://www.amazon.com/gp/product/0596529309?ie=UTF8&tag=nczonline-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0596529309
 [3]: http://developer.yahoo.com/performance/rules.html#split
 [4]: http://www.flickr.com/
 [5]: http://www.flickr.com/upgrade/
 [6]: http://www.photobucket.com
 [7]: http://www.myspace.com
 [8]: http://photobucket.com/faq?catID=29&catSelected=f&topicID=320
 [9]: http://photobucket.com/faq?catID=29&catSelected=f&topicID=321
 [10]: http://developer.yahoo.com/yui/articles/hosting/
 [11]: http://developer.yahoo.com/yui/3/configurator/
 [12]: http://code.google.com/apis/ajaxlibs/documentation/
 [13]: http://www.slideshare.net
 [14]: http://www.slideshare.net/nzakas/
 [15]: http://aws.amazon.com/s3/
 [16]: http://aws.amazon.com/s3/#pricing
 [17]: http://www.littletonville.com/asd/2008/06/twitter-uses-amazons-s3-for-pr.html
