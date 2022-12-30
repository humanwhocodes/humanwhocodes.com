---
title: The sorry state of the CSS3 specifications
author: Nicholas C. Zakas
permalink: /blog/2011/01/11/the-sorry-state-of-the-css3-specifications/
categories:
  - Web Development
tags:
  - CSS
  - CSS3
  - W3C
---
With the recent support of CSS3 in browsers approaching an impressive level of consistency, you might be inclined to believe that CSS3 is a well-defined specification suitable for public consumption. You would be wrong on several counts. First and foremost, CSS3 is not a single specification but a collection of module specifications<sup>1</sup>. The logic behind separating out various parts into individual specs is that it's easier to move forward on a small group of functionality than to move along one giant specification (see HTML5). The idea certainly has merit but the actual implementation of the idea is beyond poor and many of the module specifications are in a serious state of disarray. I've tried bringing some of these concerns up on the public mailing list (www-style<sup>2</sup>) but have received little feedback or response, so I'm laying out my complaints and concerns here.

## Organization

The first problem with the specs is that they are organized in very different ways. This might seem like an obvious problem when a large spec is separated into multiple smaller ones, but considering that many of the specs share editors, it seems like there shouldn't be great difficulty in keeping cross-spec consistency. Yet there are vast differences between how the specs are setup. For instance, if you would like to find grammars for various parts of CSS3, here are the sections in which you would look:

  * CSS3 Syntax -Appendix: Second grammar<sup>3</sup>
  * CSS3 Media Queries &#8211; Syntax<sup>4</sup>
  * CSS3 Selectors &#8211; The grammar of Selectors<sup>5</sup>
  * CSS3 Namespaces &#8211; Declaring Namespaces: the @namespace rule<sup>6</sup>
  * CSS3 Style Attributes &#8211; Syntax and Parsing<sup>7</sup>
  * CSS3 Paged Media &#8211; Page Selectors and Page Context<sup>8</sup>

Additionally, there are some CSS specifications that don't have their associated grammar rules within the spec. All of this makes trying to implement a CSS3 parser incredibly difficult. You must search for the relevant pieces of information in places that aren't immediately apparent from the table of contents for the spec. The rest of the outlines are also frequently out-of-sync, so related information may be in completely separate sections from spec to spec.

What I would like to see is a general outline followed by all of the CSS specs so you know exactly where to go to find the same information in each spec. Here's my suggested outline template:

  1. Introduction 
      1. Overview
      2. Dependencies
      3. Terminology
      4. Background/Additional Information
  2. (Main Section 1)
  3. (Main Section 2)
  4. (Main Section n)
  5. Syntax 
      1. Grammar
      2. Lexical Scanner
  6. Tests
  7. Acknowledgments
  8. References

Moving towards a unified format for these specifications would go a long way towards making reading the specs more rational.

## Grammar inconsistencies

Still talking about CSS3 grammar &#8211; there is, in fact, no single source of truth for the CSS3 grammar. CSS 2.1 had a well-defined grammar<sup>9</sup> included in the overall spec (this is part of the reason I started by building a CSS 2.1 parser instead of jumping right to CSS3). There is the aforementioned CSS3 Syntax specification that I assumed would contain the complete CSS3 syntax. The description says, &#8220;contains the generic (forward-compatible) grammar that all levels of CSS adhere to.&#8221; That sounds good until you realize that the spec hasn't been updated since 2003.

Another interesting anecdote is that none of the other CSS3 specs even reference the CSS3 Syntax spec &#8211; the ones that do have grammars always build off of the CSS 2.1 grammar. The grammar laid out in CSS3 Syntax is a fair bit more rationalized, but since no one is using it, the spec has little value.

I thought that so long as the CSS3 modules were being built off of the same base grammar that everything would still be okay. Once again, I was sorely disappointed to find that grammars across specs were defined in inconsistent and sometimes contradictory fashion. It's as if each CSS3 module is being defined in a vacuum without regard for any of the other modules.

