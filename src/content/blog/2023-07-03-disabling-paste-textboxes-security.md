---
title: "Disabling paste in textboxes is not a security feature"
teaser: "This common, and annoying, pattern on many government and financial websites causes more problems than it solves."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - HTML
  - Security
  - Accessibility
  - Forms
  - JavaScript
---

I recently needed to make an online payment using my checking account. To do so, I was asked to input the routing number and account number for my account, which I did by pasting those values from my password manager (where I store all sensitive information). Then there was a third field: confirm account number. When I went to paste my account number into that box it didn't work. The form disallowed pasting into the box. A flurry of expletives dripped from my mouth, I found myself wondering why, in 2023, so many sites are still blocking paste in places where people are more likely to (and arguably should be) pasting values.

## How do websites disallow paste?

Disallowing paste in a website textbox is a straightforward process using JavaScript. You can use the `onpaste` attribute in the HTML of the textbox, like this:

```html
<input type="text" onpaste="return false">
```

Or you can disable paste inside of JavaScript code by canceling the default behavior of the paste event, like this:

```js
textbox.addEventListener("paste", event => event.preventDefault());
```

In either case, the paste operation is blocked both from keyboard shortcuts (like Ctrl+V or Cmd+V) and from context menus.

(Some less experienced developers may try to block the keyboard shortcuts directly but that still allows paste using the context menu.) 

## What types of fields disallow paste?

Looking across my recent browsing history, I've found instances where paste was blocked when entering any of the following pieces of data:

