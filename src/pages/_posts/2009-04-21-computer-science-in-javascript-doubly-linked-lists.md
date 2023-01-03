---
title: "Computer science in JavaScript: Doubly-linked lists"
author: Nicholas C. Zakas
permalink: /blog/2009/04/21/computer-science-in-javascript-doubly-linked-lists/
updated_post: /blog/2019/02/computer-science-in-javascript-doubly-linked-lists/
categories:
  - Web Development
tags:
  - Computer Science
  - Data Structures
  - JavaScript
  - Linked List
  - Programming
---
In my [last post][1], I discussed creating a linked list in JavaScript. This basic data structure is frequently used in computer science programs to teach the concept of pointers. The next step is to investigate the doubly-linked list. A doubly-linked list is similar to a single linked list except that it has bidirectional links between nodes. Instead of just having a `next` pointer on each node, there's also a `previous` pointer and instead of just tracking the head of the list, you also track the tail (the last node).

<p style="text-align: center;">
  <a href="http://en.wikipedia.org/wiki/File:Doubly-linked-list.svg"><img src="/images/wp-content/uploads/2009/04/500px-Doubly-linked-list.svg_.png" alt="Doubly linked list diagram" width="500" height="34" /></a>
</p>

The extra set of pointers between nodes allows for easier manipulation and traversal but adds complexity because there are more pointers to manage. A single node in a doubly-linked list can be implemented as follows:

    var firstNode = {
        data: 12,
        next: null,
        prev: null
    };

The `next` and `prev` pointers must be filled in on each node. Adding another node to this involves setting two pointers instead of one:

    var secondNode = {
        data: 99,
        prev: firstNode,    //set pointer #1
        next: null
    };
    
    firstNode.next = secondNode;    //set pointer #2

Now each node has a reference to the other, allowing you to traverse the list by following either `next` or `prev`.

As with the singly-linked list, there's a lot of pointer manipulation that is best encapsulated in a custom type. A basic doubly-linked list type is as follows:

    function DoublyLinkedList() {
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

You'll note that two of the properties are exactly the same as the `LinkedList` implementation: `_length` and `_head`. The only addition is the `_tail` property to keep track of the last node in the list.

Adding to a doubly-linked list is very similar to adding to a singly-linked list. The major difference is tracking the `_tail` and using that to add the new node instead of traversing the entire structure to find the correct place to insert the next node:

    DoublyLinkedList.prototype = {
    
        add: function (data){
    
            //create a new item object, place data in
            var node = {
                    data: data,
                    next: null,
                    prev: null
                };
    
            //special case: no items in the list yet
            if (this._length == 0) {
                this._head = node;
                this._tail = node;
            } else {
    
                //attach to the tail node
                this._tail.next = node;
                node.prev = this._tail;
                this._tail = node;
            }        
    
            //don't forget to update the count
            this._length++;
    
        },
    
        //more methods here
    };

When there's nothing in the list, adding an item means setting both `_head` and `_tail` equal to the same node. In all other cases, you simply use `_tail` to add the new node.

Removing an item from a doubly-linked list is also somewhat different than removing from a singly-linked list. There are two special cases: when the node to remove is the first and when the node to remove is the last. For other cases, the algorithm is very similar to that of a singly-linked list, traversing the list to find the correct item to remove and then adjusting pointers:

    DoublyLinkedList.prototype = {
    
        remove: function(index){
    
            //check for out-of-bounds values
            if (index > -1 && index < this._length){
    
                var current = this._head,
                    i = 0;
    
                //special case: removing first item
                if (index === 0){
                    this._head = current.next;
    
                    /*
                     * If there's only one item in the list and you remove it,
                     * then this._head will be null. In that case, you should
                     * also set this._tail to be null to effectively destroy
                     * the list. Otherwise, set the previous pointer on the
                     * new this._head to be null.
                     */
                    if (!this._head){
                        this._tail = null;
                    } else {
                        this._head.prev = null;
                    }
    
                //special case: removing last item
                } else if (index === this._length -1){
                    current = this._tail;
                    this._tail = current.prev;
                    this._tail.next = null;
                } else {
    
                    //find the right location
                    while(i++ < index){
                        current = current.next;
                    }
    
                    //skip over the item to remove
                    current.prev.next = current.next;
                }
    
                //decrement the length
                this._length--;
    
                //return the value
                return current.data;            
    
            } else {
                return null;
            }
    
        },    
    
        //more methods here
    };

The most important part of removing items from a doubly-linked list is to ensure that there are no pointers remaining to the removed nodes.

With the exception of these two methods, the rest of the methods are identical to that of the `LinkedList` implementation from my previous post. This includes `item()`, `size()`, and `toArray()`. You can download the full source code from my [Computer Science in JavaScript][2] project on GitHub.

 [1]: https://humanwhocodes.com/blog/2009/04/13/computer-science-in-javascript-linked-list/
 [2]: http://github.com/nzakas/computer-science-in-javascript/
