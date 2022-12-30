---
title: Does JavaScript need classes?
author: Nicholas C. Zakas
teaser: ECMAScript 6 adds classes to JavaScript. Do we really neeed them?
permalink: /blog/2012/10/16/does-javascript-need-classes/
categories:
  - Web Development
tags:
  - Classes
  - ECMAScript 6
  - JavaScript
  - Objects
---
Like it or not, ECMAScript 6 is going to have classes[^1]. The concept of classes in JavaScript has always been polarizing. There are some who love the classless nature of JavaScript specifically because it is different than other languages. On the other hand, there are those who hate the classless nature of JavaScript because it's different than other languages. One of the biggest mental hurdles people need to jump when moving from C++ or Java to JavaScript is the lack of classes, and I've had people explain to me that this was one of the reasons they either didn't like JavaScript or decided not to continue learning.

JavaScript hasn't had a formal definition of classes since it was first created and that has caused confusion right from the start. There are no shortage of JavaScript books and articles talking about classes as if they were real things in JavaScript. What they refer to as classes are really just custom constructors used to define custom reference types. Reference types are the closest thing to classes in JavaScript. The general format is pretty familiar to most developers, but here's an example:

```js
function MyCustomType(value) {
    this.property = value;
}

MyCustomType.prototype.method = function() {
    return this.property;
};
```

In many places, this code is described as declaring a class named `MyCustomType`. In fact, all it does is declare a function named `MyCustomType` that is intended to be used with `new` to create an instance of the reference type `MyCustomType`. But there is nothing special about this function, nothing that says it's any different from any other function that is not being used to create a new object. It's the usage of the function that makes it a constructor.

The code doesn't even look like it's defining a class. In fact, there is very little obvious relationship between the constructor definition and the one method on the prototype. These look like two completely separate pieces of code to new JavaScript developers. Yes, there's an obvious relationship between the two pieces of code, but it doesn't look anything like defining a class in another language.

Even more confusing is when people start to talk about inheritance. Immediately they start throwing around terms such as subclassing and superclasses, concepts that only make sense when you actually have classes to work with. Of course, the syntax for inheritance is equally confusing and verbose:

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.sayName = function() {
    console.log(this.name);
};

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = new Animal(null);
Dog.prototype.bark = function() {
    console.log("Woof!");
};
```

The two-step inheritance process of using a constructor and overriding a prototype is incredibly confusing. 

In the first edition of <cite>Professional JavaScript for Web Developers</cite>, I used the term &#8220;class&#8221; exclusively. The feedback I received indicated that people found this confusing and so I changed all references to &#8220;class&#8221; in the second edition to &#8220;type&#8221;. I've used that terminology ever since and it helps to eliminate a lot of the confusion.

However, there is still a glaring problem. The syntax for defining custom types is confusing and verbose. Inheritance between two types is a multistep process. There is no easy way to call a method on a supertype. Bottom line: it's a pain to create and manage custom types. If you don't believe that this is a problem, just look at the number of JavaScript libraries that have introduced their own way of defining custom types, inheritance, or both:

* **YUI** &#8211; has `Y.extend()` to perform inheritance. Also adds a `superclass` property when using this method.[^2]
* **Prototype** &#8211; has `Class.create()` and `Object.extend()` for working with objects and &#8220;classes&#8221;.[^3]
* **Dojo** &#8211; has `dojo.declare()` and `dojo.extend()`.[^4]
* **MooTools** &#8211; has a custom type called `Class` for defining and extending classes.[^5]

It's pretty obvious that there's a problem when so many JavaScript libraries are defining solutions. Defining custom types is messy and not at all intuitive. JavaScript developers need something better than the current syntax.

ECMAScript 6 classes are actually nothing more than syntactic sugar on top of the patterns you are already familiar with. Consider this example:

```js
class MyCustomType {
    constructor(value) {
        this.property = value;
    }

    method() {
        return this.property;
    }
}
```

This ECMAScript 6 class definition actually desugars to the previous example in this post. An object created using this class definition works exactly the same as an object created using the constructor definition from earlier. The only difference is a more compact syntax. How about inheritance:

```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    bark() {
        console.log("Woof!");
    }
}
```

This example desugars to the previous inheritance example. The class definitions are compact and the clunky multistep inheritance pattern has been replaced with a simple <code>extends</code> keyword. You also get the benefit of <code>super()</code> inside of class definitions so you don't need to reference the supertype in more than one spot.

All of the current ECMAScript 6 class proposal is simply new syntax on top of the patterns you already know in JavaScript. Inheritance works the same as always (prototype chaining plus calling a supertype constructor), methods are added to prototypes, and properties are declared in the constructor. The only real difference is less typing for you (no pun intended). Class definitions are just type definitions with a different syntax.

So while some are having a fit because ECMAScript 6 is introducing classes, keep in mind that this concept of classes is abstract. It doesn't fundamentally change how JavaScript works; it's not introducing a new thing. Classes are simply syntactic sugar on top of the custom types you've been working with for a while. This solves a problem that JavaScript has had for a long time, which is the verbosity and confusion of defining your own types. I personally would have liked to use the keyword <code>type</code> instead of <code>class</code>, but at the end of the day, this is just a matter of semantics.

So does JavaScript need classes? No, but JavaScript definitely needs a cleaner way of defining custom types. It just so happens the way to do that has a name of &#8220;class&#8221; in ECMAScript 6. And if that helps developers from other languages make an easier transition into JavaScript, then that's a good thing.

## Translations

<ul>
  <li>
    <a href="http://jeweell.com/chu-potribni-javascript-klasu/">Ukrainian translation</a> by <a href="http://jeweell.com/">Jeweell team</a>
  </li>
</ul>


[^1]: [Maximally minimal classes](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes)
[^2]: [YUI extend()](http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_extend)
[^3]: [Prototype Classes and Inheritance](http://prototypejs.org/learn/class-inheritance)
[^4]: [Creating and Enhancing Dojo Classes](http://www.sitepen.com/blog/2010/07/01/creating-and-enhancing-dojo-classes/)
[^5]: [MooTools Class](http://mootools.net/docs/core/Class/Class)
