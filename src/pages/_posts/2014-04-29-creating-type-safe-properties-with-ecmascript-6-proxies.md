---
title: Creating type-safe properties with ECMAScript 6 proxies
author: Nicholas C. Zakas
permalink: /blog/2014/04/29/creating-type-safe-properties-with-ecmascript-6-proxies/
categories:
  - Web Development
tags:
  - ECMAScript 6
  - JavaScript
  - Proxies
---
In my [last post][1], I explained how to use ECMAScript 6 proxies to throw an error when a non-existent property is read (rather than returning `undefined`). I came to realize that proxies allow a transparent way to augment objects with validation capabilities in an almost limitless fashion. After some experimentation, I discovered that it's possible to add type safety to JavaScript objects with just a few lines of code.

The idea behind type safety is that each variable or property can only contain a particular type of value. In type-safe languages, the type is defined along with the declaration. In JavaScript, of course, there is no way to make such a declaration natively. However, many times properties are initialized with a value that indicates the type of data it should contain. For example:

    var person = {
        name: "Nicholas",
        age: 16
    };

In this code, it's easy to see that `name` should hold a string and `age` should hold a number. You wouldn't expect these properties to hold other types of data for as long as the object is used. Using proxies, it's possible to use this information to ensure that new values assigned to these properties are of the same type.

Since assignment is the operation to worry about (that is, assigning a new value to a property), you need to use the proxy `set` trap. The `set` trap gets called whenever a property value is set and receives four arguments: the target of the operation, the property name, the new value, and the receiver object. The target and the receiver are always the same (as best I can tell). In order to protect properties from having incorrect values, simply evaluate the current value against the new value and throw an error if they don't match:

    function createTypeSafeObject(object) {
    
        return new Proxy(object, {
              set: function(target, property, value) {
                  var currentType = typeof target[property],
                      newType = typeof value;
    
                  if (property in target &#038;&#038; currentType !== newType) {
                      throw new Error("Property " + property + " must be a " + currentType + ".");
                  } else {
                      target[property] = value;
                  }
              }
        });
    }

The `createTypeSafeObject()` method accepts an object and creates a proxy for it with a `set` trap. The trap uses `typeof` to get the type of the existing property and the value that was passed in. If the property already exists on the object and the types don't match, then an error is thrown. If the property either doesn't exist already or the types match, then the assignment happens as usual. This has the effect of allowing objects to receive new properties without error. For example:

    var person = {
        name: "Nicholas"
    };
    
    var typeSafePerson = createTypeSafeObject(person);
    
    typeSafePerson.name = "Mike";        // succeeds, same type
    typeSafePerson.age = 13;             // succeeds, new property
    typeSafePerson.age = "red";          // throws an error, different types
    

In this code, the `name` property is changed without error because it's changed to another string. The `age` property is added as a number, and when the value is set to a string, an error is thrown. As long as the property is initialized to the proper type the first time, all subsequent changes will be correct. That means you need to initialize invalid values correctly. The quirk of `typeof null` returning &#8220;object&#8221; actually works well in this case, as a `null` property allows assignment of an object value later.

As with defensive objects, you can also apply this method to constructors:

    function Person(name) {
        this.name = name;
        return createTypeSafeObject(this);
    }
    
    var person = new Person("Nicholas");
    
    console.log(person instanceof Person);    // true
    console.log(person.name);                 // "Nicholas"
    

Since proxies are transparent, the returned object has all of the same observable characteristics as a regular instance of `Person`, allowing you to create as many instances of a type-safe object while making the call to `createTypeSafeObject()` only once.

## Conclusion

By allowing you to get in the middle of assignment operations, proxies enable you to intercept the value and validate it appropriately. The examples in this post use the simple type returned by `typeof` to determine the correct type for a property, but you could just as easily add custom validation. The important takeaway is how proxies enable you to build guarantees into your objects without affecting normal functionality. The ability to intercept values and throw errors when they are incorrect can greatly reduce errors based one assigning the wrong type of data to a property.

 [1]: {{site.url}}/blog/2014/04/22/creating-defensive-objects-with-es6-proxies/
