---
title: Creating defensive objects with ES6 proxies
author: Nicholas C. Zakas
permalink: /blog/2014/04/22/creating-defensive-objects-with-es6-proxies/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - Proxies
---
This past week I spent an hour debugging an issue that I ultimately tracked down to a silly problem: the property I was referencing didn't exist on the given object. I had typed `request.code` and it should have been `request.query.code`. After sternly lecturing myself for not noticing earlier, a pit formed in my stomach. This is exactly the type of situation that the JavaScript haters point out as why JavaScript sucks.

The haters are, in this case, correct. If I had been using a type-safe language then I would have gotten an error telling me that the property didn't exist, and thus saved me an hour of my life. This wasn't the first time that I'd encountered this type of error, and it likely wouldn't be the last. Each time it happens, I stop and think about ways that I could prevent this type of error from happening, but there has never been a good answer. Until ECMAScript 6.

## ECMAScript 5

Whereas ECMAScript 5 did some fantastic things for controlling how you can change existing properties, it did nothing for dealing with properties that don't exist. You can prevent existing properties from being overwritten (setting `writable` to false) or deleted (setting `configurable` to false). You can prevent objects from being assigned new properties (using `Object.preventExtensions()`) or set all properties to be read-only and not deletable (`Object.freeze()`). 

If you don't want all the properties to read-only, then you can use `Object.seal()`. This prevents new properties from being added and existing properties from being removed but otherwise allows properties to behave normally. This is the closest thing in ECMAScript 5 to what I want as its intent is to solidify (&#8220;seal&#8221;) the interface of a particular object. A sealed object, when used in strict mode, will throw an error when you try to add a new property:

    "use strict";
    
    var person = {
        name: "Nicholas"
    };
    
    Object.seal(person);
    
    person.age = 20;    // Error!
    

That works really well to notify you that you're attempting to change the interface of an object by adding a new property. The missing piece of the puzzle is to throw an error when you attempt to *read* a property that isn't part of the interface.

## Proxies to the rescue

Proxies have a long and complicated history in ECMAScript 6. An early proposal was implemented by both Firefox and Chrome before TC-39 decided to change proxies in a very dramatic way. The changes were, in my opinion, for the better, as they smoothed out a lot of the rough edges from the original proxies proposal (I did some experimenting with the early proposal<sup>[1]</sup>). 

The biggest change was the introduction of a target object with which the proxy would interact. Instead of just defining traps for particular types of operations, the new &#8220;direct&#8221; proxies intercept operations intended for the target object. They do this through a series of methods that correspond to under-cover-operations in ECMAScript. For instance, whenever you read a value from an object property, there is an operation called `[[Get]]` that the JavaScript engine performs. The `[[Get]]` operation has built-in behavior that can't be changed, however, proxies allow you to &#8220;trap&#8221; the call to `[[Get]]` and perform your own behavior. Consider the following:

    var proxy = new Proxy({ name: "Nicholas" }, {
        get: function(target, property) {
            if (property in target) {
                return target[property];
            } else {
                return 35;
            }
        }
    });
    
    console.log(proxy.time);        // 35
    console.log(proxy.name);        // "Nicholas"
    console.log(proxy.title);       // 35

This proxy uses a new object as its target (the first argument to `Proxy()`). The second argument is an object that defines the traps you want. The `get` method corresponds to the `[[Get]]` operation (all other operations behave as normal so long as they are not trapped). The trap receives the target object as the first argument and the property name as the second. This code checks to see if the property exists on the target object and returns the appropriate value. If the property doesn't exist on the target, the function intentionally ignores the two arguments and always returns 35. So no matter which non-existent property is accessed, the value 35 is always returned.

## Getting defensive

Understanding how to intercept the `[[Get]]` operation is all that is necessary for creating &#8220;defensive&#8221; objects. I call them defensive because they behave like a defensive teenager trying to assert their independence of their parents' view of them (&#8220;I am *not* a child, why do you keep treating me like one?&#8221;). The goal is to throw an error whenever a nonexistent property is accessed (&#8220;I am `not` a duck, why do you keep treating me like one?&#8221;). This can be accomplished using the `get` trap and just a bit of code:

    function createDefensiveObject(target) {
        
        return new Proxy(target, {
            get: function(target, property) {
                if (property in target) {
                    return target[property];
                } else {
                    throw new ReferenceError("Property \"" + property + "\" does not exist.");
                }
            }
        });
    }

The `createDefensiveObject()` function accepts a target object and creates a defensive object for it. The proxy has a `get` trap that checks the property when it's read. If the property exists on the target object, then the value of the property is returned. If, on the other hand, the property does not exist on the object, then an error is thrown. Here's an example:

    var person = {
        name: "Nicholas"
    };
    
    var defensivePerson = createDefensiveObject(person);
    
    console.log(defensivePerson.name);        // "Nicholas"
    console.log(defensivePerson.age);         // Error!

Here, the `name` property works as usual while `age` throws an error.  
Defensive objects allow existing properties to be read, but non-existent properties throw an error when read. However, you can still add new properties without error:

    var person = {
        name: "Nicholas"
    };
    
    var defensivePerson = createDefensiveObject(person);
    
    console.log(defensivePerson.name);        // "Nicholas"
    
    defensivePerson.age = 13;
    console.log(defensivePerson.age);         // 13

So objects retain their ability to mutate unless you do something to change that. Properties can always be added but non-existent properties will throw an error when read rather than just returning `undefined`.

Standard feature detection techniques still work as usual and without error:

    var person = {
        name: "Nicholas"
    };
    
    var defensivePerson = createDefensiveObject(person);
    
    console.log("name" in defensivePerson);               // true
    console.log(defensivePerson.hasOwnProperty("name"));  // true
    
    console.log("age" in defensivePerson);                // false
    console.log(defensivePerson.hasOwnProperty("age"));   // false
    

You can then truly defend the interface of an object, disallowing additions and erroring when accessing a non-existent property, by using a couple of steps:

    var person = {
        name: "Nicholas"
    };
    
    Object.preventExtensions(person);
    
    var defensivePerson = createDefensiveObject(person);
    
    
    defensivePerson.age = 13;                 // Error!
    console.log(defensivePerson.age);         // Error!
    

In this case, `defensivePerson` throws an error both when you try to read from and write to a non-existent property. This effectively mimics the behavior of type-safe languages that enforce interfaces.

Perhaps the most useful time to use defensive objects is when defining a constructor, as this typically indicates that you have a clearly-defined contract that you want to preserve. For example:

    function Person(name) {
        this.name = name;
    
        return createDefensiveObject(this);
    }
    
    var person = new Person("Nicholas");
    
    console.log(person.age);         // Error!

By calling `createDefensiveObject()` inside of a constructor, you can effectively ensure that all instances of `Person` are defensive.

## Conclusion

JavaScript has come a long way recently, but we still have a ways to go to get the same type of time-saving functionality that type-safe languages boast. ECMAScript 6 proxies provide a great way to start enforcing contracts where necessary. The most useful place is in constructors or ECMAScript 6 classes, but it can also be useful to make other objects defensive as well. The goal of defensive objects is to make errors more obvious, so while they may not be appropriate for all objects, they can definitely help when defining API contracts.


  1. [Experimenting with ECMAScript 6 proxies][1] by me (NCZOnline)

 [1]: https://humanwhocodes.com/blog/2011/09/15/experimenting-with-ecmascript-6-proxies/
