---
title: Private instance members with weakmaps in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2014/01/21/private-instance-members-with-weakmaps-in-javascript/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - WeakMap
---
Last week I came across an article<sup>[1]</sup> by Nick Fitzgerald in which he described an approach for creating private instance members for JavaScript types using ECMAScript 6 weakmaps. To be completely honest, I&#8217;ve never been a big proponent of weakmaps &#8211; I thought there was a loss of fuss about nothing and that there was only one use case for them (tracking data related to DOM elements). I was still clinging tight to that belief up until the point that I read Nick&#8217;s article, at which point my weakmap belief system blew up. I now see the possibilities that weakmaps bring to JavaScript and how they will changes our coding practices in ways we probably can&#8217;t fully imagine yet. Except for the one that Nick mentioned, which is the focus of this post.

## The legacy of private members

One of the biggest downsides of JavaScript is the inability to create truly private instance members on custom types. The only good way is to create private variables inside of a constructor and create privileged methods that access them, such as:

    function Person(name) {
        this.getName = function() {
            return name;
        };
    }

In this example, the `getName()` method uses the `name` argument (effectively a local variable) to return the name of the person without ever exposing `name` as a property. This approach is okay but highly inefficient if you have a large number `Person` instances because each must carry its own copy of `getName()` rather than sharing a method on the prototype.

You could, alternately, choose to make members private by convention, as many do by prefixing the member name with an underscore. The underscore isn&#8217;t magic, it doesn&#8217;t prevent anyone from using the member, but rather serves as a reminder that something shouldn&#8217;t be used. For example:

    function Person(name) {
        this._name = name;
    }
    
    Person.prototype.getName = function() {
        return this._name;
    };

The pattern here is more efficient because each instance will use the same method on the prototype. That method then accesses `this._name`, which is also accessible outside of the object, but we all just agree not to do that. This isn&#8217;t an ideal solution but it&#8217;s the one a lot of developers rely on for some measure of protection.

There&#8217;s also the case of shared members across instances, which is easy to create using an immediately-invoked function expression (IIFE) that contains a constructor. For example:

    var Person = (function() {
    
        var sharedName;
    
        function Person(name) {
            sharedName = name;
        }
    
        Person.prototype.getName = function() {
            return sharedName;
        };
    
        return Person;
    }());

Here, `sharedName` is shared across all instances of `Person`, and every new instance overwrites the value with the `name` that is passed in. This is clearly a nonsensical example, but is an important first step towards understanding how to get to truly private members for instances.

## Towards truly private members

The pattern for shared private members points to a potential solution: what if the private data wasn&#8217;t stored on the instance but the instance could access it? What if there was an object that could be hidden away with all of the private info for an instance. Prior to ECMAScript 6, you&#8217;d so something like this:

    var Person = (function() {
    
        var privateData = {},
            privateId = 0;
    
        function Person(name) {
            Object.defineProperty(this, "_id", { value: privateId++ });
    
            privateData[this._id] = {
                name: name
            };
        }
    
        Person.prototype.getName = function() {
            return privateData[this._id].name;
        };
    
        return Person;
    }());

Now we&#8217;re getting somewhere. The `privateData` object isn&#8217;t accessible from outside of the IIFE, completely concealing all of the data contained within. The `privateId` variable stores the next available ID that an instance can use. Unfortunately, that ID needs to be stored on the instance, so it&#8217;s best to make sure it can&#8217;t be changed in any way, thus using `Object.defineProperty()` to set its initial value and ensure the property isn&#8217;t writable, configurable, or enumerable. That protects `_id` from being tampered with. Then, inside of `getName()`, the method accesses `_id` to get the appropriate data from the private data store and return it.

This approach is a pretty nice solution to the instance private data problem except for that ugly vestigial `_id` that is tacked onto the instance. This also suffers the problem of keeping all data around in perpetuity even if the instance is garbage collected. However, this pattern is the best we can do with ECMAScript 5.

## Enter weakmap

By adding a weakmap into the picture, the &#8220;almost but not quite&#8221; nature of the previous example melts away. Weakmaps solve the remaining problems of private data members. First, there is no need to have a unique ID because the object instance is the unique ID. Second, when an object instance is garbage collected, all data that is tied to that instance in the weakmap will also be garbage collected. The same basic pattern as the previous example can be used, but it&#8217;s much cleaner now:

    var Person = (function() {
    
        var privateData = new WeakMap();
    
        function Person(name) {
            privateData.set(this, { name: name });
        }
    
        Person.prototype.getName = function() {
            return privateData.get(this).name;
        };
    
        return Person;
    }());

The `privateData` in this example is an instance of `WeakMap`. When a new `Person` is created, an entry is made in the weakmap for the instance to hold an object containing private data. The key in the weakmap is `this`, and even though it&#8217;s trivial for a developer to get a reference to a `Person` object, there is no way to access `privateData` outside of the instance, so the data is kept safely away from troublemakers. Any method that wants to manipulate the private data can do so by fetching the appropriate data for the given instance by passing in `this` and looking at the returned object. In this example, `getName()` retrieves the object and returns the `name` property.

## Conclusion

I&#8217;ll finish with how I began: I was wrong about weakmaps. I now understand why people were so excited about them, and if I used them for nothing other than creating truly private (and non-hacky) instance members, then I will feel I got my money&#8217;s worth with them. I&#8217;d like to thank Nick Fitzgerald for his post that inspired me to write this, and for opening my eyes to the possibilities of weakmaps. I can easily foresee a future where I&#8217;m using weakmaps as part of my every day toolkit for JavaScript and I anxiously await the day that we can use them cross-browser.

## References

  1. [Hiding implementation details with ECMAScript 6 WeakMaps][1] by Nick Fitzgerald (fitzgeraldnick.com)

 [1]: http://fitzgeraldnick.com/weblog/53/