For example, CSS3 Media Queries defines the following in its grammar:

    {N}{O}{T}         {return  NOT;}

There's nothing obviously bad about this until you look at the grammar in CSS3 Selectors:

    ":"{N}{O}{T}"("  return  NOT;

Two completely different tokens used for two completely different purposes share the same token name. And this isn't the only inconsistency in the grammars of CSS3 modules.

There are also errors to be found in the grammars. For instance, CSS3 Paged Media defines the following:

    page:
        PAGE_SYM S* IDENT? pseudo_page? S*
        '{' S* [ declaration | margin ]? [ ';' S* [ declaration | margin ]? ]* '}' S*
        ;
    

If this grammar were true, then the following example that appears elsewhere in the spec would be invalid:

    @page :first {
        color: green;
    
        @top-left {
            content: "foo";
            color: blue;
        }
    
        @top-right {
            content: "bar";
        }
    }
    

Can you spot the error? According to the grammar, there must be a comma before @top-right. However, this example works in browsers that support paged media, so it's the grammar that's actually incorrect.

The entirety of CSS3 grammar really needs a good cleanup to bring the various modules into alignment and correction of any outstanding errors (apparently the one I mentioned in CSS3 Paged Media has been around for quite a while<sup>10</sup>).

## What can be done?

There's clearly a lot of work that needs to be done to clean up the CSS3 specs. The steps I'd like to see taken by the W3C are:

  * Removal of old specs that are no longer being worked on (such as CSS3 Syntax). Keeping these around and displayed at the same level as important specs like CSS3 Selectors is confusing.
  * Come up with a common specification format for all CSS3 specs and rewrite each to follow the common format.
  * Rationalize grammar rules across the specs, ensuring that there aren't duplicate token names or productions defined for different purposes. Browsers have already implemented a lot of the questionable specs, so use their source code (at least the open source ones) to help figure out how to address these issues.
  * Decide if CSS3 Syntax should ever be used or if all of CSS3 is an extension of the CSS2 grammar.

I realize that each of these may be a decent amount of work, but if CSS3 is to be taken seriously and continue to evolve, these specifications need to be cleaned up. If web standards are to succeed then they must be well-defined so that interpretation isn't left to the implementers. HTML5 is doing a good job of this elsewhere in the W3C, and I'd really like to see CSS3 follow suit.

## References

  1. [CSS3 Specifications][1]
  2. [Public Mailing Lists &#8211; WWW-Style][2]
  3. [CSS3 Syntax -Appendix: Second grammar][3]
  4. [CSS3 Media Queries &#8211; Syntax][4]
  5. [CSS3 Selectors &#8211; The grammar of Selectors][5]
  6. [CSS3 Namespaces &#8211; Declaring Namespaces: the @namespace rule][6]
  7. [CSS3 Style Attributes &#8211; Syntax and Parsing][7]
  8. [CSS3 Paged Media &#8211; Page Selectors and Page Context][8]
  9. [CSS2 Grammar][9]
 10. [Re: Inconsistencies across CSS3 specs (www-style)][10]

 [1]: http://www.w3.org/Style/CSS/specs
 [2]: http://lists.w3.org/Archives/Public/www-style/
 [3]: http://www.w3.org/TR/css3-syntax/#detailed-grammar
 [4]: http://www.w3.org/TR/css3-mediaqueries/#syntax
 [5]: http://www.w3.org/TR/css3-selectors/#w3cselgrammar
 [6]: http://www.w3.org/TR/css3-namespace/#declaration
 [7]: http://www.w3.org/TR/css-style-attr/#syntax
 [8]: http://www.w3.org/TR/css3-page/#page-selector-and-context
 [9]: http://www.w3.org/TR/CSS2/grammar.html
 [10]: http://lists.w3.org/Archives/Public/www-style/2010Dec/0196.html
