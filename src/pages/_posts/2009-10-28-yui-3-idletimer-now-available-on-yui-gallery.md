---
title: YUI 3 IdleTimer now available on YUI Gallery
author: Nicholas C. Zakas
permalink: /blog/2009/10/28/yui-3-idletimer-now-available-on-yui-gallery/
categories:
  - Web Development
tags:
  - Idle
  - JavaScript
  - Timer
  - YUI
---
Today, YUI engineer [Dav Glass][1] introduced the [YUI Gallery][2] at [YUIConf][3].Â  The YUI Gallery is a place for YUI users and developers to share their work. You can create your own YUI 3 modules, submit them for review, and have them appear in the gallery. As an added bonus, submissions are eligible to be distributed on the Yahoo! CDN so that others can enjoy your work. Contributed modules have spots for all kinds of information and can be covered by any number of licenses.

Dav invited me to make some contributions for the launch, and immediately I thought of the IdleTimer I introduced in my post, [Detecting if the user is idle with JavaScript and YUI 3][4]. I had to make a few changes to comply with the gallery&#8217;s posting rules, but the functionality remains unchanged.

## The changes

The biggest change to the IdleTimer is in the module name. All gallery modules must begin with &#8220;gallery-&#8221; to disambiguate from standard YUI modules and ensure unique naming. Thus, the IdleTimer&#8217;s module name was changed from &#8220;idle-timer&#8221; to &#8220;gallery-idletimer&#8221;.

The source code of the file also remains roughly the same. The only change is that it now uses the standard YUI build system to generate the distributed JavaScript file. That means the generic nomenclature for adding the `YUI.add()` wrapper is handled automatically and three versions of the file are generated: a debug version, which is nicely formatted for viewing and has log statements included, a clean source code version without log statements, and a minified version. Overall, the resulting code is exactly the same as the original version, excluding the YUI module name.

## Usage

The most exciting change is that the IdleTimer code is now available on the Yahoo! CDN. That means you can automatically load the file remotely using the `YUI().use()` method and it will automatically pull in the appropriate dependencies for you. Basic usage is as follows:

    YUI({
    
        //define a custom module
        modules: {
            'gallery-idletimer': {
                fullpath: 'http://yui.yahooapis.com/gallery-2009.10.28-14/build/gallery-idletimer/gallery-idletimer-min.js',
                requires: ["event","event-custom"],
                optional: [],
                supersedes: []
            }
        }
    }).use('gallery-idletimer', function(Y) {
    
        Y.IdleTimer.subscribe("idle", function(){
            //handle when the user becomes idle
        });
    
        Y.IdleTimer.subscribe("active", function(){
             //handle when the user becomes active
        });
    
        //start the timer with a default timeout of 30s
        Y.IdleTimer.start();
    });

Note the module definition of &#8220;gallery-idletimer&#8221; at the beginning is the part that lets YUI autoload the correct resources by just calling `YUI().use("gallery-idletimer")`. The YUI Gallery build system automatically generates this code as an example along with the CDN URL.

## More information

The [IdleTimer on YUI Gallery][5] page has all of the information you need to get started. You can download the source code either from the [YUI Gallery GitHub][6] location or my [JSTools GitHub][7] project. Dav has also written up a [great tutorial][8] on how to submit to the YUI Gallery.

 [1]: http://blog.davglass.com/
 [2]: http://www.yuilibrary.com/gallery
 [3]: http://yuilibrary.com/yuiconf2009/
 [4]: {{site.url}}/blog/2009/06/02/detecting-if-the-user-is-idle-with-javascript-and-yui-3/
 [5]: http://yuilibrary.com/gallery/show/idletimer
 [6]: http://www.github.com/yui/yui3-gallery/
 [7]: http://www.github.com/nzakas/jstools/\
 [8]: http://yuilibrary.com/gallery/developer
