---
title: 'Computer science in JavaScript: Base64 encoding'
author: Nicholas C. Zakas
permalink: /blog/2009/12/08/computer-science-in-javascript-base64-encoding/
categories:
  - Web Development
tags:
  - Base64
  - Computer Science
  - JavaScript
---
Not too long ago, I wrote about [data URIs][1] and released a [couple of tools][2] to help generate them. A key part of the data URI equation is [base64 encoding][3]. Base64 encoding is described in [RFC 3548][4], along with base16 and base 32 encodings, all of which are ways to represent single-byte data with a limited character set. A common and unfortunate misconception is that base64 encoding is an encryption algorithm designed to obscure the underlying data. Base64 encoding provides no encryption, it simply translates one form of data into another following a single algorithm.

All three encodings, base16, base32, and base64 were defined so that data could be transmitted in a safe manner without risk of data loss when passed through 7-bit systems. Email traditionally was a 7-bit system, and MIME base64 encoding was originally defined to enable data to safely be transmitted from one system to the next. In short, these encodings were created to protect against data corruption when 8-bit data might be transmitted through or by 7-bit systems.

## How does it work?

Base64 encoding works directly on the underlying binary representation of data. You don&#8217;t really base64 encode strings, you base64 encode the bytes representing the characters that make up strings. Each character in the string is represented by a single 8-bit byte; each character in a base64-encoded string is made up of just 6 bits. Base64 encoding is really nothing more than performing this conversion.

There are 65 possible characters in the base64 alphabet: the letters A through Z, a through z, the numbers 0 through 9, the plus sign (+) and the slash (/). The 65th character is the equals sign (=) and that is used to indicate padding (discussed later). The 6-bit number 0 therefore is represented by the letter A in a base64-encoded string, the 6-bit number 1 is represented by B, and so on.

