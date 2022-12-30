---
title: Introduction to sessionStorage
author: Nicholas C. Zakas
permalink: /blog/2009/07/21/introduction-to-sessionstorage/
categories:
  - Web Development
tags:
  - HTML 5
  - JavaScript
  - sessionStorage
---
One of the most interesting parts of the recent browser evolution has been the explosive growth in the number of options for client-side data storage. Prior to this past year, our only viable cross-browser method of storing data on the client was [cookies][1]. Cookies have the downside of adding additional overhead to server requests and responses, but they do get the job done. HTML 5 introduced three new options for client-side data storage: `sessionStorage`, `localStorage`, and client-side databases. The first two, `sessionStorage` and `localStorage`, have since been split out into a separate [Web Storage][2] specification while client-side databases is covered in the [Web Database][3] specification. Of these three new client-side data storage options, I find `sessionStorage` the most interesting.

## What is sessionStorage?

The `sessionStorage` object exists as a property of the `window` object in supporting browsers (currently Firefox 3+, Safari 4+, and Internet Explorer 8+). You can place data onto the `sessionStorage` object and that data persists for as long as that window (or tab) is open. Even if you navigate away from the page that stored the data and then navigate back, the data saved to `sessionStorage` is still available. Any data stored in `sessionStorage` is tied to the protocol, hostname, and port of the page that saved the information and only pages sharing the same protocol, hostname, and port can access that data later.

