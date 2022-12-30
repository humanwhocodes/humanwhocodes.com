---
title: Good object-oriented design in JavaScript
author: Nicholas C. Zakas
permalink: /blog/2007/10/04/good-object-oriented-design-in-javascript/
categories:
  - Web Development
tags:
  - JavaScript
  - Objects
---
Colleges spend years preaching the gospel of object-oriented programming to undergrads. Define classes. Use interfaces. Remember your design patterns. They tell us that these patterns apply to any object-oriented language. You can solve the same problem in Java or C++ or C# using the same techniques and the same code architecture, just trust in what you know.

There are a lot of good object-oriented programmers out there. They are brilliant at taking a problem, dissecting it into classes and interfaces, packaging them into namespaces, and setting their solution free to work. Every once in a while, one of these fantastic programmers decides to try writing JavaScript, and then the fun starts.

One of the first questions they ask is how to create a class. Since classes don't exist in JavaScript (currently), they quickly adapt to creating constructors and prototypes so that inheritance can be achieved. I'm always very careful not to use the word &#8220;class&#8221; when talking about JavaScript because it doesn't accurately represent any concepts in the language and just leads to confusion. Reference types are the logical equivalent of classes in JavaScript but are not the same as classes.

In traditional object-oriented languages, classes and inheritance come for free. There's no performance penalty for increasing the number of classes or having a deep inheritance tree &#8211; the compilers know their job good enough to save the details from you. In JavaScript, reference types do come with a penalty, and inheritance comes with an additional penalty. There's no compiler to optimize your code for you and reference types literally recreate objects every time they're instantiated. What does this mean? It means that the correct class hierarchy for a program in C++ isn't the correct architecture for JavaScript.

Though most object-oriented architecture begins with the definition of classes, this should not be your first step when defining a JavaScript solution. Almost all tasks can be accomplished by singleton objects performing specific functions. Reference types are rarely needed and inheritance is needed even less often.

Good object-oriented design in JavaScript often means avoiding reference types and inheritance to avoid the performance penalty that accompanies them. If your application's performance is important (and if it's not, then you probably have the wrong priorities), you owe it to yourself to design intelligently for the medium in which you're working. JavaScript is a different type of object-oriented language and thus requires different architectural approaches to solving problems.
