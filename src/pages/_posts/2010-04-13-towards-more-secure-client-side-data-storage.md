---
title: Towards more secure client-side data storage
author: Nicholas C. Zakas
permalink: /blog/2010/04/13/towards-more-secure-client-side-data-storage/
categories:
  - Web Development
tags:
  - JavaScript
  - localStorage
  - Security
---
Last year, I started digging into the various client-side data storage alternatives that had popped up as a result of HTML5. These included `sessionStorage`, `localStorage`, and client-side databases. Though I was glad to see movement in this direction, I was unhappy with some of the results. I started my exploration around `sessionStorage`, and even though it is severely limited, I thought it was very useful and nicely wrapped up some of the security issues related to storing data client-side (see the [full blog post][1] for more). I was not, and still am not, a fan of SQL on the web as the solution of structured data storage, and I'm glad to see the folks at Microsoft and Mozilla moving in another direction.

That being said, I started looking at `localStorage`. Truly, this is a grand idea: a persistent storage area shared by all browser windows (or tabs) and tied to a specific domain. I know there's a lot of dislike amidst browser vendors around this feature due to the complexities of cross-process data management, but my problems with the API have to do with how little control one has over the data.

## The problems

There are two major problem the data storage mechanism in `localStorage`:

  1. The data is stored on unencrypted on disk. That means anyone with access to the computer can potentially get access to that data.
  2. The data remains on disk until either the site removes it or until the user explicitly tells the browser to remove it. That means the data may remain on disk permanently otherwise.

These are problems because they both increase the likelihood that the data can be examined by those for whom it is not intended.

Suppose I'm running one of the major webmail clients and would like to improve the site's performance by storing information about the customer emails in localStorage. That way, you can speed up the site's startup time and only download the new email information. (By the way, this is a really bad idea, please don't do this.) Now suppose you log off and close the browser. Your email data is still saved on disk because the webmail client didn't delete it when you left. Not a big deal if it's your personal laptop; huge deal if it's a computer in a cybercafe. Imagine if in that cyber cafe, twenty other people end up using the same computer to access the same webmail client and all of their data ends up stored on disk when they leave. Big problem.

You may be asking yourself, &#8220;wouldn't encrypting the data solve that problem?&#8221; Yes and no. You could suggest that localStorage always encrypt data when it writes to disk but then it would end up being standard encryption algorithm and standard key. While this would provide a bit of a moat around the data, it would also be easy to figure out the browser's choice in cipher and key, forcing browser vendors to either be incredibly clever in how they encrypted data to disk or to change the data storage method frequently. (Imagine if someone figured it out and posted the details on the web, there would have to be a mad rush to update the affected browser to ensure secure data.)

Don't get me wrong, for publicly available data, there's no reason not to use `localStorage`. But for anything even remotely personal to the user, you're placing personal data into an area that is too easily accessed.

## The solution

I don't believe that there's a clear path forward for `localStorage` to make it more secure. It's out there, people are using it, and changing the API now would be a huge problem. When I brought these issues up at the Mozilla Summit on data storage, what I heard most frequently was, &#8220;if you can think of some way to solve this, write it up and we'll talk.&#8221; And so I sat down and wrote a proposal for secure key-value storage in browsers called [SecureStore][2].

The proposal is based on a few simple concepts that are shared amongst security-conscious companies:

  1. User data should not be stored on disk unencrypted.
  2. Even when user data is stored encrypted, the company must control the encryption algorithm and key.
  3. User data, even when encrypted, should not persist on disk forever.

These rules have traditionally applied to servers and server-side caches, but seems logical enough to extend to client-side data storage in browsers.

I tried to keep most of the API similar to the already existing client-side data storage APIs so as to not introduce something totally different. One big difference, though, is the way in which you access a storage object. To do so, you must call the openSecureStorage() method and pass in an encryption cipher, a base64-encoded key, and a callback function that will receive the storage object:

    window.openSecureStorage("mystorage", window.AES_128, key, function(storage){
       //use storage object
    });

This code will do one of two things. If the storage area named &#8220;mystorage&#8221; doesn't exist, it will be created and the given cipher and key will be used whenever data is written to it. An empty `SecureStorage` object is then passed into the callback function. If the storage area does exist, then it is opened, the contents decrypted, and the data is made available on the `SecureStorage` object. Note that the storage areas are tied to a domain, and there is no limit on the number of storage areas for a particular domain (only a limit on the total amount of space a domain can use).

Once you have a `SecureStorage` object, you can use the `length` property to determine how many key-value pairs are available, and all of the standard storage methods are also there:

  * `getItem(key)` &#8211; retrieves the value for the given key or null if the key doesnâ€™t exist.
  * `setItem(key, value)` &#8211; sets the value for the given key.
  * `removeItem(key)` &#8211; removes the key completely.
  * `key(position)` &#8211; returns the key for the value in the given numeric position.
  * `clear()` &#8211; removes all key-value pairs.

Note that you must use `getItem()`, `setItem()`, and `removeItem()` for manipulating keys; keys don't automatically become properties on a `SecureStorage` object. Other than that difference, you use a `SecureStorage` object the same as you would `sessionStorage` or `localStorage`. Also, both the keys and the values are encrypted on disk.

An additional method called `setExpiration()` is present on the `SecureStorage` object as well. This method allows you to pass in a `Date` object indicating when the data should be deleted. For example:

    window.openSecureStorage("mystorage", window.AES_128, key, function(storage){
    
        storage.setItem("username", "Nicholas");
        storage.setItem("super_secret_value", "unicorn");
    
        //set expiration for a year from now
        var expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
    
        storage.setExpiration(expires);
    });

You can set the expiration date any number of times to extend the life of the data.

The API is purposely made a bit generic, so that it's possible to add additional encryption ciphers easily and to allow the developer to control from where the encryption key is generated. This may be done by the server in some cases, or potentially from some as-yet-undefined API that browser vendors will create in the future. The point is to allow easy extension as web technology continues to evolve.

## Why?

One of the most frequent questions I get about this proposal is whether it would be better to create a general JavaScript crypto API that could be used in conjunction with localStorage rather than creating an entirely new data storage solution. First, I'll say that I think a native JavaScript crypto API would be great and I'm all for it. What I'm looking to avoid, however, is needing to write code like this:

    //write name and value so they're both encrypted
    localStorage.setItem(AES.encrypt("username", key), AES.encrypt("Nicholas", key));
    
    //retrieve the encrypted username
    var username = AES.decrypt(localStorage.getItem(AES.encrypt("username", key)), key);

I'm not sure if this looks as messy to you as it does to me, but it seems like this is a common enough pattern that having a native implementation that prevents us from writing such horrid code is a good idea.

## Let's make this real

There are a lot more details on the [full proposal][2], but I wanted to give some highlights in this post. I've received favorable feedback from at least one browser vendor on this proposal, and now I need help to make this real. What I really need is more feedback from people. I've already picked the brain of coworkers, and now I'd like to open it up to the public. What I'm interested in:

  * Implementers: is there anything about this API that makes it too difficult to implement?
  * Web developers: Do you have a use case that this would address?
  * Web developers: Is there anything you'd change about the API?
  * Everyone: Anything else?

If you're a contributor to an open source browser, I'm also looking for someone that's interested in prototyping this API for use in WebKit and/or Gecko. Feel free to [contact me][3] if you're interested or have other feedback that you don't want to post publicly.

 [1]: {{site.url}}/blog/2009/07/21/introduction-to-sessionstorage/
 [2]: {{site.url}}/blog/securestore-proposal/
 [3]: {{site.url}}/contact/
