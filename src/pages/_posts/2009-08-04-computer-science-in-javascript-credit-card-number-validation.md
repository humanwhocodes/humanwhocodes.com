---
title: 'Computer science in JavaScript: Credit card number validation'
author: Nicholas C. Zakas
permalink: /blog/2009/08/04/computer-science-in-javascript-credit-card-number-validation/
categories:
  - Web Development
tags:
  - Algorithms
  - Computer Science
  - JavaScript
---
Credit cards on the web sites have become just about as ubiquitous as sign-in forms. One of my favorite moments in computer science was learning the algorithm for determining a valid credit card number. The process doesn&#8217;t involve making a call to a server or checking accompanying information, just a basic algorithm that uses a check digit to determine if the credit card number is in the correct format.

## Identifier format

Credit card numbers, just like other magnetic stripe card, have an identifier format that is defined in [ISO/IEC 7812.][1] The format for such identifiers is made up of three parts:

  1. Issuer Identification Number (IIN) &#8211; an identifier indicating the institution that issued the number. The first digit indicates the type of institution issuing the number (for instance, banks are either 4 or 5, so all credit card numbers begin with one of these). The IIN contains six digits.
  2. Account Number &#8211; an identifier between 6 and 12 numbers long, inclusive.
  3. Check Digit &#8211; a single digit to validate the sum of the identifier.

Identifiers of this format can be between 13 and 19 digits long and used for any number of purposes, though most people deal strictly with credit card numbers.

## Luhn algorithm

Hans Peter Luhn, a scientist at IBM, developed [Luhn algorithm][2] to protect against unintentional mistakes in numeric identifiers (it is not a secure algorithm). This algorithm is the basis for magnetic strip identification cards, such as credit cards, as defined in [ISO/IEC 7812][1].

Luhn algorithm itself is quite simple and straightforward. Starting at the last digit in the identifier (the check digit), double every other digit&#8217;s value. If any of the doubled digits are greater than nine, then the number is divided by 10 and the remainder is added to one. This value is added together with the appropriate values for every other digit to get a sum. If this sum can be equally divisible by 10, then the number is valid. The check digit serves the purpose of ensuring that the identifier will by equally divisible by 10. This can be written in JavaScript as follows:

    //Luhn algorithm identifier verification
    //MIT Licensed
    function isValidIdentifier(identifier) {
    
        var sum     = 0,
            alt     = false,
            i       = identifier.length-1,
            num;
    
        if (identifier.length < 13 || identifier.length > 19){
            return false;
        }
    
        while (i >= 0){
    
            //get the next digit
            num = parseInt(identifier.charAt(i), 10);
    
            //if it's not a valid number, abort
            if (isNaN(num)){
                return false;
            }
    
            //if it's an alternate number...
            if (alt) {
                num *= 2;
                if (num > 9){
                    num = (num % 10) + 1;
                }
            } 
    
            //flip the alternate bit
            alt = !alt;
    
            //add to the rest of the sum
            sum += num;
    
            //go to next digit
            i--;
        }
    
        //determine if it's valid
        return (sum % 10 == 0);
    }

This method accepts a string `identifier` as its argument and returns a Boolean value indicating if the number it represents is valid. The argument is a string to allow easier parsing of each digit and to allow leading zeroes to be significant. Sample usage (sorry, no real numbers here):

    if (isValidIdentifier("0123765443210190")){
        alert("Valid!");
    }

Yes, I did test this on my own credit card numbers as a test. No you can&#8217;t have those sample files. <img src="{{site.url}}/blog/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

## Validation not verification

Keep in mind that Luhn algorithm is a validating algorithm, not a verifying one. Just because an identifier is in a valid format doesn&#8217;t mean that it&#8217;s a real identifier that&#8217;s currently in use. Luhn algorithm is best used to find unintentional errors in identifiers rather than providing any level of security. As with other parts of my computer science in JavaScript series, I&#8217;m not condoning its usage in real web applications for any reason, just introducing it as an interesting computer science topic that can be implemented in JavaScript.

This code, along with others from this series, is available on my [GitHub Computer Science in JavaScript project][3].

 [1]: http://en.wikipedia.org/wiki/ISO/IEC_7812
 [2]: http://en.wikipedia.org/wiki/Luhn_algorithm
 [3]: http://github.com/nzakas/computer-science-in-javascript/