Making things more interesting, `sessionStorage` is unique to a particular window or tab (what the specification refers to as a &#8220;top-level browsing context&#8221;). For instance, suppose you open [Yahoo! Mail][4] in two different tabs of your browser and the application saves some data in `sessionStorage`. The data from the first tab is not accessible to the second tab even though the protocol, hostname, and port are exactly the same. 

Data stored to `sessionStorage` is saved in key-value pairs where both the key and the value are strings. Non-string values are automatically converted into strings before being stored.

The data in `sessionStorage` is deleted once the window or tab is closed, or if the user requests that the browser do so. This behavior, combined with tying the data to a particular window or tab, ensures that data doesn't get accidentally exposed or stored indefinitely.

## Usage

The `sessionStorage` object has five methods:

  * `getItem(key)` &#8211; retrieves the value for the given key or null if the key doesn't exist.
  * `setItem(key, value)` &#8211; sets the value for the given key.
  * `removeItem(key)` &#8211; removes the key completely.
  * `key(position)` &#8211; returns the key for the value in the given numeric position.
  * `clear()` &#8211; removes all key-value pairs.

There is also a single property, `length`, which indicates how many key-value pairs are currently stored in `sessionStorage`. Some example usage:

    //save a value
    sessionStorage.setItem("name", "Nicholas");
    
    //retrieve item
    var name = sessionStorage.getItem("name");
    
    //get the key name for the first item
    var key = sessionStorage.key(0);
    
    //remove the key
    sessionStorage.removeItem(key);
    
    //check how many key-value pairs are present
    var count = sessionStorage.length;

Additionally, proper implementations allow you to read, write, and remove values from `sessionStorage` as if it were a regular object. For example:

    //save a value
    sessionStorage.name = "Nicholas";
    
    //retrieve item
    var name = sessionStorage.name;
    
    //remove the key
    delete sessionStorage.name;

This syntax is logically supported as this is the way objects are typically accessed in JavaScript.

When writing to `sessionStorage`, an error may be thrown to indicate that the write failed. The write may failed for any number of reasons but the most common being that the maximum data size has been hit. If you are saving large amounts of data to `sessionStorage`, it's best to wrap any writes with a `try-catch` to handle this error.

## The storage event

Whenever a change is made to `sessionStorage`, a `storage` event is fired on the `document` object. The event object for this event contains the following properties:

  * `key` &#8211; the key that was changed.
  * `oldValue` &#8211; the value before the operation.
  * `newValue` &#8211; the value after the operation.
  * `url` &#8211; the URL of the page that performed the operation.
  * `source` &#8211; the window object representing the owner of the `sessionStorage` object.

The specification is unclear as to whether this event should be fired for `sessionStorage` or not. My testing shows that Internet Explorer fires the event for `sessionStorage` but Firefox and Safari do not. If anyone has other details, please chime in.

## Browser differences

Even though `sessionStorage` is reasonably well-supported in browsers, including Firefox 3, Safari 4, and Internet Explorer 8, there are some differences in implementations to be aware of:

  * Firefox 3 returns an object when reading a value from `sessionStorage`. The object has a property named `value` that contains the actual string value that was stored. Firefox 3.5 correctly returns a string when retrieving values.
  * Firefox 3 doesn't implement the `clear()` method; Firefox 3.5 does.
  * Internet Explorer 8 doesn't allow you to remove a key by using the `delete` operator.
  * Firefox 3.5 is the only browser that maintains `sessionStorage` data when the browser crashes and makes it available when the browser is restarted after a crash.
  * Internet Explorer 8 saves data to s asynchronously while the others do so synchronously. To force IE to write immediately, call the proprietary `begin()` method, then make your changes, then call the proprietary `commit()` method.
  * Firefox's and Safari's storage limit is 5MB per domain, Internet Explorer's limit is 10 MB per domain.
  * Internet Explorer 8 only supports the `url` property of the `event` object.
  * Firefox 3 and 3.5 throw errors when you try to access `sessionStorage` if cookies are disabled on the browser ([bug][5]).

## Security issues

The reason I really like sessionStorage is that it keeps security in mind. By limiting data access to a single window or tab, tying that data to the protocol, domain, and port, and then deleting the data when the window or tab is closed, the implementation really makes sure that data can't be accessed in harmful ways. Still, there's one more security issue to worry about. To understand the issue, consider the following scenario.

You log into a web site to view your mail and the mail application saves information about those emails in `sessionStorage`. Then, you switch tabs to another window where you log out of the account from which your email is being read. This is very possible when using single sign-on IDs such as a Yahoo! ID (but please note this is just an example, Yahoo! doesn't actually do this). You then switch back to the email tab and your data is still present in `sessionStorage` even though you've logged out. Clicking on various email messages retrieves data from `sessionStorage` and displays it. You're now looking at personal information while logged out.

And even more dangerous situation occurs when you leave that computer without closing the browser and another user sits down in your place. With normal secure Ajax communication, your credentials are checked with each request and so this situation is avoided. If the data is in `sessionStorage`, there is no credential verification because there is no server request, which opens up this security issue.

If you are using `sessionStorage` for storage of personalized data, you need to verify the user's identity whenever the data is accessed for reading or writing. How do you do this? Most sign-in flows work by adding a specific cookie for the domain you're accessing so that you don't have to log in at each page. My recommendation is to take a snapshot of the cookie when the data is saved into `sessionStorage` and store that in `sessionStorage` along with the actual data. Then, every time you read to or write from `sessionStorage`, verify that the current value of the cookie is the same as the stored on. If there's any difference, delete all of the values from `sessionStorage`. Since all windows and tabs shared the same cookies, cookies are dynamically updated and available through JavaScript immediately. Example using [YUI 3][6]:

    function validateUser(){
        var currentCookie = Y.Cookie.get("login");
        if (currentCookie != sessionStorage.storedCookie){
            sessionStorage.clear();
            sessionStorage.storedCookie = currentCookie;  //reset
        }
    }
    
    function saveData(key, value){
        validateUser();
        sessionStorage[key] = value;
    }
    
    function getData(key){
        validateUser();
        return sessionStorage[key];
    }

With this code, you would use `saveData()` and `getData()` instead of accessing `sessionStorage` directly. Each method calls `validateUser()`, which checks the cookie called &#8220;login&#8221;. This approach assumes that the &#8220;login&#8221; cookie contains a unique hash for each user and is removed when the user logs out.

## Conclusion

The `sessionStorage` object is a really useful way to keep data on the client in a relatively secure way. Though there are some outstanding security issues as mentioned in the previous section, those are relatively easy to mitigate in comparison to the built-in protection that this system affords you. Especially in today's Web 2.0/Ajax world where browsers are often left open for inordinate amounts of time, caching data on the client using `sessionStorage` can dramatically improve the user's experience in browsers that support it.

 [1]: {{site.url}}/blog/2009/05/05/http-cookies-explained/
 [2]: http://dev.w3.org/html5/webstorage/
 [3]: http://dev.w3.org/html5/webdatabase/
 [4]: http://mail.yahoo.com/
 [5]: https://bugzilla.mozilla.org/show_bug.cgi?id=365772
 [6]: http://developer.yahoo.com/yui/3/
