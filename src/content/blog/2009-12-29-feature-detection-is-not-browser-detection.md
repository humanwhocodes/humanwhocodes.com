---
title: Feature detection is not browser detection
author: Nicholas C. Zakas
permalink: /blog/2009/12/29/feature-detection-is-not-browser-detection/
categories:
  - Web Development
tags:
  - Browser Detection
  - Feature Detection
  - JavaScript
---
Browser detection has been a hot-button topic in web development for a long time. This battle pre-dates JavaScript browser detection by a couple of years and begins with the introduction of Netscape Navigator, the first truly popular and widely-used web browser. Netscape Navigator 2.0 was so far beyond any of the other available web browsers that web sites began looking for its specific user-agent string before returning any useful content. This forced other browser vendors, notably Microsoft, to include things in their user-agent string to get around this form of browser detection. A very hairy situation, indeed.

## Feature detection

Since that time, web developers repeatedly rant that browser detection, specifically user-agent sniffing, is a horrible practice that should never be considered. The argument is that the code isn't &#8220;future proof&#8221; and will have to be changed when newer browsers appear. The preferred approach, the chorus echoes, is feature detection. So instead of doing something like this:

    if (navigator.userAgent.indexOf("MSIE 7") > -1){
        //do something
    }

You should do something like this:

    if(document.all){
        //do something
    }

There is a distinction between these two approaches. The first is testing for a specific browser by name and version while the second is testing for a specific feature/capability. So user-agent sniffing results in knowing the exact browser and version being used (or at least, the one being reported by the browser) while feature detection determines if a given object or method is available. Note that these are two completely different results.

Because feature detection doesn't rely on knowledge of which browser is being used, only on which features are available, it is trivial to ensure support in new browsers. For instance, when the DOM was young, not all browsers supported `getElementById()`, and so there was a lot of code that looked like this:

    if(document.getElementById){  //DOM
        element = document.getElementById(id);
    } else if (document.all) {  //IE
        element = document.all[id];
    } else if (document.layers){  //Netscape < 6
        element = document.layers[id];
    }

This is a good and appropriate use of feature detection because the code tests for a feature and then, if it's there, uses it. The best part about this code is that as other browsers began implementing `getElementById()`, the code didn't have to change; support for the new browsers was baked-in using feature detection.

## The mixup

Somewhere along the lines, a lot of web developers grew confused about the distinction between the two approaches. Code started being written similar to this:

    //AVOID!!!
    if (document.all) {  //IE
        id = document.uniqueID;
    } else {
        id = Math.random();
    }

The problem with this code is that a test for `document.all` is used as an implicit check for IE. Once knowing that the browser is IE, the assumption is that it's safe to use `document.uniqueID`, which is IE-specific. However, all you tested was whether or not `document.all` is present, not whether the browser is IE. Just because `document.all` is present doesn't mean that `document.uniqueID` is also available. There's a false implication that can cause the code to break.

As a clearer statement of this problem, people started replacing code like this:

    var isIE = navigator.userAgent.indexOf("MSIE") > -1;

With code like this:

    var isIE = !!document.all;

Making this change indicates a misunderstanding of &#8220;don't use user-agent sniffing.&#8221; Instead of looking for a particular browser, you're looking for a feature and then *trying to infer* that it's a specific browser, which is just as bad. This is called feature-based browser detection and is a very bad practice.

Somewhere along the line, developers realized that `document.all` was not, in fact, the best way to determine if a browser was Internet Explorer. Then you started seeing code such as this:

    var isIE = !!document.all && document.uniqueID;

This approach falls into the &#8220;too clever&#8221; category of programming. You're trying too hard to identify something by describing an increasing number of identifying aspects. What's worse, there's nothing preventing other browsers from implementing the same capabilities, which will ultimately make this code return unreliable results.

If you think such code isn't being used widely, think again. The following snippet comes from [MooTools][1] 1.1.2 (note, the current version is 1.1.4, so this is from an older version):

    //from MooTools 1.1.2
    if (window.ActiveXObject) window.ie = window[window.XMLHttpRequest ? 'ie7' : 'ie6'] = true;
    else if (document.childNodes && !document.all && !navigator.taintEnabled) window.webkit = window[window.xpath ? 'webkit420' : 'webkit419'] = true;
    else if (document.getBoxObjectFor != null || window.mozInnerScreenX != null) window.gecko = true;

Note how the code tries to determine which browser is being used based on feature detection. I can point out any number of problems with this, aside from philosophical, but the most glaring is that `window.ie` will report IE 8 as IE 7. Big problem.

## Why doesn't this work?

To understand why feature-based browser detection doesn't work, you need only look back to high school math class, where logic statements are typically taught as part of geometry. Logic statements are made up of a hypothesis (p) and a conclusion (q) in the form &#8220;if p then q&#8221;. You can try altering the statement form to determine truths. There are three ways to alter the statement:

  * Converse: if q then p
  * Inverse: if not p then not q
  * Contrapositive: if not q then not p

There are two important relationships among the various forms of the statement. If the original statement is true, then the contrapositive is also true. For example, if the original statement was &#8220;If it's a car, then it has wheels&#8221; (which is true) then the contrapositive, &#8220;if it doesn't have wheels then it's not a car,&#8221; is also true.

The second relationship is between the converse and the inverse, so if one is true then the other must also be true. This logically makes sense because the relationship between converse and inverse is the same as between original and contrapositive.

