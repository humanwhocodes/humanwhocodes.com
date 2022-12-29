---
title: ScriptDoc
author: Nicholas C. Zakas
permalink: /blog/2007/07/02/scriptdoc/
categories:
  - Web Development
tags:
  - Documentation
  - JavaScript
  - JSDoc
  - ScriptDoc
---
I came across this in my usual readings today and thought I&#8217;d share. It looks like Microsoft is promoting (via numerous blog postings) <a title="ScriptDoc" rel="external" href="http://www.codeplex.com/scriptdoc">ScriptDoc</a> as a free way to generate XML documentation for JavaScript. It uses a style similar to the C# XML comments with one major difference: the comments actually go *inside* of the function instead of outside. Example (from the site):

<code class="block"> </code>

<pre>this.getItem = function(index) {
    ///
    /// Gets an item in the filtered data by index.
    ///
    /// The index in the filtered data of the row to return.
    /// Null if the row was not found.
    return _filteredTable ? _filteredTable[index] : null;
}</pre>

Can I just say that I hate this format? I&#8217;m guessing that putting the comments inside of the function allows the processor to pull the comments out of the source code of a function more easily than trying to match outside comments to a following function&#8230;but I still don&#8217;t like it. I&#8217;ve tried writing this format and only got frustrated. It feels unintuitive compared to how I write comments for other languages (even C#).

I must say I really don&#8217;t like the direction that Microsoft is taking JavaScript and it saddens me to see free tools promoting Microsoft&#8217;s way rather than the way most people write JavaScript (documentation, for instance, more like <a title="JSDoc" rel="external" href="http://jsdoc.sourceforge.net">JSDoc</a>).