* Email addresses
* Passwords
* Account numbers
* Personal identification numbers (Social Security number, driver's license number, etc.)

Aside from email addresses, the other three are sensitive data that you wouldn't want to accidentally share with people. That gives a hint that part of the reason for disabling paste concerns security in some way.

## How are websites disabling paste?

How websites block paste is also interesting, because there seem to be two specific patterns:

* **Paste is just blocked outright.** This tends to happen with passwords, account numbers, and personal identification numbers when there is just one textbox to fill in with this information.
* **Paste is blocked on a second textbox only.** This is a confirmation flow, where you are asked, for example, to enter your email address and then to confirm your email address in the second textbox.

These two patterns seem to indicate two different reasons for blocking paste: fear of attacks and fear of incorrect information.

### Fear of attacks

It seems like every week we hear about a major security breach at a company that stores millions of usernames and passwords. The result is a massive text file with usernames, passwords, and other sensitive information tied directly to email addresses. It happens so frequently that there is a website[^1] that checks these data dumps to see if your email address is associated with any of the breaches. This is a good place to start understanding the paranoia that leads to disabling paste on single textboxes.

The theory is simple: legitimate users don't paste values into textboxes, they type values into textboxes. People pasting sensitive values into a textbox are clearly copying from a big list of data trying to access someone else's account. Therefore, it's safe to assume that no legitimate user would need to paste a value into a textbox. Right?

Of course, password management software is designed for pasting values. You look up the value that you want, copy it to the clipboard, and paste it in. Personally, I also use my password manager to store other important pieces of information that I might need online such as credit card numbers, driver's license number, etc. All of these are important to get correct and I wouldn't trust myself to type them in repeatedly without making an error. Disabling paste on textboxes effectively eliminates one of the key benefits of password managers. But does disabling paste actually improve security in some way?

While I could not find any guidance suggesting that disabling paste led to more secure websites, I did find guidance suggesting that paste be allowed. The National Institute of Standards and Technology (NIST) Special Publication 800-63B[^2], which lays out identity guidelines for the U.S. government, explicitly states:

> Verifiers SHOULD permit claimants to use "paste" functionality when entering a memorized secret. This facilitates the use of password managers, which are widely used and in many cases increase the likelihood that users will choose stronger memorized secrets.

If the guidance from NIST isn't enough, the proposed Web Content Accessibility Guidelines (WCAG) 2.2 Section 3.3.8[^3] also explicitly recommends allowing paste along with password managers:

> Examples of mechanisms that satisfy this criterion include:
>
> * support for password entry by password managers to reduce memory need, and
> * copy and paste to reduce the cognitive burden of re-typing.

So there are two resources, one security focused from NIST and one accessibility focused from the W3C, that recommend allowing paste in various circumstances.

Keep in mind one other important factor: a real hacker, someone who intends to infiltrate a system to some nefarious end, will not be dissuaded by disabling paste in a textbox. There are so many trivial ways to work around this limitation (discussed later) that it's hard to imagine any determined individual deciding not to continue what they are doing because Ctrl+V didn't work.

### Fear of incorrect information

When paste is blocked on a second textbox that is intended to confirm the value in the first textbox, it seems that there is a concern over getting the correct information sent to the server.[^4] You've probably seen this as "Confirm your email" or "Confirm your account number" labels. In such cases, receiving incorrect information is a problem because you may not have the ability to verify or update the information later.

The primary concern here appears to be not that you're a "hacker" using credentials that aren't yours, but rather that you will simply copy the value from the first textbox into the second textbox. And if you happened to enter an incorrect value in that first textbox then you'll just blindly copy it into the second textbox without thinking. That seems like a valid concern but I still question the efficacy of disallowing paste for this type of validation.

What is more confusing is that you can typically paste into the first textbox but not the second. It seems that the thinking is as follows: even if you paste in an incorrect value in the first textbox, by forcing you to type the value into the second textbox you will find your mistake and fix it. Once again, there is some logic here, but is that enough to warrant disabling paste?

Once again, I would argue that blocking paste is a net negative to the user experience here. If someone is being diligent and using a password manager or some other credential store to ensure that they are always entering the correct information, it's annoying to penalize them and force them to manually type in a value that is important to enter correctly. Fortunately, there is another approach that doesn't require any more work than blocking paste.

If the concern is copying the value from the first textbox into the second textbox then it makes more sense to disable copy on the first textbox rather than disabling paste on the second. So instead of doing this:

```html
<label> Email Address: <input type="text" name="email"></label><br>
<label>Confirm Email: <input type="text" name="confirm_email" onpaste="return false"></label>
```

Do this instead:

```html
<label> Email Address: <input type="text" name="email" oncopy="return false"></label><br>
<label>Confirm Email: <input type="text" name="confirm_email"></label>
```

By disabling copy in the first textbox you allow paste in both textboxes, enabling the use of password managers while still preventing the user from copying the value directly from the first textbox into the second.

It's worth noting, that the proposed WCAG 2.2 also has a section (3.3.7) about redundant data entry[^5] that states:

> Information previously entered by or provided to the user that is required to be entered again in the same process is either:
>
> * auto-populated, or
> * available for the user to select.
>
> Except when:
>
> * re-entering the information is essential,
> * the information is required to ensure the security of the content, or
> * previously entered information is no longer valid.

So it seems there are accessibility concerns around forcing people to enter the same value multiple times as well.

## Working around textboxes with disabled paste

There are a handful of ways to work around textboxes that have paste disabled, and they all take less than a minute:

* **Use the DevTools console.** Right-click on the textbox and click "Inspect". Then hit the Esc key to open the console. In the console type `$0.value ="whatever value you want"` and hit Enter. While doing that, you can paste the value in between the quotation marks. This inserts the value directly into the textbox.
* **Use the DOM inspector.** Right-click on the textbox and click "Inspect". If you see `onpaste="return false"` in the DOM representation of the textbox, right click on it and click "Edit as HTML" to remove the attribute. You can then paste into the textbox.
* **Disable JavaScript, paste the value, re-enable JavaScript.** Because disabling paste relies on JavaScript, you can just disable it temporarily and paste in your value. This is easily accomplished using the DevTools panel built into every web browser.[^6]
* **In Firefox, disable clipboard events.** Firefox has a specific configuration setting called `dom.events.clipboardevents.enabled` that you can set to false in `about:config`[^7] to disable all cut, copy, and paste events on all websites. This is a bit of a blunt instrument but will get the job done. 
* **Use a browser plugin.** There are several browser plugins that ensure paste isn't blocked on any textbox. Don't F*** With Paste[^8] is for Chromium and Stop the Madness[^9] is for iOS and MacOS.
* **Use a paste-to-keystrokes program.** This is overkill given all of the other available options, but there are some programs that convert paste into keystrokes to get around paste disabling. ClickPaste[^10] is one of these programs for Windows.

If you aren't already convinced that disabling paste is a futile endeavor, I hope this list of available workarounds makes it apparent that disabling paste will never stop a malicious actor from doing what they came to do.

## Conclusion

It seems clear that blocking paste in textboxes is designed to either prevent malicious usage or prevent incorrect data from being entered into forms. Given the prevalence of websites that disable paste in textboxes, you would think that there would be some authoritative resource recommending this pattern. Throughout my research, I've been unable to find any such resource, while finding both security and accessibility resources recommending against disabling paste were fairly easy to find.

For anyone even a little bit technically inclined, the workarounds to paste-disabled textboxes are both trivial and fast, with numerous options depending on how you want to configure your experience. The ubiquity of workarounds is a strong indication that any potential security benefit is unlikely as malicious actors will not be deterred by disabling paste. On the other hand, disabling paste has both security and accessibility concerns.

My feeling is that there may have been, at one point in time, some resources directing websites to block paste in certain situations. I can imagine the first few years of online banking generating a lot of fear and obtuse design patterns intended to improve security. Perhaps every rewrite of these websites simply copied the behavior of the previous website without thinking too deeply about the user experience or security implications.

Whatever the reason may be, there is no good reason to block paste in textboxes in 2023. It's time to put this anti-pattern behind us for good.

[^1]: [Have I Been Pwned?](https://haveibeenpwned.com/)
[^2]: [NIST Special Publication 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html)
[^3]: [WCAG 2.2 - Accessible Authentication (Minimum)](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum)
[^4]: [StackOverflow: Disable Copy or Paste action for text box?](https://stackoverflow.com/questions/24424214/disable-copy-or-paste-action-for-text-box)
[^5]: [WCAG 2.2 - Redundant Entry](https://www.w3.org/TR/WCAG22/#redundant-entry)
[^6]: [Chrome - Disable JavaScript](https://developer.chrome.com/docs/devtools/javascript/disable/)
[^7]: [How to enable pasting text on sites that block it](https://www.howtogeek.com/251807/how-to-enable-pasting-text-on-sites-that-block-it/)
[^8]: [Don't F*** With Paste](https://chrome.google.com/webstore/detail/dont-f-with-paste/nkgllhigpcljnhoakjkgaieabnkmgdkb)
[^9]: [Stop the Madness](https://underpassapp.com/StopTheMadness/)
[^10]: [ClickPaste](https://github.com/Collective-Software/ClickPaste)
