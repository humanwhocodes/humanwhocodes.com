---
title: Making an accessible dialog box
author: Nicholas C. Zakas
permalink: /blog/2013/02/12/making-an-accessible-dialog-box/
categories:
  - Web Development
tags:
  - Accessibility
  - JavaScript
---
In today's web applications, dialog boxes are about as common place as they are in desktop applications. It's pretty easy to show or hide an element that is overlayed on the page using a little JavaScript and CSS but few take into account how this affects accessibility. In most cases, it's an accessibility disaster. The input focus isn't handled correctly and screen readers aren't able to tell that something is changed. In reality, it's not all that difficult to make a dialog that's fully accessible, you just need to understand the importance of a few lines of code.

## ARIA roles

If you want screen reader users to be aware that a dialog has popped up, then you'll need to learn a little bit about Accessible Rich Internet Applications (ARIA) roles. ARIA<sup>[1]</sup> roles supply additional semantic meaning to HTML elements that allow browsers to communicate with screen readers in a more descriptive way. There are a large number of roles that alter the way screen readers perceive different elements on the page. When it comes to dialogs, there are two of interest: `dialog` and `alertdialog`.

In most cases, `dialog` is the role to use. By setting this as the value of the `role` attribute on an element, you are informing the browser that the purpose of the element is as a dialog box.

    <div id="my-dialog" role="dialog">
        <-- Your dialog code here -->
    </div>
    

When an element with a role of `dialog` is made visible, the browser tells the screen reader that a new dialog has been opened. That lets the screen reader user recognize that they are no longer in the regular flow of the page. 

Dialogs are also expected to have labels. You can specify a label using either the `aria-label` attribute to indicate the label text or the `aria-labelledby` attribute to indicate the ID of the element that contains the label. Here are a couple of examples:

    <div id="my-dialog" role="dialog" aria-label="New Message">
        <-- Your dialog code here -->
    </div>
    
    <div id="my-dialog" role="dialog" aria-labelledby="dialog-title">
        <h3 id="dialog-title">New Message</h3>
        <-- Your dialog code here -->
    </div>
    

In the first example, the `aria-label` attribute is used to specify a label that is only used by screen readers. You would want to do this when there is no visual label for the dialog. In the second example, the `aria-labelledby` attribute is used to specify the ID of the element containing the dialog label. Since the dialog has a visual label, it makes sense to reuse that information rather than duplicate it. Screen readers announce the dialog label when the dialog is displayed.

The role of `alertdialog` is a specialized type of dialog that is designed to get a user's attention. Think of this as a confirmation dialog when you try to delete something. An `alertdialog` has very little interactivity. It's primary purpose is to get the user's attention so that an action is performed. Compare that to a `dialog`, which may be an area for the user to enter information, such as writing a new e-mail or instant message.

When an `alertdialog` is displayed, screen readers look for a description to read. It's recommended to use the `aria-describedby` element to specify which text should be read. Similar to `aria-labelledby`, this attribute is the ID of an element containing the content to read. If `aria-describedby` is omitted, then the screen reader will attempt to figure out which text represents the description and will often choose the first piece of text content in the element. Here's an example:

    <div id="my-dialog" role="alertdialog" aria-describedby="dialog-desc">
        <p id="dialog-desc">Are you sure you want to delete this message?</p>
        <-- Your dialog code here -->
    </div>
    

This example uses an element to contain the description. Doing so ensures that the correct text will be read when the dialog is displayed.

Even if you omit the extra attributes and just use the appropriate `role` for your dialogs, the accessibility of the application improves tremendously.

## Setting focus to the dialog

The next part of creating an accessible dialog is to manage focus. When a dialog is displayed, the focus should be placed inside of the dialog so users can continue to navigate with the keyboard. Exactly where inside the dialogue focus is set depends largely on the purpose of the dialogue itself. If you have a confirmation dialog with one button to continue in one button to cancel then you may want the default focus to be on the cancel button. If you have a dialog where the user is supposed to enter text, then you may want the focus to be on the text box by default. If you can't figure out where to set focus, then a good starting point is to set focus to the element representing the dialog.

Since most of the time you will be using a `<div>` element to represent a dialog, you can't set focus to it by default. Instead, you'll need to enable focus on that element by setting the `tabIndex` property to -1. This allows you to set focus to the element using JavaScript but doesn't insert the element into the normal tab order. That means users won't be able to press tab to set focus to the dialog. You can either do this directly in HTML or in JavaScript. For HTML:

    <div id="my-dialog" role="dialog" tabindex="-1" aria-labelledby="dialog-title">
        <h3 id="dialog-title">New Message</h3>
        <-- Your dialog code here -->
    </div>
    

