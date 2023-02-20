---
title: Chrome tames wild dialogs and popups
author: Nicholas C. Zakas
permalink: /blog/2008/09/06/chrome-tames-wild-dialogs-and-popups/
categories:
  - Web Development
tags:
  - Chrome
  - Dialogs
  - Google
  - JavaScript
  - Popups
---
I decided to dig into <a rel="external" href="http://www.google.com/chrome/">Google Chrome</a> this weekend to see what sort of hidden gems were lurking just beneath the surface. I ended up with a deep exploration into how the browser handles dialogs (alert, prompt, and confirm) as well as popup windows and discovered some pretty interesting things.

First, Chrome has this interesting feature where it monitors the number of dialogs that have been displayed to the user. If two dialogs are displayed during the execution of a single thread, the second and each subsequent dialog have an additional checkbox on them allowing the user to disallow additional dialogs from being displayed (see below).

<p style="text-align: center;">
  <a href="/images/posts/2008/09/google_chrome_dialog.gif"><img class="size-medium wp-image-1742 alignnone" title="Google Chrome alert dialog with option to hide" src="https://humanwhocodes.com/blog/wp-content/uploads/2008/09/google_chrome_dialog-300x118.gif" border="0" alt="" width="300" height="118" /></a>
</p>

Once this checkbox is selected and the dialog is dismissed, no further dialogs (again, alert, confirm, or prompt) can be displayed by script until the page is reloaded. You can avoid this by showing only one dialog per execution. For instance, a user action that causes two alerts in a row to be displayed will also display this checkbox; two user actions that each cause an alert will circumvent this behavior. I think this is a helpful feature to prevent &#8220;alert hell&#8221; that forces you to kill the browser process, though I wish there was some way to determine if the dialog was actually displayed in script.

Up next: popup windows. The Google Chrome <a rel="external" href="http://www.google.com/chrome/intl/en/webmasters-faq.html#popups">Webmaster FAQ</a> states that popup windows are automatically minimized so you can only see the title bar in the lower-right corner of the page. This is only partially true. Popup windows that are initiated by a user action (click or key press) are displayed as normal. The only popup windows that are displayed in the lower-right corner of the window are those initiated outside of a user action. In other words, the popup windows that are typically blocked in other browsers are displayed in Chrome in the lower-right corner. So a popup window opened during the `onload` event handler will be minimized rather than blocked as it would be in Firefox and other browsers. The rationale is that this is a better experience for the developer, who doesn't have to worry about errors being thrown (which popup blockers do), and a better experience for the user who won't get blasted with a popup window upon entering a site.

These two features remind me of the innovations Firefox made in web browsing when it debuted, including changing the color of the location bar when on a secure site and disabling the OK button for five seconds when installed plugins. Firefox continues to innovate, and if Google Chrome can contribute in this vein as well, it will make for a better experience for everyone.
