---
title: "Computer science in JavaScript: Doubly linked lists"
author: Nicholas C. Zakas
teaser: "Implementing a doubly linked list in JavaScript."
date: 2019-02-05
categories:
  - Computer Science
tags:
  - Computer Science
  - Data Structures
  - JavaScript
  - Linked List
  - Programming
github_repo: humanwhocodes/computer-science-in-javascript
npm_package: "@humanwhocodes/doubly-linked-list"
series_previous: /blog/2019/01/computer-science-in-javascript-linked-list/
---

In my [previous post]({{ page.series_previous | absolute_url }}), I discussed creating a singly linked list in JavaScript (if you haven't yet read that post, I suggest doing so now). A single linked list consists of nodes that each have a single pointer to the next node in the list. Singly linked lists often require traversal of the entire list for operations, and as such, have generally poor performance. One way to improve the performance of linked lists is to add a second pointer on each node that points to the previous node in the list. A linked list whose nodes point to both the previous and next nodes is called a *doubly linked list*. 

## The design of a doubly linked list

Similar to a singly linked list, a doubly linked list is made up of a series of nodes. Each node contains some data as well as a pointer to the next node in the list and a pointer to the previous node. Here is a simple representation in JavaScript:

```js
class DoublyLinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}
```

In the `DoublyLinkedListNode` class, the `data` property contains the value the linked list item should store, the `next` property is a pointer to the next item in the list, and the `previous` property is a pointer to the previous item in the list. Both the `next` and `previous` pointers start out as `null` because the next and previous nodes aren't known at the time the class is instantiated. You can then create a doubly linked list using the `DoublyLinkedListNode` class like this:

```js
// create the first node
const head = new DoublyLinkedListNode(12);

// add a second node
const secondNode = new DoublyLinkedListNode(99);
head.next = secondNode;
secondNode.previous = head;

// add a third node
const thirdNode = new DoublyLinkedListNode(37);
secondNode.next = thirdNode;
thirdNode.previous = secondNode;

const tail = thirdNode;
```

As with a singly linked list, the first node in a doubly linked list is called the head. The second and third nodes are assigned by using both the `next` and `previous` pointers on each node. The following image shows the resulting data structure.

[![Doubly linked list diagram by Lasindi - Own work, Public Domain]({{ site.url }}/images/posts/2019/doubly-linked-list.svg)](https://commons.wikimedia.org/w/index.php?curid=2245165)

You can traverse a doubly linked list in the same way as a singly linked list by following the `next` pointer on each node, such as:

```js
let current = head;

while (current !== null) {
    console.log(current.data);
    current = current.next;
}
```

Doubly linked list also typically track the last node in the list, called the *tail*. The tail of the list is useful to track both for easier insertion of new nodes and to search from the back of the list to the front. To do so, you start at the tail and follow the `previous` links until there are no more nodes. The following code prints out each value in the doubly linked in reverse:

```js
let current = tail;

while (current !== null) {
    console.log(current.data);
    current = current.previous;
}
```

This ability to go backwards and forwards through a doubly linked list provides an advantage over a singly linked list by allowing searches in both directions.

## The `DoublyLinkedList` class

As with a singly linked list, the operations for manipulating nodes in a doubly linked list are best encapsulated in a class. Here is a simple example:

```js
const head = Symbol("head");
const tail = Symbol("tail");

class DoublyLinkedList {
    constructor() {
        this[head] = null;
        this[tail] = null;
    }
}
```

The `DoublyLinkedList` class represents a doubly linked list and will contain methods for interacting with the data it contains. There are two symbol properties, `head` and `tail`, to track the first and last nodes in the list, respectively. As with the singly linked list, the `head` and `tail` are not intended to be accessed from outside the class.

### Adding new data to the list

Adding an item to a doubly linked list is very similar to adding to a singly linked list. In both data structures, you must first find the last node in the list and then add a new node after it. In a singly linked list you had to traverse the entire list to find the last node whereas in a doubly linked list the last node is tracked using the `this[tail]` property. Here is the `add()` method for the `DoublyLinkedList` class:

```js
class DoublyLinkedList {

    constructor() {
        this[head] = null;
        this[tail] = null;
    }
    
    add(data) {

        // create the new node and place the data in it
        const newNode = new DoublyLinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[head] === null) {
            this[head] = newNode;
        } else {

            // link the current tail and new tail
            this[tail].next = newNode;
            newNode.previous = this[tail];
        }

        // reassign the tail to be the new node
        this[tail] = newNode;
    }

}
```

The `add()` method for the doubly linked list accepts one argument, the data to insert into the list. If the list is empty (both `this[head]` and `this[tail]` are `null`) then the new node is assigned to `this[head]`. If the list is not empty, then a new node is added after the current `this[tail]` node. The last step is to set `this[tail]` to be `newNode` because in both an empty and non-empty list the new node will always be the last node.

Notice that in the case of an empty list, `this[head]` and `this[tail]` are set to the same node. That's because the single node in a one-node list is both the first and the last node in that list. Keeping proper track of the list tail is important so the list can be traversed in reverse if necessary.

The complexity of this `add()` method is O(1). For both an empty and a non-empty list, the operation doesn't require any traversal and so is much less complex than `add()` for the singly linked list where only the list head was tracked.

### Retrieving data from the list

The `get()` method for a doubly linked list is exactly the same as the `get()` method for a singly linked list. In both cases, you must traverse the list starting from `this[head]` and track how many nodes have been seen to determine when the correct node is reached:

```js
class DoublyLinkedList {

    // other methods hidden for clarity

    get(index) {
    
        // ensure `index` is a positive value
        if (index > -1) {

            // the pointer to use for traversal
            let current = this[head];

            // used to keep track of where in the list you are
            let i = 0;

            // traverse the list until you reach either the end or the index
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;          
            }
        
            // return the data if `current` isn't null
            return current !== null ? current.data : undefined;
        } else {
            return undefined;
        }
    }

}
```

To reiterate from the singly linked list post, the complexity of the `get()` method ranges from O(1) when removing the first node (no traversal is needed) to O(n) when removing the last node (traversing the entire list is required).

### Removing data from a doubly linked list

The algorithm for removing data from a doubly linked list is essentially the same as with a singly linked list: first traverse the data structure to find the node in the given position (same algorithm as `get()`) and then remove it from the list. The only significant differences from the algorithm used in a singly linked list are:

1. There is no need for a `previous` variable to track one node back in the loop because the previous node is always available through `current.previous`.
1. You need to watch for changes to the last node in the list to ensure that `this[tail]` remains correct.

Otherwise, the `remove()` method looks very similar to that of the singly linked list:

```js
class DoublyLinkedList {
    
    // other methods hidden for clarity

    remove(index) {
    
        // special cases: no nodes in the list or `index` is negative
        if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        // special case: removing the first node
        if (index === 0) {

            // store the data from the current head
            const data = this[head].data;

            // just replace the head with the next node in the list
            this[head] = this[head].next;

            // special case: there was only one node, so also reset `this[tail]`
            if (this[head] === null) {
                this[tail] = null;
            } else {
                this[head].previous = null;
            }

            // return the data at the previous head of the list
            return data;
        }

        // pointer use to traverse the list
        let current = this[head];

        // used to track how deep into the list you are
        let i = 0;

        // same loop as in `get()`
        while ((current !== null) && (i < index)) {

            // traverse to the next node
            current = current.next;

            // increment the count
            i++;
        }

        // if node was found, remove it
        if (current !== null) {

            // skip over the node to remove
            current.previous.next = current.next;

            // special case: this is the last node so reset `this[tail]`.
            if (this[tail] === current) {
                this[tail] = current.previous;
            } else {
                current.next.previous = current.previous;
            }

            // return the value that was just removed from the list
            return current.data;
        }

        // if node wasn't found, throw an error
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }
    
}
```

When `index` is `0`, meaning the first node is being removed, `this[head]` is set to `this[head].next`, the same as with a singly linked list. The difference comes after that point when you need to update other pointers. If there was only one node in the list, then you need to set `this[tail]` to `null` to effectively remove that one node; if there was more than one node, you need to set `this[head].previous` to `null`. Remember that the new head was previously the second node in the list and so its `previous` link was pointing to the node that was just removed.

After the loop, you need to ensure that both the `next` pointer of the node before the removed node and the `previous` pointer of the node after the removed node. Of course, if the node to remove is the last node then you need to update the `this[tail]` pointer.

### Creating a reverse iterator

You can make a doubly linked list iterable in JavaScript using the same `values()` and `Symbol.iterator` methods from the singly linked list. In a doubly linked list, however, you have the opportunity to create a reverse iterator that produces the data starting from the tail and working its way towards the head. Here is what a `reverse()` generator method looks like:

```js
class DoublyLinkedList {

    // other methods hidden for clarity

    *reverse(){

        // start by looking at the tail
        let current = this[tail];

        // follow the previous links to the head
        while (current !== null) {
            yield current.data;
            current = current.previous;
        }
    }
}
```

The `reverse()` generator method follows the same algorithm as the `values()` generator method in the singly linked list with the exception that `current` starts equal to `this[tail]` and the `current.previous` is followed until the there are no more nodes. Creating a reverse iterator is helpful for discovering bugs in the implementation as well as avoiding rearranging nodes just to access the data in a different order.

### Other methods

Most other methods that don't involve addition or removal of nodes follow the same algorithms as those in a singly linked list.

### Using the class

Once complete, you can use the linked list implementation like this:

```js
const list = new DoublyLinkedList();
list.add("red");
list.add("orange");
list.add("yellow");
    
// get the second item in the list
console.log(list.get(1));       // "orange"

// print out all items in reverse
for (const color of list.reverse()) {
    console.log(color);
}

// remove the second item in the list    
console.log(list.remove(1));    // "orange"
    
// get the new first item in the list
console.log(list.get(1));       // "yellow"

// convert to an array
const array1 = [...list.values()];
const array2 = [...list];
const array3 = [...list.reverse()];
```

The full source code is available on GitHub at my [Computer Science in JavaScript](https://github.com/humanwhocodes/computer-science-in-javascript) project.

## Conclusion

Doubly linked lists are similar to singly linked lists in that each node has a `next` pointer to the next node in the list. Each node also has a `previous` pointer to the previous node in the list, allowing you to move both backwards and forwards in the list easily. Doubly linked lists typically track both the first and last node in the list, and that makes adding a node into the list a O(1) operation instead of O(n) in a singly linked list.

However, the complexity of other doubly linked list operations is the same as with a singly linked list because you always end up traversing most of the list. As such, doubly linked lists don't offer any real advantage over the built-in JavaScript `Array` class for storing a collection of unrelated data (though related data, such as sibling DOM nodes in the browser) might be useful to represent in some kind of linked list.