In order to base64 encode data, you need at least 24 bits (the smallest number that&#8217;s equally divisible by 6 and 8), so any three-character ASCII sequence can cleanly be encoded in base64. Consider the string &#8220;hat&#8221;. The letter &#8220;h&#8221; is represented by 104 or 01101000 in binary, &#8220;a&#8221; is 97 or 01100001, and &#8220;t&#8221; is 116 or 01110100. If you put together, you end up with:

    01101000-01100001-01110100

To convert into base64 encoding, take this and redefine the boundaries to be 6 bits:

    011010-000110-000101-110100

After that, convert each 6 bits into a number.

    26-6-5-52

Then, replace each number with it&#8217;s character from the base64 alphabet.

    a-G-F-0

And so the base64 encoded form of &#8220;hat&#8221; is &#8220;aGF0&#8243;. This works out well because there were exactly 24 bits, or three ASCII characters, to encode. Since not all strings have lengths evenly divisible by three, base64 encoding requires some padding when there aren&#8217;t enough bytes for encoding.

Note that because every three bytes of a string end up represented as four bytes, the resulting base64-encoded string is always around 33% larger than the original. For data URIs, this is generally okay because base64 encoding also makes gzipping much more efficient, so you actually end up transferring roughly the [same number of bytes][5] over the wire.

## Padding

Encoding proceeds, converting each 24 bits, until there are no longer 24 bits to convert. At that point, there are three possible situations:

  1. There are no further bits to convert (the original string is evenly divisible by three).
  2. There are 8 extra bits. In this case, right-pad with zeros out to 12 bits.
  3. There are 16 extra bits. In this case, right-pad with zeros out to 18 bits.

Note that for the second and third conditions, the right padding only fills out to the closest number of bits that are evenly divisible by six. Each 6-bit segment is converted into a character and then two or one equals signed are appended to the end, respectively. Each equals sign indicates that two extra bits of padding were added. These characters don&#8217;t literally represent anything in the original ASCII string; they are simply indicators that padding was necessary so that the decoder knows how to deal with the base64 encoded string.

For example, consider the word hatch. The letter &#8220;h&#8221; is represented by 104 or 01101000 in binary, &#8220;a&#8221; is 97 or 01100001, &#8220;t&#8221; is 116 or 01110100, &#8220;c&#8221; is 99 or 01100011, and &#8220;h&#8221; is 104 or 01101000. The resulting binary representation is:

    01101000-01100001-01110100-01100011-01101000

To convert into base64 encoding, create 6-bit groups:

    (011010-000110-000101-110100)(011000-110110-1000)

Note that there is only one complete set of 24 bits at the beginning of this sequence. The second part of the sequence is made up of only 16 bits. In this circumstance, the last group is padding with two zeros to create an 18 bit group:

    (011010-000110-000101-110100)(011000-110110-100000)

Then the 6-bit groups are converted into characters:

    (a-G-F-0)(Y-2-g)

So the resulting string is &#8220;aGF0Y2g&#8221;. But this isn&#8217;t the final base64 encoded string. Since there were two bits of padding adding, a single equals sign must be appended to the end, making the result &#8220;aGF0Y2g=&#8221;.

## Encoding in JavaScript

Base64 encoding in many languages deal directly with bytes and byte arrays. Since JavaScript doesn&#8217;t have native data types for either, the bitwise operators become very important to this process. Bitwise operators act directly on the underlying bit representation of numbers. Even though JavaScript numbers are technically stored in 64-bits, integer values are treated as if they&#8217;re 32 bits whenever bitwise operators are involved. The most complex part of the problem is converting three 8-bit numbers into four 6-bit numbers, and this is where the bitwise operators come in.

### Bitwise operations

Consider that you have three 8-bit numbers:

    AAAAAAAA-BBBBBBBB-CCCCCCCC

The 6-bit equivalent is:

    AAAAAA-AABBBB-BBBBCC-CCCCCC

Note how the 6-bit first number is made up of the most significant 6 bits of the 8-bit number. Essentially, you want to cut off the last two bits and treat them like they never existed. This is precisely what the right shift (>>) operator does. Take the number 240 or 11110000 in binary. If you right-shift this number two places, you end up with 00111100 in binary (60). All of the bits have shifted to the right by two spots, and when there&#8217;s not enough room, the remaining bits &#8220;fall off&#8221; the end and are eliminated. All of the bits to the left are filled in with zeros. Thus, to get the first 6-bit number from the group of 8-bit number, you can do the following:

    var first6bitNum = first8bitNum >> 2;    //right shift by two bits

The second 6-bit number is a bit tricky, as it&#8217;s made up of a combination of the first 8-bit number and the second 8-bit number. The easy part is getting the four most significant bits from the second 8-bit number, because once again, it&#8217;s a right shift. Right shifting the second 8-bit number by four will get all of those bits in the correct place. To get the first two bits, there are a couple of operations to perform on the first 8-bit number.

The only parts you want from the first 8-bit digit are the least significant to bits, everything else needs to become zero. The way to do that is to use a bitwise AND operation against the number 3 (binary 00000011). A bitwise AND creates a number bit-by-bit from two operands. If the corresponding bits in each number have the same value, then the resulting number has that value in the same bit. For example:

        01100001
    AND 00000011
    ------------
        00000001

Note that the resulting number (1) has the exact same values in the two least significant bits as the original (97). By performing a bitwise AND against 3, you eliminate zero-out all remaining bits and are left with just the two least significant bits. To get these bits into the correct spot for the second 6-bit number, you need to left shift by four spaces (to allow room for the four bits already available from the second 8-bit number). You then use a bitwise OR operator to combine the two groups. Therefore, the second 6-bit number is:

    var second6bitNum = (first8bitNum & 3) << 4 | (second8bitNum >> 4); 

For the third 6-bit number, the process is almost exactly the same. This number is made up of the bits of the second and third 8-bit number, so there&#8217;s another process of bitwise AND and shifting that takes place. This time, you need the four least significant bits of the second 8-bit number and the two most significant bits of the third 8-bit number. Once again, the least significant bits of the 6-bit number are easiest, as you just right shift the third 8-bit number by six bits. To get the four most significant bits of the 6-bit number, perform a bitwise AND with 15 (binary 00001111, hex 0F), which zeros out the most significant four bits, then left shift the result over by two spots to allow room for two more bits:

    var third6bitNum = (second8bitNum & 0x0f) << 2 | (third8bitNum >> 6); 

And the last 6-bit digit is also easy, as you just need to remove the two most significant bits from the last 8-bit number. To do so, perform a bitwise AND with 63 (00111111 in binary, 3F in hex):

    var fourth6bitNum = third8bitNum & 0x3f; 

With all of the 6-bit numbers determined, you can then assign a base64 digit to represent the value. This is typically done by listing out all base64 digits in a string where the character index is the 6-bit number. Example:

    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var firstBase64Digit = digits.charAt(first6bitNum);   //get first digit
    

This is the basic process for converting from ASCII to base64 encoding.

### The base64Encode() function

Before even attempting to base64 encode a string, you should check to see if the string contains only ASCII characters. Since base64 encoding requires eight bits per input character, any character with a code higher than 255 cannot be accurately represented. The specification indicates that an error should be thrown in this case:

    function base64Encode(text){
    
        if (/([^\u0000-\u00ff])/.test(text)){
            throw new Error("Can't base64 encode non-ASCII characters.");
        } 
    
        //more code here
    }

This check uses a simple regular expression that checks for any characters not in the range 0-255. If even one of these characters is in the string, then there&#8217;s a non-ASCII character that can&#8217;t be encoded and an error is thrown.

The next section&#8217;s primary job is to convert each three eight-bit sequence into four six-bit sequences using bitwise operators. Since each character in the string represents a single eight-bit byte, you can proceed character-by-character through the string:

    function base64Encode(text){
    
        if (/([^\u0000-\u00ff])/.test(text)){
            throw new Error("Can't base64 encode non-ASCII characters.");
        } 
    
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            i = 0,
            cur, prev, byteNum,
            result=[];      
    
        while(i < text.length){
    
            cur = text.charCodeAt(i);
            byteNum = i % 3;
    
            switch(byteNum){
                case 0: //first byte
                    result.push(digits.charAt(cur >> 2));
                    break;
    
                case 1: //second byte
                    result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                    break;
    
                case 2: //third byte
                    result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                    result.push(digits.charAt(cur & 0x3f));
                    break;
            }
    
            prev = cur;
            i++;
        }
    
        //more code here
    
        return result.join("");
    }

Since each byte of a three-byte sequence is treated slightly differently, the `byteNum` variable tracks which byte of the three-byte sequence is being processed. When `byteNum` is 0, it&#8217;s the first byte of the second, 1 indicates the second, and 2 indicates the third. This is easily calculated using the modulus operator.

This algorithm uses two variables to track progress through the string, `cur` to track the current character and `prev` to track the previous character. This is necessary because the second and third bytes need information about the previous byte to properly base64-encode. A `switch` statement is used to determine how to interpret the byte and then the bitwise operators are applied. Once the base64 value is calculated, it is used as a lookup into the `digits` variable. The `digits` variable is a list of all base64 digits in the order in which they are used. As such, you can use `digits` as a lookup table for base64 digits via `charAt()`. The results are built up using an array, `result`, which will be joined later.

The last step to accomplish is padding for strings that don&#8217;t have the correct number of bytes.

    function base64Encode(text){
    
        if (/([^\u0000-\u00ff])/.test(text)){
            throw new Error("Can't base64 encode non-ASCII characters.");
        } 
    
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            i = 0,
            cur, prev, byteNum,
            result=[];      
    
        while(i < text.length){
    
            cur = text.charCodeAt(i);
            byteNum = i % 3;
    
            switch(byteNum){
                case 0: //first byte
                    result.push(digits.charAt(cur >> 2));
                    break;
    
                case 1: //second byte
                    result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                    break;
    
                case 2: //third byte
                    result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                    result.push(digits.charAt(cur & 0x3f));
                    break;
            }
    
            prev = cur;
            i++;
        }
    
        if (byteNum == 0){
            result.push(digits.charAt((prev & 3) << 4));
            result.push("==");
        } else if (byteNum == 1){
            result.push(digits.charAt((prev & 0x0f) << 2));
            result.push("=");
        }
    
        return result.join("");
    }

This part is quite easy thanks to the `byteNum` variable. If `byteNum` is 2 once the main loop is complete, that means there were an appropriate number of bytes to complete the encoding. If `byteNum` is any other number, that means padding is necessary. So, if `byteNum` is 0, that means there was one extra byte and you need to pad four bits. This is done using the left-shift operator and then two equals signs are added to the end. If `byteNum` is 1, that means there were two extra bytes and you need to pad two bits.

After that, the result is joined together and returned. This is the base64-encoded version of the original string.

## Decoding in JavaScript

Once you know how to base64 encode a string, base64 decoding is easy to do by reversing the process. Almost the exact same algorithm can be used with the same adjustments.

### Bitwise operations

To begin, consider that you have the following sequence of four 6-bit numbers:

    AAAAAA-BBBBBB-CCCCCC-DDDDDD

To transform this into three 8-bit numbers, the result would be:

    AAAAAABB-BBBBCCCC-CCDDDDDD

So the first 8-bit byte is a combination of the first two 6-bit numbers, using the six bits of the first number and two bits of the second. In order to accomplish this, the first number must be shifted left two bits to allow room for the two bits from the second number. The second number then must be shifted to the right by four bits to eliminate its four least significant bits. The result in code:

    var first8bitNum= (first6bitNum << 2) | (second6bitNum >> 4); 

For the second 8-bit number, you only want to rightmost four bits of this number, so the first step is to apply a bitwise AND with the number 15 (binary 00001111, hex 0F). After that, these bits need to be shifted to the left four spots to put them in proper position. The first four bits of the third 6-bit digit are then needed, so shift that number to the right by two spots and use a bitwise OR to combine that with the previous result:

    var second8bitNum= ((second6bitNum & 0x0f) << 4) | (third6bitNum >> 2); 

The last 8-bit number follows a similar approach. You only want the last two bits of the third 6-bit number, so a bitwise AND with 3 (binary 00000011) is performed to isolate those bits. Then, a left-shift of six spots moves those bits into position. Since all of the bits in fourth 6-bit number are in the correct spots already, you can just perform a bitwise OR between this and the previous result to get the third 8-bit number:

    var third8bitNum= ((third6bitNum & 3) << 6) | fourth6bitNum; 

To convert each of these values into an ASCII character, use the `String.fromCharCode()` method:

    var firstChar = String.fromCharCode(first8bitNum); 

You may be wondering what happens in the case of bit padding, since that hasn&#8217;t been covered in this section. The interesting thing about base64 decoding is that you can completely ignore the padding and still end up with the correct value. So if you base64 decode &#8220;aGF0Y2g&#8221;, you get the same result as when you based64 decode &#8220;aGF0Y2g=&#8221;. The reason lies in how the digits are determined.

Recall that the word &#8220;hatch&#8221; is represented in base64 binary as the following:

    (011010-000110-000101-110100)(011000-110110-100000)

There were two bits of padding added, so the original representation is actually this:

    (011010-000110-000101-110100)(011000-110110-1000)

Now, compare the resulting 8-bit sequences when each of these are converted:

    (01101000-01100001-01110100)(01100011-01101000-00)
    (01101000-01100001-01110100)(01100011-01101000)

Note that the original, with padding, has two extra zero bits to the right. This would make up the last two bits of a third digit, but there aren&#8217;t enough bits to completely created a third ASCII character. Whenever the last sequence has four or fewer bits of 0, you can just ignore it.

### The base64Decode() function

As with encoding, the first step should always be to validate the input. There are a couple of things to keep in mind here. First, white space is not significant in base64-encoded data, so it should be ignored. Second, the length of the string should be a multiple of 4, and if it&#8217;s not, this is not a valid base64-encoded string. Keeping this in mind, you can come up with a reasonable data validation approach:

    function base64Decode(text){
    
        text = text.replace(/\s/g,"");
    
        if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0){
            throw new Error("Not a base64-encoded string.");
        }   
    
        //more code here
    }

