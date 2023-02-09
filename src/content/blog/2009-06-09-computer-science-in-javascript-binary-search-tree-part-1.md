---
title: "Computer science in JavaScript: Binary search tree, Part 1"
author: Nicholas C. Zakas
permalink: /blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/
categories:
  - Web Development
tags:
  - Binary Search Tree
  - Computer Science
  - Data Structures
  - JavaScript
  - Programming
---
Perhaps one of the most frequently used and discussed data structures in computer science classes is the [binary search tree][1]. This is typically the first data structure introduced that has a non-linear insertion algorithm. A binary search tree is similiar to a doubly linked list in that each node contains some data as well as two pointers to other nodes; they differ in the way that those nodes relate to one another. A binary search tree node's pointers are typically called &#8220;left&#8221; and &#8220;right&#8221; to indicate subtrees of values relating to the current value. A simple JavaScript implementation of such a node is as follows:

    var node = {
        value: 125,
        left: null,
        right: null
    };

As can be discerned from the name, a binary search tree is organized into a hierarchical tree structure. The first item becomes the root node and each additional value is added into the tree as an ancestor of that root. The unique part of a binary search tree, however, is that the nodes are ordered based on the value they contain: any values that are part of a node's left subtree are always less than the node's value and any values in the right subtree are always greater than the node's value. In this way, finding a value in a binary search tree becomes quite simple, go left whenever the value you're looking for is less than the node you're processing or go right if the value is greater. There can be no duplicates in a binary search tree because duplicates would destroy this relationship. The following diagram represents a simple binary search tree.

<p style="text-align: center;">
  <a href="http://en.wikipedia.org/wiki/File:Binary_search_tree.svg"><img src="/images/posts/2009/06/500px-Binary_search_tree.svg_-300x250.png" alt="Binary search tree diagram" width="300" height="250"" /></a>
</p>

This diagram represents a binary search tree whose root value is 8. When the value 3 was added, it became the left child of the root because 3 is less than 8. When the value 1 was added, it became the left child of 3 because 1 is less than 8 (so go left) and then 1 is less than 3 (go left again). When the value 10 was added, it became the right child of the root because 10 is greater than 8. This process continued with the values 6, 4, 7, 14, and 13. This binary search tree has a depth of 3, meaning that the farthest values from the root are three nodes away.

Binary search trees naturally end up in a sorted order and are therefore useful for quickly looking up data because you immediately eliminate possibilities with each step. By limiting the number of nodes that need to be investigated, searching can be done more quickly. Suppose you want to find the value 6 in the tree above. Starting from the root, you determine that 6 is less than 8, so travel to the left child of the root. Since 6 is greater than 3, you travel to the right node. And there is the value you were looking for. So instead of visiting nine nodes to find this value, you only have to visit three.

To build a binary search tree implementation in JavaScript, the first step is to define the basic interface:

    function BinarySearchTree() {
        this._root = null;
    }
    
    BinarySearchTree.prototype = {
    
        //restore constructor
        constructor: BinarySearchTree,
    
        add: function (value){
        },
    
        contains: function(value){
        },
    
        remove: function(value){
        },
    
        size: function(){
        },
    
        toArray: function(){
        },
    
        toString: function(){
        }
    
    };

The basic interface is similar to other data structures, with methods for adding and removing values. I've also added a few convenience methods, `size()`, `toArray()`, and `toString()`, that are useful for JavaScript.

To get a handle on using a binary search tree, the best method to begin with is `contains()`. The `contains()` method accepts a value as an argument and returns `true` if the value is present in the tree or `false` if not. This method follows the basic binary search algorithm to determine whether or not the value is present:

    BinarySearchTree.prototype = {
    
        //more code
    
        contains: function(value){
            var found       = false,
                current     = this._root
    
            //make sure there's a node to search
            while(!found && current){
    
                //if the value is less than the current node's, go left
                if (value < current.value){
                    current = current.left;
    
                //if the value is greater than the current node's, go right
                } else if (value > current.value){
                    current = current.right;
    
                //values are equal, found it!
                } else {
                    found = true;
                }
            }
    
            //only proceed if the node was found
            return found;
        },
    
        //more code
    
    };

