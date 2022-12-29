---
title: Mysterious arguments object assignments
author: Nicholas C. Zakas
permalink: /blog/2010/11/02/mysterious-arguments-object-assignments/
categories:
  - Web Development
tags:
  - Arguments
  - ECMAScript
  - Functions
  - JavaScript
---
This past week, I found what I thought was a bug in Firefox&#8217;s JavaScript implementation and [filed it][1]. A response from Brendan Eich indicated that the behavior in question was, in fact, compliant with the spec and had been implemented for some time. I ran a few more tests to try and figure out where I had gone wrong. Indeed, Firefox, Internet Explorer, and Safari all exhibited the same behavior while Chrome did not. Here&#8217;s what happened.

## The code

The code in question is as follows:

    function doAdd(num1, num2) {
        if(arguments.length == 1) {
            arguments[1] = 10;
        }
        alert(arguments[0] + num2);
    }
    doAdd(10);
    

What would you expect the bottom line to output? In Chrome, it outputs 20, because assigning to `arguments[1]` also assigns to `num2`. In the other browsers, it outputs `NaN`, because assigning to `arguments[1]` does not also assign to `num2`. What exactly is going on here?

## The spec

My confusion stemmed from Section 10.6 Note 1 of ECMA-262, 5th Edition, which reads:

> For non-strict mode functions the array index (defined in 15.4) named data  
> properties of an arguments object whose numeric name values are less than  
> the number of formal parameters of the corresponding function object initially  
> share their values with the corresponding argument bindings in the function&#8217;s  
> execution context. *This means that changing the property changes the  
> corresponding value of the argument binding and vice-versa.*

I&#8217;ve discussed the similar clause before, at least the 3rd edition one, when [answering Baranovskiyâ€™s JavaScript quiz][2]. I thought I had understood that `arguments` was always bound to the named arguments of the function. Both Tom Schuster and Brendan Eich pointed out that earlier in Section 10.6, in the instructions for creating the `arguments` object, the following appears:

> args the actual arguments passed to the [[Call]] internal method  
> 1. Let len be the number of elements in args.  
> &#8230;  
> 10. Let indx = len &#8211; 1.  
> 11. Repeat while indx >= 0,

So the arguments object is created based on the number of actual arguments passed into the function and not on the number of named parameters defined for the function. That means, as Tom pointed out, the setter that would be created for the numeric index of the `arguments` object only applies to the number of arguments that were actually passed in. In my example, therefore, `arguments[1]` becomes a straight property assignment to the `arguments` object rather than calling the special setter that would copy the value to the named argument.

## More code

So even though my previous example wouldn&#8217;t work in all browsers, this one will:

    function doAdd(num1, num2) {
        arguments[1] = 10;
        alert(arguments[0] + num2);
    }
    doAdd(10, 25);   //20
    

The last line of this example outputs 20 in all browsers. Since I&#8217;m now passing in two arguments to the function, that means the `arguments` object is being created with two slots and therefore the special setter works for both indices 0 and 1. Setting `arguments[1]` in this code actually does update `num2` and overwrites the value that was passed in.

## Conclusion

Specifications are difficult to understand and even more difficult to implement. This was just a subtle reminder that there are dark corners of JavaScript where dragons lie. It&#8217;s fun to poke the dragons from time to time and learn exactly what they&#8217;ll do. Sometimes they&#8217;ll burn you, but you&#8217;ll learn either way.

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=608543
 [2]: {{site.url}}/blog/2010/01/26/answering-baranovskiys-javascript-quiz/