Since white space is not significant, the first step is to remove it before doing any further validation. The regular expression checks that there are no invalid characters in the text and then the length is validated. If all of these conditions pass, then it&#8217;s time to move into the decoding portion of the function.

As mentioned previously, padding doesn&#8217;t really matter in decoding, so an equals signs are stripped to avoid confusion. Then, a similar process to base64-encoding is taken: go character-by-character and keep track of the previous character because it&#8217;s needed for calculations.

    function base64Decode(text){
    
        text = text.replace(/\s/g,"");
    
        if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0){
            throw new Error("Not a base64-encoded string.");
        }   
    
        //local variables
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            cur, prev, digitNum,
            i=0,
            result = [];
    
        text = text.replace(/=/g, "");
    
        while(i < text.length){
    
            cur = digits.indexOf(text.charAt(i));
            digitNum = i % 4;
    
            switch(digitNum){
    
                //case 0: first digit - do nothing, not enough info to work with
    
                case 1: //second digit
                    result.push(String.fromCharCode(prev << 2 | cur >> 4));
                    break;
    
                case 2: //third digit
                    result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                    break;
    
                case 3: //fourth digit
                    result.push(String.fromCharCode((prev & 3) << 6 | cur));
                    break;
            }
    
            prev = cur;
            i++;
        }
    
        return result.join("");
    }

