---
title: "Does Safari's clipboardData actually work?"
author: Nicholas C. Zakas
permalink: /blog/2008/03/03/does-safari-s-clipboarddata-actually-work/
categories:
  - Web Development
tags:
  - Clipboard
  - JavaScript
  - Safari
  - WebKit
---
I've been playing around with the `clipboardData` object in Internet Explorer and Safari all weekend. IE's access is pretty straightforward, the object is located on `window` and always available. Safari adds `clipboardData` to the `event` object, but only during clipboard events. You can only read clipboard data in Safari in an `onpaste` event handler, but it's unclear when, if ever, you can set data to the clipboard. I've tried several things and haven't successfully been able to get data onto the clipboard.

Since `clipboardData` is only available during clipboard events, that means you can only use it in response to the user initiating one of these events and not in response to any other user action. I've tried overriding the `cut` and `copy` events, trying to set the clipboard data myself and using `preventDefault()` to cancel the default behavior, but this doesn't work.

I took a quick look at the <a title="ClipboardWin.cpp" rel="external" href="http://trac.webkit.org/projects/webkit/browser/trunk/WebCore/platform/win/ClipboardWin.cpp?rev=30621#L510">source code</a> and it looks like perhaps this feature just isn't enabled. It seems that the `types` property hasn't been implemented either, even though the <a title="Using the Pasteboard From JavaScript" rel="external" href="http://developer.apple.com/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Tasks/CopyAndPaste.html">documentation</a> says it should be there. The `setData()` method just returns `false` every time, I've tried using &#8220;text&#8221;, &#8220;Text&#8221;, and &#8220;text/plain&#8221; as the first argument but it doesn't seem to matter. Has anyone been able to set data onto the clipboard in Safari?