Perhaps more important than these two relationships are the relationships that don't exist. If the original statement is true, then there is no guarantee that the converse is true. This is where feature-based browser detection falls apart. Consider the true statement, &#8220;if it's Internet Explorer, then document.all is implemented.&#8221; The contrapositive, &#8220;if document.all is not implemented, then it's not Internet Explorer&#8221; is also true. The converse, &#8220;if document.all is implemented, then it's Internet Explorer&#8221; is not strictly true (for example, Opera implements it). Feature-based detection assumes that the converse is always true when, in fact, there is no such relationship.

Adding more parts to the conclusion doesn't help either. Consider once again the statement, &#8220;if it's a car, then it's has wheels.&#8221; The converse is obviously false, &#8220;if it has wheels, then it's a car&#8221;. You could try making it more precise: &#8220;if it's a car, then it has wheels and requires fuel.&#8221; Check the converse: &#8220;if it has wheels and requires fuel, then it's a car.&#8221; Also not true because an airplane fits that description. So try again: &#8220;if it's a car, then it has wheels, requires fuel, and uses two axles.&#8221; Once again, the converse isn't going to be true.

The problem is fundamental to human language: it's very hard to use a collection of singular aspects to define the whole. We have the word &#8220;car&#8221; because it implies a lot of aspects that we'd otherwise have to list to identify that thing in which you drive to work. Trying to identify a browser by naming more and more features is the exact same problem. You'll get close, but it will never be a reliable categorization.

## The fallout

MooTools backed themselves, and their users, into a corner by opting for feature-based browser detection. Mozilla has warned since Firefox 3 that the `getBoxObjectFor()` method was deprecated and would be removed in a future release. Since MooTools relies on this method to determine if the browser is Gecko-based, Mozilla's removal of this method in the upcoming Firefox 3.6 release means that anyone running older versions of MooTools may have their code impacted. This prompted MooTools to issue a [call to upgrade][2] to the most recent version, which has the issue &#8220;fixed.&#8221; The explanation:

> We have overhauled our browser detection to be based on the user agent string. This has become the standard practice among JavaScript libraries because of potential issues as Firefox 3.6 demonstrates. As browsers grow closer together, looking at â€œfeaturesâ€ to separate them will become more difficult and risky. From this point forward, browser detection will only be used where it would be impossible not to, in order to give the consistent experience across browsers that one would expect from a world-class JavaScript framework.

Curiously, a quick look at MooTools 1.2.4 still shows feature-based browser detection using `getBoxObjectFor()`:

    //from MooTools 1.2.4
    var Browser = $merge({
    
    	Engine: {name: 'unknown', version: 0},
    
    	Platform: {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()},
    
    	Features: {xpath: !!(document.evaluate), air: !!(window.runtime), query: !!(document.querySelector)},
    
    	Plugins: {},
    
    	Engines: {
    
    		presto: function(){
    			return (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925));
    		},
    
    		trident: function(){
    			return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6 : 5) : 4);
    		},
    
    		webkit: function(){
    			return (navigator.taintEnabled) ? false : ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525 : 420) : 419);
    		},
    
    		gecko: function(){
    			return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false : ((document.getElementsByClassName) ? 19 : 18);
    		}
    
    	}
    
    }, Browser || {});

The usage of `getBoxObjectFor()` is slightly different. In effect, the approach has changed from using the converse to using the contrapositive. The problem with this change is that you can only positively *not* identify the browser. And once again, testing for a newly-removed method doesn't really help.

## What to do?

Feature-based browser detection is a very bad practice that should be avoided at all costs. Straight feature detection is a best practice, and in almost every case, is exactly what you'll need. Typically, you just need to know if a feature is implemented before using it. Don't try to infer relationships between features because you'll end up with false positives or false negatives.

I won't go so far as to say never use browser detection based on user-agent sniffing, because I do believe there are valid use cases. I don't believe, however, that there are a lot of valid use cases. If you're thinking about user-agent sniffing, keep this in mind: the only safe way to do so is to target a specific version of a specific browser. Trying to detect a range of browser versions is dangerous, fragile, and likely to break if the upper bound of the range is the most recent version of the browser. It's also advisable to target a specific version that is *not the most recent version*. Why? Because you want to identify differences, and the easiest way to do that is to look backwards towards previous versions rather than trying to look forward at non-existent future versions. This also serves to protect your code from the future. The goal should always be to write code that won't break when an unknown browser begins running it.

Note: if you're considering user-agent sniffing, I wouldn't recommend worrying about user-agent spoofs. You should always honor exactly what the browser is reporting as a user-agent. My approach has always been that if you tell me you're Firefox, I expect that you act like Firefox. If the browser identifies itself as Firefox and doesn't act like Firefox, that's not your fault. There's no point in trying to second-guess the reported user-agent string.

So the recommendation is to always use feature detection whenever possible. If it's not possible, then fallback to user-agent sniffing browser detection. Never, ever use feature-based browser detection because you'll be stuck with code that isn't maintainable and will constantly require updating and changing as browsers continue to evolve.

## Apologies

I really didn't mean to pick on MooTools when I first started writing this post. It just happens to present a really good learning opportunity for other developers. The MooTools developers are smart folks who I'm sure are continuing to work to improve their library and actively support their large user base. We all go through a similar learning curve, and we can all learn from one another.

 [1]: http://www.mootools.net/
 [2]: http://mootools.net/blog/2009/11/02/upgrade-mootools/
