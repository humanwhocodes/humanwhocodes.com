---
title: In defense of localStorage
author: Nicholas C. Zakas
permalink: /blog/2012/03/07/in-defense-of-localstorage/
categories:
  - Web Development
tags:
  - JavaScript
  - localStorage
  - Performance
---
Earlier this week, Chris Heilmann wrote a blog post entitled, <cite>There is no simple solution for localStorage</cite><sup>[1]</sup> in which he decried `localStorage` as slow and encouraged everyone to stop using it. Surprisingly, in a post about performance, there was no mention of what &#8220;slow&#8221; or &#8220;terrible performance&#8221; actually meant. Performance can't be discussed in a vacuum, which is part of what made my reaction to his post one of confusion more than anything else.

## What is slow?

So does `localStorage` have a performance problem? Quite simply, I don't know. Is storing and retrieving data from `localStorage` slower than that of a regular, in-memory object? Yes. I wrote a post about this for 2011 Performance advent calendar<sup>[2]</sup>. In fact, it's quite a bit slower when reading data out. My conclusion was that you should try to limit reads by storing multiple pieces of data in the same key. But as with most performance metrics, this really only matters when you're performing the same operation multiple times in a row. If you're only ever reading one value or writing one value, you'll likely never run into a performance issue regardless of the data size or what's going on with your system.

So `localStorage` is slower than using an in-memory object. Cars are slower than airplanes. What does that tell us? Not a whole lot.

## Pain points

The fact of the matter is that `localStorage` reads from and writes to disk, which is always slower than an in-memory operation because there's hardware involved. That's the first problem. The second problem is the per-origin nature of `localStorage`. This characteristic means that two browser windows or tabs open to the same origin can both be reading from or writing to the same `localStorage` at the same time. That, in turn, means the browser needs to be incredibly smart about how it performs each operation. If tab A is writing to `localStorage` around the same time that tab B is reading from `localStorage`, which operation should happen first?

Each operation, read and write, then needs to lock `localStorage` to ensure data integrity. This is actually a big issue. Interacting with files is also dicey since another system process might also be working the same file. Consider a simple write operation:

    localStorage.setItem("foo", "bar");

This operation is synchronous, meaning that the UI thread is blocked in the browser until the write is complete. No further JavaScript will execute and no further UI updates drawn. During this one method call, several things happen:

  1. If `localStorage` is busy with another window or tab, then wait. This is problematic since there's no way to know how long this will be.
  2. If the file is busy, then wait. The files may be scanned by antivirus, be included in a backup job, etc., and may therefore be unavailable until such operations complete. This is also problematic because it's unpredictable.
  3. Open the file for writing.
  4. Seek the right spot to write to the file.
  5. Write to the file.
  6. Close the file.

Only after all of that completes can the browser continue on to execute other statements. So really, the issue isn't that `localStorage` is slow, it's that `localStorage` must necessarily block on each operation to maintain data integrity.

## Compared to cookies

The closest comparable API for JavaScript is the cookie API (though calling `document.cookie` an API is incredibly generous). Cookies are also name-value pairs, albeit with some additional metadata, which uses files as storage and must be synchronized across browser windows and tabs. I was surprised that Chris didn't compare `localStorage` to cookies since the API was clearly meant to move us from storing client-only data in cookies to storing it in `localStorage`. It's no accident that the `localStorage` API looks a lot like various cookie APIs.

When I created a benchmark<sup>[3]</sup> to test `localStorage` against cookies for reading and writing, the results were quite interesting. Internet Explorer, Chrome, and Safari (including iOS), reading cookies was slower than reading from  `localStorage` and writing to cookies was much slower than writing to `localStorage`. Firefox and Opera exhibit the same performance characteristics on writes as the others (with cookies being slower), but reading from a cookie is faster. So in many cases across browsers, `localStorage` is actually a *performance improvement* over using cookies with JavaScript.

## APIs

The reason `localStorage` is popular is partly due to its simplicity. That simplicity is by design and was first designed and implemented by browser vendors, which is why it seems strange that a browser vendor would now lead the charge against an API it had a hand in creating. Yes, humans create browsers and humans can make mistakes, but I don't think the design of `localStorage` is a mistake.

As I was reading over Chris' plea to look for alternatives, my engineer brain kept repeating to myself, &#8220;this is an implementation issue, not an interface issue&#8221;. Firefox is choosing to preload the `localStorage` data to improve read performance later, but that's an implementation issue. Likewise, the need to read and write synchronously is an implementation issue &#8211; many forget that Internet Explorer 8&#8242;s implementation of `localStorage` actually wrote asynchronously. That an implementation-specific detail. Why not make all writes happen asynchronously and just keep a copy of the data in memory so it can always be read correctly regardless of the write state?

