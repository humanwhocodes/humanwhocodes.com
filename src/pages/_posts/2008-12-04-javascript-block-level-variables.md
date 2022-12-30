---
title: JavaScript block-level variables
author: Nicholas C. Zakas
permalink: /blog/2008/12/04/javascript-block-level-variables/
categories:
  - Professional
tags:
  - JavaScript
  - Scope
  - Variables
---
JavaScript developers have long bemoaned the fact that there's no such thing as block-level variables. Block-level variables are variables that exist only within the context of a block statement (such as `if`) and then are destroyed immediately after the statement is finished executing. You can write code that *looks* like it should create block-level variables, such as:

    for (var i=0; i < 10; i++){
        //body
    }
    alert(i);   //10

In this example, it looks like the variable `i` is a block-level variable to the `for` loop (and indeed, this would be the case in other languages such as Java). The variable, however, gets created in the containing scope so it is still accessible outside of the `for` loop as indicated by the alert. This code is the functional equivalent of the following:

    var i=0;
    for (i=0; i < 10; i++){
        //body
    }
    alert(i);   //10

This is why experts prefer that variables all be defined at the beginning of functions so as to eliminate the illusion of block-level variables.

As it turns out, there is one case where you effectively create block-level variables. The `with` statement actually creates another scope in which variables exist. The technical details of how this works are unimportant for this conversation, but suffice to say that it augments the variables that are available during the execution of the `with` statement with the properties of a given object. For example:

    with(location){
        alert(href);
    }

In this code, the `location` object is passed into the `with` statement, which automatically makes every property of `location` available as variables inside. Accessing `href` inside of the `with` block is the equivalent of accessing `location.href` in all ways. After the `with` block has finished executing, the `href` variable is no longer available (although you can still access `location.href`). In effect, the `with` statement has block-level scoping. The question is, how to use it in a practical way.

The whole idea of block-level variables is to define them for limited use and then trust that they have been destroyed. It would be nice to declare a bunch of variables for use within a block and then know that they can no longer be accessed later. This can effectively be done using `with` and an object literal:

    //define two variables: foo and bar
    with({ foo: 1, bar: 2 }){
        alert(foo);   //1
        alert(bar);   //2
    }
    alert(foo);   //Error!

This code creates an object literal with two properties, `foo` and `bar` and passes that into the `with` statement. Doing so creates two variables inside of the statement, `foo` and `bar`, which correspond to the properties on the object literal. These variables are destroyed when the `with` block is finished executing. Since the object literal itself is never stored in a variable, it is destroyed once the `with` block finishes executing as well, so there is no longer any way to access any of this information.

I'm not sure that this is practical for use repeatedly, as adding another scope also incurs a performance hit for variable lookup, but it's an interesting use of an underappreciated part of the language.