The search starts from the root of the tree. Since there may not be a root if no data has been added, this must be checked. Traversing the tree follows the simple algorithm discussed earlier: go left if the value to find is less than the current node, go right if the value is greater. The `current` pointer is overwritten each time through until either the value is found (in which case `found` is set to `true`) or there are no more nodes to search in that direction (in which case the value isn't in the tree).

The approach using in `contains()` can also be used to insert a new value into the tree. The primary difference is that you'll be looking for the spot in which to place the new value instead of looking for the value in the tree:

    BinarySearchTree.prototype = {
    
        //more code
    
        add: function(value){
            //create a new item object, place data in
            var node = {
                    value: value,
                    left: null,
                    right: null
                },
    
                //used to traverse the structure
                current;
    
            //special case: no items in the tree yet
            if (this._root === null){
                this._root = node;
            } else {
                current = this._root;
    
                while(true){
    
                    //if the new value is less than this node's value, go left
                    if (value < current.value){
    
                        //if there's no left, then the new node belongs there
                        if (current.left === null){
                            current.left = node;
                            break;
                        } else {
                            current = current.left;
                        }
    
                    //if the new value is greater than this node's value, go right
                    } else if (value > current.value){
    
                        //if there's no right, then the new node belongs there
                        if (current.right === null){
                            current.right = node;
                            break;
                        } else {
                            current = current.right;
                        }       
    
                    //if the new value is equal to the current one, just ignore
                    } else {
                        break;
                    }
                }
            }
        },
    
        //more code
    
    };

When adding a value into a binary search tree, the special case is when there is not already a root. In that case, the job is easy as you just set the root to the new value. For all other cases, the basic algorithm is exactly the same as the one used in `contains()`: go left is the new value is less than the current node or right if the value is greater. The primary difference is that when you can't go any further, that is the spot for the new value. So, if you need to go left but there is no left node, the new value becomes the left node (same with the right). Since there can be no duplicates, the operation stops if a node with the same value is found.

Before moving on to the `size()` method, I'd like to digress into a discussion of tree traversals. In order to calculate the size of a binary search tree, it's necessary to visit each node in the tree. Binary search trees often bring with them the need to execute different types of traversals to retrieve information, and the most commonly used is an in-order traversal. In-order traversals are performed on each node by processing the left subtree, then the node itself, then the right subtree. Since binary search trees are ordered in this way, from left to right, the result is that the nodes are processed in their correct sorted order. For the `size()` method, it doesn't actually matter what order the nodes are traversed in, but it does matter for the `toArray()` method. Since both methods need to perform a traversal, I decided to add a `traverse()` method that can be used generically:

    BinarySearchTree.prototype = {
    
        //more code
    
        traverse: function(process){
    
            //helper function
            function inOrder(node){
                if (node){
    
                    //traverse the left subtree
                    if (node.left !== null){
                        inOrder(node.left);
                    }            
    
                    //call the process method on this node
                    process.call(this, node);
    
                    //traverse the right subtree
                    if (node.right !== null){
                        inOrder(node.right);
                    }
                }
            }
    
            //start with the root
            inOrder(this._root);
        },
    
        //more code
    
    };

This method accepts a single argument, `process`, which is a function that should be run on each node in the tree. The method defines a helper function called `inOrder()` which is used to recursively traverse the tree. Note that the recursion only goes left and right if that node exists (to avoid processing `null` multiple times). The `traverse()` method then starts the in-order traversal from the root node and the `process()` function handles processing each node. This method can then be used to implement `size()`, `toArray()`, and transitively, `toString()`:

    BinarySearchTree.prototype = {
    
        //more code
    
        size: function(){
            var length = 0;
    
            this.traverse(function(node){
                length++;
            });
    
            return length;
        },
    
        toArray: function(){
            var result = [];
    
            this.traverse(function(node){
                result.push(node.value);
            });
    
            return result;
        },
    
        toString: function(){
            return this.toArray().toString();
        },
    
        //more code
    
    };

Both `size()` and `toArray()` call the `traverse()` method and pass in a function to run on each node. In the case of `size()`, the function simply increments the length variable while `toArray()` uses the function to add the node's value into an array. The `toString()` method then calls `toArray()` before converting the returned array into a string and returning it.

In part 2 of this article, the removal of nodes from a binary search tree will be discussed. Removal is a complex problem with a lot of cases to consider and so warrants its own writeup. In the meantime, you can get the full source code in my [Computer Science in JavaScript GitHub project][2].

 [1]: http://en.wikipedia.org/wiki/Binary_search_tree
 [2]: http://github.com/nzakas/computer-science-in-javascript
