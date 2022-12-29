---
title: Determining if an object property exists
author: Nicholas C. Zakas
permalink: /blog/2010/07/27/determining-if-an-object-property-exists/
categories:
  - Personal
tags:
  - Feature Detection
  - JavaScript
  - Objects
  - Properties
---
One of the most basic tests developers perform in JavaScript is whether or not a particular property exists on an object. Since feature detection is the preferred method of code forking, developers are encouraged to test for the existence of properties before using them. There is a lot of buggy JavaScript code out there as inexperienced developers try to use feature detection. A lot of the problems reside with a lack of understanding as to the nature of object properties in JavaScript.

## Where do properties come from?

Before attempting to detect properties, it&#8217;s important to understand from where they originate. There are two basic types of properties in JavaScript: those that exist on the object (also known as &#8220;own&#8221; properties) and those that are inherited through the prototype chain (often called &#8220;prototype&#8221; properties). Consider the following:

    var person = {
        name: "Nicholas"
    };
    
    alert(person.name);        //"Nicholas"
    alert(person.toString());  //"[object Object]"
    

In this code, the object `person` has only one own property, which is `name`. You can still access other methods on the object such as `toString()`, but these are inherited through the prototype chain. Object literals inherit from the `Object` type, so all of the basic methods of `Object` are accessible on the instance.

The big difference between own properties and prototype properties is the difference between unique and shared values. Own properties belong to that single object instance and can&#8217;t be affected by other instances of the same type; prototype properties belong to the prototype of the object, and since the prototype can be shared amongst multiple instances, these properties are also shared amongst multiple instances. Here&#8217;s another example:

    var person2 = Object.create(person);
    var person3 = Object.create(person);
    
    alert(person2.name);   //"Nicholas"
    alert(person3.name);   //"Nicholas"
    
    person.name = "Adam";
    
    alert(person2.name);    //"Adam"
    alert(person3.name);    //"Adam"

This example uses the `<a href="http://javascript.crockford.com/prototypal.html">Object.create()</a>` method from ECMAScript 5 to create two objects, `person2` and `person3`, that inherit from `person`. The prototype for both `person2` and `person3` is `person`, and so `name` is actually a prototype property that is accessible through `person2` and `person3`. This is why displaying the values of name on both objects results in the same value: they are both sharing the prototype property `name`. That means when `person.name` is changed directly, the change is accessible from the instances.

It&#8217;s important to understand that `name` is a prototype property for both `person2` and `person3`, but it&#8217;s an own property for `person`. You can only assign values to own properties, so attempting to assign a value to a prototype property actually causes a new own property of the same name to be created. Example:

    alert(person2.name);    //"Nicholas"
    alert(person3.name);    //"Nicholas"
    
    person2.name = "Adam";
    
    alert(person2.name);    //"Adam"
    alert(person3.name);    //"Nicholas"

Since you can&#8217;t assign to prototype properties, assigning a new value to `person2.name` actually creates a new own property on `person2` called `name`. Own properties always shadow prototype properties, so the next time you access `person2.name`, you&#8217;re accessing the own property instead of the prototype property. That will continue until the own property is removed using `delete`, such as:

    delete person2.name;
    
    alert(person2.name);    //"Nicholas"

You can only call `delete` on an own property to remove it (calling on a prototype property does nothing). Once the own property `name` is removed, there is nothing shadowing the prototype property `name` and so `person2.name` now refers to the prototype property.

Note: While all native object types (`Array`, `Boolean`, `Date`, all `Error` variants, `Function`, `Number`, `RegExp`, and `String`) inherit from `Object`, non-native object types, such as those that represent the DOM in browsers, don&#8217;t necessarily inherit from `Object` in all browsers.

## Detecting properties

Let&#8217;s say you want to determine if a given object has a property of name. In experienced developers tend to write code like this:

    //doesn't accurately test for existence
    if (person.name){
        //yay! property exists!
    }

At first glance, this seems okay. However, understanding how JavaScript works reveals some problems with this approach. First, this will only succeed if the value of `person.name` is [truthy][1], meaning it&#8217;s an object, a non-empty string, a non-zero number that&#8217;s not `NaN`, `true`, and not `null` or `undefined`. That means if `person.name` is the empty string (&#8220;&#8221;), this check will fail. Failing, in this case, doesn&#8217;t mean that the property doesn&#8217;t exist. In fact, the property does exist and contains a value, but the value is falsy and so doesn&#8217;t pass this test.

### Detecting own properties

Keeping in mind that this is about testing for the *existence* of the property and not for the usability or data type, there are a couple of options. The first option is to detect own properties, and it comes via a method on the `Object` type called `hasOwnProperty()`. Since native objects inherit from `Object`, this property is inherited by these objects and can be used to detect the existence of own properties:

    alert(person.hasOwnProperty("name"));   //true
    alert(person2.hasOwnProperty("name"));    //false
    
    person2.name = "Adam";
    
    alert(person2.hasOwnProperty("name"));    //true
    
    delete person2.name;
    
    alert(person2.hasOwnProperty("name"));    //false
    

Initially, `person2` has a prototype property `name`, so `hasOwnProperty()` returns false. Once an own property is created, calling `hasOwnProperty()` returns true. And after the property is removed via `delete`, this method again returns false.

JSON serialization works only for own properties, and non-native JSON serialization utilities used `hasOwnProperty()` to ensure that only the properties defined on object literals were included in the resulting string.

### Detecting all properties

If you only care that the object has a property and don&#8217;t care whether it&#8217;s an own property or a prototype property, you can use the `in` operator to determine the existence of the property. Example:

    if ("name" in person){
        //property exists
    }

The `in` operator returns true when the named property exists on the object. In many cases, the `in` operator is all that you&#8217;ll need (especially when dealing with DOM objects). In fact, Mark Pilgrim&#8217;s [All-In-One Almost-Alphabetical No-Bullshit Guide to Detecting Everything][2] for HTML5 makes extensive use of `in` for detecting the new HTML5 features on DOM objects.

## Conclusion

If you just want to check for the existence of properties, and not necessarily what their value might be, then you have two safe options: `hasOwnProperty()` and the `in` operator. The `hasOwnProperty()` property method should be used if you want to detect own properties only. If you want to test property existence and don&#8217;t care if it&#8217;s an own property or an object property, then the `in` operator is the one to use.

**Update (27 July 2010):** Added `false` and `NaN` to list of falsy values.****

**Update (29 July 2010):** Fixed description of truthy/falsy values.

**Update (22 December 2012):** Fixed link to Mark Pilgrim&#8217;s list.

 [1]: http://11heavens.com/falsy-and-truthy-in-javascript
 [2]: http://diveintohtml5.info/everything.html
