---
title: 'eval() isn't evil, just misunderstood'
author: Nicholas C. Zakas
permalink: /blog/2013/06/25/eval-isnt-evil-just-misunderstood/
categories:
  - Web Development
tags:
  - eval
  - JavaScript
---
In all of JavaScript, I'm not sure there is a more maligned piece than `eval()`. This simple function designed to execute a string as JavaScript code has been the more source of more scrutiny and misunderstanding during the course of my career than nearly anything else. The phrase &#8220;eval() is evil&#8221; is most often attributed to Douglas Crockford, who has stated<sup>[1]</sup>:

> The `eval` function (and its relatives, `Function`, `setTimeout`, and `setInterval`) provide access to the JavaScript compiler. This is sometimes necessary, but in most cases it indicates the presence of extremely bad coding. The `eval` function is the most misused feature of JavaScript.

Since Douglas hasn't put dates on most of his writings, it's unclear whether he actually coined the term as an article in 2003<sup>[2]</sup> also used this phrase without mentioning him. Regardless, it has become the go-to phrase for anyone who sees `eval()` in code, whether or not they really understand its use.

Despite popular theory (and Crockford's insistence), the mere presence of `eval()` does not indicate a problem. Using `eval()` does not automatically open you up to a Cross-Site Scripting (XSS) attack nor does it mean there is some lingering security vulnerability that you're not aware of. Just like any tool, you need to know how to wield it correctly, but even if you use it incorrectly, the potential for damage is still fairly low and contained.

## Misuse

At the time when &#8220;eval() is evil&#8221; originated, it was a source of frequent misuse by those who didn't understand JavaScript as a language. What may surprise you is that the misuse had nothing to do with performance or security, but rather with not understanding how to construct and use references in JavaScript. Suppose that you had several form inputs whose names contained a number, such as &#8220;option1&#8243; and &#8220;option2&#8243;, it was common to see this:

    function isChecked(optionNumber) {
        return eval("forms[0].option" + optionNumber + ".checked");
    }
    
    var result = isChecked(1);

In this case, the developer is trying to write `forms[0].option1.checked` but is unaware of how to do that without using `eval()`. You see this sort of pattern a lot in code that is around ten years old or older as developers of that time just didn't understand how to use the language properly. The use of `eval()` is inappropriate here because it's unnecessary not because it's bad. You can easily rewrite this function as:

    function isChecked(optionNumber) {
        return forms[0]["option" + optionNumber].checked;
    }
    
    var result = isChecked(1);

In most cases of this nature, you can replace the call to `eval()` by using bracket notation to construct the property name (that is, after all, one reason it exists). Those early bloggers who talked about misuse, Crockford included, were mostly talking about this pattern.

## Debugability

A good reason to avoid `eval()` is for debugging purposes. Until recently, it was impossible to step into `eval()`ed code if something went wrong. That meant you were running code into a black box and then out of it. Chrome Developer Tools can now debug `eval()`ed code, but it's still painful. You have to wait until the code executes once before it shows up in the Source panel.

Avoiding `eval()`ed code makes debugging easier, allowing you to view and step through the code easily. That doesn't make `eval()` evil, necessarily, just a bit problematic in a normal development workflow.

## Performance

Another big hit against `eval()` is its performance impact. In older browsers, you encountered a double interpretation penalty, which is to say that your code is interpreted and the code inside of `eval()` is interpreted. The result could be ten times slower (or worse) in browsers without compiling JavaScript engines.

With today's modern compiling JavaScript engines, `eval()` still poses a problem. Most engines can run code in one of two ways: fast path or slow path. Fast path code is code that is stable and predictable, and can therefore be compiled for faster execution. Slow path code is unpredictable, making it hard to compile and may still be run with an interpreter<sup>[3]</sup>. The mere presence of `eval()` in your code means that it is unpredictable and therefore will run in the interpreter &#8211; making it run at &#8220;old browser&#8221; speed instead of &#8220;new browser&#8221; speed (once again, a 10x difference).

Also of note, `eval()` makes it impossible for YUI Compressor to munge variable names that are in scope of the call to `eval()`. Since `eval()` can access any of those variables directly, renaming them would introduce errors (other tools like Closure Compiler and UglifyJS may still munge those variables &#8211; ultimately causing errors).

So performance is still a big concern when using `eval()`. Once again, that hardly makes it evil, but is a caveat to keep in mind.

## Security

The trump card that many pull out when discussing `eval()` is security. Most frequently the conversation heads into the realm of XSS attacks and how `eval()` opens up your code to them. On the surface, this confusion is understandable, since by its definition `eval()` executes arbitrary code in the context of the page. This can be dangerous if you're taking user input and running it through `eval()`. However, if your input isn't from the user, is there any real danger?

I've received more than one complaint from someone over a piece of code in my CSS parser that uses `eval()`<sup>[4]</sup>. The code in question uses `eval()` to convert a string token from CSS into a JavaScript string value. Short of creating my own string parser, this is the easiest way to get the true string value of the token. To date, no one has been able or willing to produce an attack scenario under which this code causes trouble because:

  1. The value being `eval()`ed comes from the tokenizer.
  2. The tokenizer has already verified that it's a valid string.
  3. The code is most frequently run on the command line.
  4. Even when run in the browser, this code is enclosed in a closure and can't be called directly.

Of course, since this code has a primary destination of the command line, the story is a bit different.

Code designed to be used in browsers face different issues, however, the security of `eval()` typically isn't one of them. Once again, if you are taking user input and passing it through `eval()` in some way, then you are asking for trouble. Never ever do that. However, if your use of `eval()` has input that only you control and cannot be modified by the user, then there are no security risks.

The most common attack vector cited these days is in `eval()`ing code that is returned from the server. This pattern famously began with the introduction of JSON, which rose in popularity specifically because it could quickly be converted into a JavaScript by using `eval()`. Indeed, Douglas Crockford himself used `eval()` in his original JSON utility due to the speed with which it could be converted. He did add checks to make sure there was no truly executable code but the implementation was fundamentally `eval()`.

These days, most use the built-in JSON parsing capabilities of browsers for this purpose, though some still fetch arbitrary JavaScript to execute via `eval()` as part of a lazy-loading strategy. This, some argue, is the real security vulnerability. If a man-in-the-middle attack is in progress, then you will be executing arbitrary attacker code on the page.

The man-in-the-middle attack is wielded as the ever-present danger of `eval()`, opening the security can of worms. However, this is one scenario that doesn't concern me in the least, because anytime you can't trust the server you're contacting means any number of bad things are possible. Man-in-the-middle attacks can inject code onto the page in any number of ways:

  1. By returning attacker-controlled code for JavaScript loaded via `<script src="">`.
  2. By returning attacker-controlled code for JSON-P requests.
  3. By returning attacker-controlled code from an Ajax request that is then `eval()`ed.

Additionally, such an attack can easily steal cookies and user data without altering anything, let alone the possibility for phishing by returning attacker-controlled HTML and CSS.

In short, `eval()` doesn't open you up to man-in-the-middle attacks any more than loading external JavaScript does. If you can't trust the code from your server then you have much bigger problems than an `eval()` call here or there.

## Conclusion

I'm not saying you should go run out and start using `eval()` everywhere. In fact, there are very few good use cases for running `eval()` at all. There are definitely concerns with code clarity, debugability, and certainly performance that should not be overlooked. But you shouldn't be afraid to use it when you have a case where `eval()` makes sense. Try not using it first, but don't let anyone scare you into thinking your code is more fragile or less secure when `eval()` is used appropriately.

## References

  1. [About JSLint][1] by Douglas Crockford (JSLint)
  2. [Eval is evil, Part One][2] by Eric Lippert (Eric's blog)
  3. [Know Your Engines][3] by David Mandelin (SlideShare)
  4. [eval() usage in my CSS parser][4] by me (GitHub)

 [1]: http://www.jslint.com/lint.html
 [2]: http://blogs.msdn.com/b/ericlippert/archive/2003/11/01/53329.aspx
 [3]: http://www.slideshare.net/newmovie/know-yourengines-velocity2011
 [4]: https://github.com/nzakas/parser-lib/blob/master/src/css/PropertyValuePart.js#L145
