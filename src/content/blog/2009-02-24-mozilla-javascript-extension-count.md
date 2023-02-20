---
title: "Mozilla JavaScript Extension: __count__"
author: Nicholas C. Zakas
permalink: /blog/2009/02/24/mozilla-javascript-extension-count/
categories:
  - Web Development
tags:
  - JavaScript
  - Mozilla
---
Mozilla JavaScript engines support additional, non-standard features resulting in extra properties and methods being exposed to developers. Last week, I talked about the `__noSuchMethod__()` method that can be used on object. This week, the topic is the `__count__` property, which exists on all user-defined objects by default and indicates how many properties and methods are on the object. This property cannot be overwritten nor can it be removed using the `delete` operator due to its special use.

To be more specific, the `__count__` property always reflects the number of object instance members. Every time you add a property or method to the object, the `__count__` property is updated; whenever you remove a property or method using delete, the `__count__` property is updated. For example:

    //Works in Mozilla JavaScript engines only!
    var person = {
        name: "Nicholas"
    };
    
    alert(person.__count__);    //1
    
    person.hair = "brown";
    alert(person.__count__);    //2
    
    delete person.name;
    alert(person.__count__);    //1

In this example, an object `person` is created with a single property, `name` and so the initial value of `__count__` is 1. When the `hair` property is added, `__count__` is automatically updated to 2. Likewise, deleting the `name` property results in `__count__` being reset to 1. All of this happens automatically as the object is manipulated.

The important thing to note about `__count__` is that it deals only with instance members and so doesn't take into account properties and methods inherited via the prototype chain. In non-Mozilla JavaScript engines, you'd need to write a loop and use `hasOwnProperty()` to build up such a count:

    //all browsers
    function getPropertyCount(object){
        var count=0,
            property;
        for (property in object){
            if (object.hasOwnProperty(property)){
                count++;
            }
        }
        return count;
    }

Clearly, using `__count__` is far more efficient than creating a loop to calculate the number of instance members.

So the question remains, why would it be useful to know the number of instance members on an object? It's very useful when you want to know whether an object has only inherited members before proceeding:

    if(getPropertyCount(object) > 0){
        //do something
    }

This type of construct is helpful in identifying objects that have instance members versus those that are made up solely of inherited members. JSON serialization, for example, relies heavily on the existence of instance members.

The `__count__` property doesn't really do much in the world of JavaScript, but it does provide more feedback as to what is going on behind-the-scenes. This extension hasn't been picked up by non-Mozilla browsers, so it's use isn't recommended for cross-browser development.
