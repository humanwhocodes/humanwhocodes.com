---
title: Adventures in pointerless computing
author: Nicholas C. Zakas
permalink: /blog/2012/12/04/adventures-in-pointerless-computing/
categories:
  - Personal
tags:
  - Accessibility
  - Keyboard
---
A few people know that I've been battling a repetitive stress injury (RSI) in both of my elbows. I'm hit on all sides of the elbow: tennis elbow, golfer's elbow, and triceps tendinitis. I'm sure the stress has been building in these tendons for most of my career, but they really got bad last year once I left Yahoo. Being self-employed, I felt the need to work seven days a week and in all kinds of situations (coffee shops, dining room table, while watching TV, etc.) and, no big surprise, my arms started to rebel.

Since that time, I've made the appropriate adjustments to my work schedule and style. I no longer work directly on a laptop, instead using a laptop stand and separate keyboard. I favor working at home in my ergonomically setup office. I use Dragon Naturally Speaking to dictate almost every blog post, email, or other writing assignment (hence some funny typos, or I guess, speakos). I strictly stay off the computer on the weekends. I even ended up going to a physical therapist for a while. Unfortunately, the problem persists and has forced me to curtail my computing activity.

I had long since switched from a mouse to a trackball, which limits the range of motion my elbows need to make. Still, I felt like the movement from keyboard to trackball and back was placing undue stress on my right elbow. And so I decided to try computing without a pointing device. I unplugged the trackball so it wouldn't tempt me and went on my way.

The first thing I did was to go about my normal activities and see where I got tripped up. Fortunately, Windows 7 is very keyboard accessible and so using the operating system itself is pretty easy. The search functionality from the Start menu quickly ended up being my primary way of starting applications and opening specific folders. I only need to press the Windows button on the keyboard and the search immediately comes up. Very useful.

I needed to acquaint myself with switching, minimizing, and maximizing windows on my desktop. As it turns out, these are all pretty easy:

  * **Windows key + down arrow** minimizes the current window if it's not maximized. On maximized windows, the window gets restored.
  * **Windows key + up arrow maximizes the current window.>/li> 
    
      * **Windows key + left/right arrow pins the window to either the right or left of the desktop, or removes the pin (based on the direction of the arrow).**
      * **Alt + F4** closes the current window.
      * **Alt + spacebar** opens the system menu for a window (the one with minimize, maximize, etc. &#8211; especially useful for pasting into a command prompt).
    </strong></li> </ul> 
    
    Of course, there's also the old reliable Alt + Tab to switch between windows. I found that I needed to keep fewer windows open because it's very frustrating to cycle through more than a few windows at a time. Toggling back and forth between two windows is nice and easy, but anything more quickly becomes a challenge.
    
    Next I went to my web browser, Chrome, to learn how to navigate and debug (as is part of my daily routine). You're probably already familiar with using Ctrl + T to open up a new tab regardless of the browser you're using. Here are some of the other shortcuts I learned about:
    
      * **Ctrl + W** closes the current tab.
      * **Ctrl + Shift + W** closes all tabs (learned this by accident).
      * **Ctrl + Shift + T** reopen a previously closed tab.
      * **Alt + D** sets focus to the addressbar.
      * **Alt + F** opens the settings menu.
      * **F6** switches focus between the address bar, any toolbars you have installed, and the webpage.
      * **F12** toggles the developer tools while **Ctrl + Shift + J** always brings up the developer tools on the console tab.
    
    One of my biggest fears about going pointer lists it was losing the ability to debug code. Fortunately, the Chrome developer tools have a lot of keyboard shortcuts<sup>[1]</sup> as well. I'm still making my way through those, trying to figure out the fastest way to accomplish what I'm trying to do. There are still some oddities, like trying to switch focus from the console to the source code and back, but generally the developer tools are very usable with keyboard shortcuts. I successfully set breakpoints and step through code without much trouble. Debugging CSS is something I'm still working on because no right-click means no Inspect Element.
    
    I'm hopeful that my arms will recover and I'll be able to go back to computing as normal, but in the meantime, I'm embracing this opportunity to learn more about how computers work when you can't use a mouse. This whole experience has been a fantastic reminder that not everybody uses computers in the same way and small changes can make big differences.
    
        
      * [Chrome Developer Tools Keyboard Shortcuts][1]

 [1]: https://developers.google.com/chrome-developer-tools/docs/shortcuts