I'm not saying that this is necessarily an easy problem to solve; what I am saying is that the API design works well for developers, and for that reason it's worth looking at the implementation details to figure out if there's an efficient way to hide the warts of the system from web developers.

The proposed alternative, IndexedDB, is perhaps one of the worst API designs I've ever seen. To read and write a single piece of data requires way too many lines of code, ensuring that the API won't be used by most developers until someone comes up with a library to abstract away the horribleness. I understand the rationale behind providing such a low-level, asynchronous API (I was even part of the discussions held at Mozilla around web databases), but this absolutely stinks of browser developers creating an API that's easy to implement rather than creating an API that's easy to consume. This is the opposite of how good APIs are made. IndexedDB will never be a replacement for `localStorage`, it's just too complicated for most uses.

## Non-blocking localStorage

As discussed previously, the real issue is that `localStorage` blocks on reads and writes, and the amount of time it blocks can't be determined ahead of time. If this turns out to be a concern for you (after benchmarking, of course), then the solution is to use a non-blocking  `localStorage `mechanism. When you hear the term &#8220;non-blocking&#8221; these days, you should immediately be thinking about Web Workers.

In the near future, I believe that client-side architectures that perform I/O should perform all of that I/O in Web Workers. That means all of your `localStorage`, XMLHttpRequest, Web Socket, etc., I/O should be done inside of a worker. Basically, you should be able to do something like this:

    var worker = new Worker("io.js"); 
    
    worker.postMessage({ 
        type: "write", 
        src: "localStorage", 
        key: "foo", 
        value: "bar"  
    }); 
    
    worker.postMessage({ 
        type: "read", 
        src: "localStorage", 
        key: "foo" 
    }); 
    
    worker.onmessage = function(event) { 
        alert(event.data.value); 
    };

All of the reading and writing would be done off of the UI thread, so blocking really doesn't matter. I know I'm not alone in thinking this is the way of the future as the IndexedDB spec has a whole section on synchronous APIs available in workers<sup>[5]</sup>. Having synchronous APIs for IndexedDB makes it less horrible to deal with, but you need to use them in a worker. This hasn't been implemented by all browsers yet, but should be coming soon. Add to that the concept of shared workers, web workers that are shared amongst all tabs with pages from the same origin, and you have a great recipe for resolving a lot of I/O issues.

Workers currently have access to `XMLHttpRequest`, Web Sockets, File Readers, and the such&#8230;and yet no access to `localStorage`. Why? This is really the solution to the problem: don't throw away a great API because in some cases it will cause issues. Instead, make it available in workers so that we have an option for moving the reading/writing off of the UI thread.

Note: It's possible that the cross-domain `localStorage` approach I wrote about previously<sup>[6]</sup> might provide some non-blocking benefits. The cross-frame postMessage() API is asynchronous, but I've not figured out a good way to test if the containing page freezes if an iframe from the same domain accesses `localStorage` .

## Conclusion

Asking web developers to give up `localStorage` is ridiculous. Are there problems with the API? Yes, indeed there are. Are they bad enough to abandon using it altogether? Absolutely not. Claims of terrible performance haven't been substantiated. Despite the complaints of browser developers as to the technical difficulties, there are no good alternatives to `localStorage`. We could always go back to using cookies, but as the previous benchmark shows, that doesn't necessarily guarantee better performance. And IndexedDB is a non-starter because the API is too complex for most use cases.

So to Mozilla, and the other browser vendors out there, you're a victim of your own success. You wanted to create an API that could be used in place of cookies for storing client-side data, and you created something great. The interface is friendly to web developers and that's why it's had such rapid adoption. You're all quite smart, capable people and I'm sure you can come up with better ways to implement the API than what we have today. And also, make `localStorage` accessible in Web Workers, please.

**Update (8 March 2012):** Fixed typos and added shared worker reference.


  1. [There is no simple solution for localStorage][1] by Chris Heilmann
  2. <a title="Permanent Link to localStorage Read Performance" href="http://calendar.perfplanet.com/2011/localstorage-read-performance/" rel="bookmark">localStorage Read Performance</a> by Nicholas C. Zakas
  3. [localStorage vs. cookies][2] by Nicholas C. Zakas
  4. [Introduction to Web Storage][3] by MSDN
  5. [Indexed Database &#8211; Synchronous APIs][4]
  6. [Learning from XAuth: Cross-Domain localStorage][5] by Nicholas C. Zakas

 [1]: http://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/
 [2]: http://jsperf.com/localstorage-vs-objects/19
 [3]: http://msdn.microsoft.com/en-us/library/cc197062(v=vs.85).aspx
 [4]: http://www.w3.org/TR/IndexedDB/#sync-database
 [5]: {{site.url}}/blog/2010/09/07/learning-from-xauth-cross-domain-localstorage/