For JavaScript:

    var div = document.getElementById("my-dialog");
    div.tabIndex = -1;
    div.focus();
    

Once `tabIndex` is set to -1, you can call `focus()` on the element just like any other focusable element. Then the user is able to press tab to navigate within the dialog.

## Trapping focus

Another accessibility issue with dialogs is making sure that focus doesn't go back outside of the dialog. In many cases, a dialog is considered to be modal and therefore focus shouldn't be able to escape the dialog. That the dialog is open and pressing tab ends up setting focus behind the dialogue then it's incredibly difficult for a keyboard user to get back to the dialogue. So, it's best to prevent that from happening by using a little bit of JavaScript.

The basic idea behind this technique is to use event capturing to listen for the `focus` event, a technique popularized by Peter-Paul Koch<sup>[2]</sup> and now in use by most JavaScript libraries. Since `focus` doesn't bubble, you can't capture it on that side of the event flow. Instead, you can intercept all `focus` events on the page by using event capturing. Then, you need only determine if the element that received focus is in the dialog or not. If not, set the focus back to the dialog. The code is pretty simple:

    document.addEventListener("focus", function(event) {
    
        var dialog = document.getElementById("my-dialog");
    
        if (dialogOpen &#038;&#038; !dialog.contains(event.target)) {
            event.stopPropagation();
            dialog.focus();
        }
    
    }, true);

This code listens for the `focus` event on the document so as to intercept all such events before the target element receives them. Assume a `dialogOpen` variable is set to true when the dialog is open. When a `focus` event occurs, this function traps the event and checks to see if the dialog is open, and if so, if the element receiving focus is within the dialog. If both conditions are met, then focus is set back to the dialog. This has the effect of looping focus around from the bottom of the dialogue back to the top. The result is that you can't tab out of the dialog and so it's a lot harder for a keyboard user to get lost.

If you are using a JavaScript library, chances are that it has a way of delegating the `focus` event in such a way that you can achieve this same effect. If you need to support Internet Explorer 8 and earlier without a JavaScript library, then use the `focusin` event instead.

## Restoring focus

The last part of the focus puzzle with dialog has to do with restoring focus to the main part of the page when the dialog is closed. The idea is simple: in order to open the dialog, the user probably activated a link or a button. The focus then shifted into the dialog, where the user accomplish some task and then dismissed the dialog. The focus should move back to the link or button that was clicked to open the dialog so that it's possible to continue navigating the page. This is an often overlooked aspect of dialog in web applications, but it makes a huge difference.

As with the other sections, this requires very little code to work. All browsers support `document.activeElement`, which is the element that currently has focus. All you need to do is query this value before showing the dialog and then set focus back to that element when the dialog is closed. For example:

    var lastFocus = document.activeElement,
        dialog = document.getElementById("my-dialog");
    
    dialog.className = "show";
    dialog.focus();
    

The important part of this code is that it keeps track of the last focused element. That way, all you need to do when the dialog is closed is to set focus back to it:

    lastFocus.focus()

In total, this adds to very short lines of code to what you probably have already for your dialog.

## Exiting the dialog

The very last piece of the puzzle is to allow the user a quick and easy way to exit the dialog. The best way is to have the Esc key close the dialog. This is the way dialogs work in desktop applications and so it's very familiar to users. Just listen for the Esc key to be pressed and then exit the dialog, such as:

    document.addEventListener("keydown", function(event) {
        if (dialogOpen &#038;&#038; event.keyCode == 27) {
            // close the dialog
        }
    }, true);

The `keyCode` value for the Esc key is 27, so you need only look for that during the `keydown` event. Once received, close the dialog and set focus back to the previously focused element.

## Conclusion

As I hope is obvious from this post, it really doesn't take a lot of extra code to create a dialog that is easily accessible both by screen readers and those who use only a keyboard. For just a few lines of code you can take your users from being incredibly frustrated to being incredibly happy. There are a lot of web applications out there that use pop-up dialogs but very few get all of these pieces correct. Going halfway leads to more frustration than anything else, so I hope this post has inspired you to make your dialogs as accessible as possible.


  1. [WAI-ARIA][1] (W3C)
  2. [Delegating the focus and blur events][2] by Peter-Paul Koch (Quirksmode)

 [1]: http://www.w3.org/WAI/intro/aria.php
 [2]: http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