Once again, a `digits` variable is used to help the conversion. In this case, the `indexOf()` method is used to locate the base64 digit and return its position. This is then used to perform the decoding. The `digitNum` variable keeps track of which 6-bit digit you&#8217;re evaluating in a group of four. Note that the first digit, digit number 0, must be ignored initially because there&#8217;s not enough information to do any decoding. When digit number 1 is encountered, you can then look back at digit 0 to retrieve the necessary information. All that&#8217;s left is to apply the proper bitwise operations to each digit and store the result, ultimately returning the joined string.

If there was any padding in the input text, then the loop will stop at either digit 1 or 2, leaving the padded zeros without evaluation. There is no need to create a special case to address padding.

## Native base64 support

Several browsers actually have base64 encoding and decoding built-in by default. Firefox, Safari, and Chrome all support two functions:

  * `btoa(text)` &#8211; base64 encodes text.
  * `atob(text)` &#8211; base64 decodes text.

Internet Explorer and Opera don&#8217;t natively support these methods, so you&#8217;ll still need another implementation such as the one in this post to perform base64 encoding in those browsers.

## Conclusion

Base64 encoding was originally designed to safely transfer 8-bit data through 7-bit systems. It has now gained more popularity for use in data URIs in browsers. Even though there are some browsers that natively support base64 encoding and decoding, not all of them do, so it&#8217;s necessary to have some code to work everywhere.

One thing I cannot say enough is that base64 encoding is *not* an encryption algorithm. Don&#8217;t make the mistake of thinking the encoded data is secure when, in fact, it&#8217;s just converted into another form that is easily decoded.

You can download the source code from my GitHub project, [Computer Science in JavaScript][6]. If you&#8217;d like to use it in your [YUI 3][7] code, check out the [Base64 utility][8] on YUI Gallery.

 [1]: {{site.url}}/blog/2009/10/27/data-uris-explained/
 [2]: {{site.url}}/blog/2009/11/03/automatic-data-uri-embedding-in-css-files/
 [3]: http://en.wikipedia.org/wiki/Base64
 [4]: http://tools.ietf.org/html/rfc3548
 [5]: http://www.ravelrumba.com/blog/convert-css-images-to-data-uris-automatically-with-cssembed/
 [6]: http://github.com/nzakas/computer-science-in-javascript
 [7]: http://developer.yahoo.com/yui/3/
 [8]: http://yuilibrary.com/gallery/show/base64
