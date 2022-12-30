---
title: The performance of localStorage revisited
author: Nicholas C. Zakas
permalink: /blog/2012/04/25/the-performance-of-localstorage-revisited/
categories:
  - Web Development
tags:
  - JavaScript
  - localStorage
  - Performance
---
Now a few weeks removed from a large amount of hand-ringing around the performance of `localStorage` in browsers, I've learned some more about why there was such a concern at Mozilla (which prompted Chris to write his blog post<sup>[1]</sup>). The post was met with skepticism because it lacked two key components: numbers and a comparison. The assertion was that `localStorage` is slow, but there was no data to back it up.

Wanting to get to the bottom of it, I<sup>[2]</sup> and John Allsopp<sup>[3]</sup> wrote blog posts trying to provide numbers around `localStorage`. John's post focused on quantifying the amount of time it takes to perform a single read and a single write, which gave us good initial numbers for these operations. My post focused on comparing `localStorage` reads and writes to cookie reads and writes from JavaScript. My theory was that cookies are the closest appromixation of `localStorage` due to the fact that its contents are stored on disk and are shared by all tabs pointing to the same origin. Both John and I concluded by saying that `localStorage` doesn't have an appreciably bad affect on performance either as an aggregate rating or in comparison to cookies. 

## More details

Subsequent to that, I started a conversation with Jonas Sicking from Mozilla, who actually worked on the `localStorage` implementation for Firefox and so has a unique perspective. He started from the position that there is a performance problem and I started from the position that there is not, based on the numbers from John and I. Jonas pointed out a key piece of information I wasn't aware of: the performance issue isn't with individual reads and writes, it's with the initial read into memory.

Firefox starts out by reading all of the data from `localStorage` into memory for the page's origin. Once the data is in memory, reads and writes should be relatively fast (though they do still appear slower than reading and writing to a native JavaScript object &#8211; not sure why), so our measuring of reads and writes doesn't capture the full picture. Jonas' assertion is that reading the data from `localStorage` on page load is the concern.

As Jonas kept telling me (and finally it stuck), the real problem with `localStorage` is that it's a synchronous API, which makes the implementors decide between a limited number of options. One option is to load all the data as the page is loading, but that has a side effect of slowing down initial page load because JavaScript using `localStorage` can't execute until the data for `localStorage` has been completely read. That means a large amount of data in `localStorage` could actually increase page load time because JavaScript needs to wait before executing.

The other option isn't much better. If you were to wait until the first time `localStorage` was used, it would require a full (blocking) stop while the data was read from disk initially. Once again, this could be noticeable if there's a large amount of data on disk. What's more, you could argue that a delay on calling `localStorage.getItem()` is unexpected, because there is an assumption that you're already working in memory and so the operation should be fast. This is why Firefox loads the data on page load.

In reality, this becomes the same problem as cookies. Cookies are stored on disk and read into memory upon page load as well. The difference is in the size of the data. Cookies are still fairly limited in size (around 4KB) where `localStorage` is much large (5MB). Of course, reading a 5MB file from the file system will be faster than downloading it over the internet, but who's to say if it would significantly affect page load time?

## Benchmarks?

I tried to run some benchmarks but was met with a technical limitation: no one is sure if our current testing tools are accurately taking the initial `localStorage` read into account. Without that information, it's hard to know whether or not `localStorage` is actually a performance problem for initial page load. It definitely isn't a performance issue for reads and writes after the fact (though it doesn't come without some cost, as noted previously). 

## A new API?

The call to create a new API to replace `localStorage` seems a bit permature, but is basically centered around three main ideas:

  1. The browser shouldn't need to read a large amount of data from disk on page load.
  2. The read from disk should be asynchronous and not block the UI thread.
  3. The developer should be able to indicate when the read should happen.

This led Jonas to suggesting several alternatives APIs on Chris' original post. The one I like the best is this:

    getBetterLocalStorage(function(storage) {
        x = storage.foo;
        storage.bar = calculateStuff(y);
        storage.baz++;
    });

Ignoring the name, the `getBetterLocalStorage()` function signals the browser that it's time to read everything into memory, so the `storage` object can be used as any other object. Once the callback function is finished executing, the changes would be written back to disk. Though I'm not ready to throw out `localStorage` completely, I do like the direction of this API. In fact, it closely follows a proposal I made for improving `localStorage` with expiration dates and encryption.<sup>[4]</sup>

## Conclusion

Whether or not `localStorage` is a performance issue on page load is still a question. It's hard for to know for sure if this is a real issue until we can get some good benchmarks from browsers. Unfortunately, this will likely have to come from browser developers who can look at the code and figure out whether `localStorage` is already being accounted for, and if not, how to measure it. 

In the meantime, IndexedDB is definitely *not* a suitable replacement for `localStorage` in almost every case. IndexedDB could be used, as Jonas pointed out, to create a solution similar to the one he proposed. However, it's still a bit of overhead to write that out. My advice: don't worry too much about `localStorage` for now&#8230;but don't go storing 5MB of data in it either, just in case.


  1. [There is no simple solution for localStorage][1] by Chris Heilmann
  2. [In defense of localStorage][2] by Me
  3. [localStorage, perhaps not so harmful][3] by John Allsopp
  4. [Towards more secure client-side data storage][4] by Me

 [1]: http://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/
 [2]: {{site.url}}/blog/2012/03/07/in-defense-of-localstorage/
 [3]: http://www.webdirections.org/blog/localstorage-perhaps-not-so-harmful/
 [4]: {{site.url}}/blog/2010/04/13/towards-more-secure-client-side-data-storage/
