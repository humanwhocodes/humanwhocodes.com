---
title: Custom types (classes) using object literals in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2011/11/04/custom-types-classes-using-object-literals-in-javascript/
categories:
  - Personal
tags:
  - ECMAScript
  - Harmony
  - JavaScript
  - Prototypes
  - Types
---
This past week, [Jeremy Ashkenas][1] (of CoffeeScript fame) started a flurry of discussion around class syntax for JavaScript. ECMAScript Harmony is scheduled to have classes and the [proposal][2] has been up for a while. Of course, JavaScript has never had a true concept of classes (which is why I call them &#8220;types&#8221; instead), and the current strawman is no exception &#8211; it simply creates some syntactic sugar on top of the current constructor/prototype method of defining custom types. An example:

    class Color {
    
      constructor(hex) {
        ...
      }
    
      public r = 1;
      public g = 1;
      public b = 1;
    
      copy(color) {
        ...
      }
    
      setRGB(r, g, b) {
        ...
      }
    
      setHSV(h, s, v) {
        ...
      }
    
    }

This would be instead of defining a separate constructor and prototype. The above desugars to:

    function Color(hex){
        ...
    }
    
    
    Color.prototype.r = 1;
    Color.prototype.g = 1;
    Color.prototype.b = 1;
    
    Color.prototype.copy = function(color){
        ...
    };
    
    Color.prototype.setRGB = function(r,g,b){
        ...
    };
    
    Color.prototype.setHSV = function(h,s,v){
        ...
    };

Essentially the new class syntax just helps you define the prototype of the new type while the constructor is responsible for creating instance members. 

Jeremy didn&#8217;t like it, and so came up with an alternate proposal in the form of a [gist][3]. At the center of his idea: use the familiar object literal syntax to define new types with just a small amount of syntactic sugar to make things easier. 

    class Color {
    
      constructor: function(hex) {
        ...
      },
    
      r: 1, g: 1, b: 1,
    
      copy: function(color) {
        ...
      },
    
      setRGB: function(r, g, b) {
        ...
      },
    
      setHSV: function(h, s, v) {
        ...
      }
    
    }

Jeremy&#8217;s proposal looks closer to object literal syntax with the `class` keyword and the type name. A lot of commenters on the gist liked this idea &#8211; I&#8217;m actually not one of them, I think the proposed Harmony syntax is much more succinct and implements sugaring of known patterns in a straightforward way.

Regardless, there is something to Jeremy&#8217;s approach of being able to define new custom types in one step. It&#8217;s pretty trivial to do that today using JavaScript. First, you need a simple function:

    function type(details){
        details.constructor.prototype = details;
        return details.constructor;
    }

That&#8217;s all it takes. Basic usage:

    var Color = type({
         constructor: function(hex) {
             ...
         },
    
         r: 1, g: 1, b: 1,
    
         copy: function(color) {
             ...
         },
    
         setRGB: function(r, g, b) {
             ...
         },
    
         setHSV: function(h, s, v) {
             ...
         }
    });
    
    var mycolor = new Color("ffffff");
    

The syntax is just a bit different from Jeremy&#8217;s as it adheres to ECMAScript 5 syntax, but works pretty much the same way. The key to understanding this approach is understanding the `constructor` property. You may be used to accessing `constructor` from an object instance to get the function that created the object. However, `constructor` is actually a prototype property, shared by all instances. For any given function created from scratch:

    function f(){}
    console.log(f === f.prototype.constructor);   //true

So basically, the `type()` function takes the passed-in object and looks for the `constructor` property. At first, `details.constructor.prototype` has its default value. The function overwrites the prototype with the `details` object itself (which already has an appropriate reference to `constructor`). Then, it simply returns the now-fully-formed constructor function. You can start to use the returned constructor with `new` immediately.

In lieu of Harmony&#8217;s new syntax, I&#8217;ve very quickly come to like this approach. Using a single object literal is quick and easy, and of course, works right now in all browsers. There are also any number of ways you could modify `type()` in order to support things like inheritance and mixins, depending on your use cases.

In the end, I&#8217;m looking forward to having some syntactic sugar for defining custom types in JavaScript. We&#8217;ve battled for too long with overly-verbose composition statements while those using class-based languages looked over our shoulders and laughed. I, for one, welcome our new Harmony overlords.

**Update (04-Nov-2011):** Fixed Harmony example.

 [1]: https://github.com/jashkenas
 [2]: http://wiki.ecmascript.org/doku.php?id=harmony:classes
 [3]: https://gist.github.com/1329619
