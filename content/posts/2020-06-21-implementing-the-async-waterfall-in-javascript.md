---
template: post
title: Implementing the async waterfall in Javascript
slug: async-waterfall-js
draft: false
date: 2020-06-21T15:10:44.525Z
description: The waterfall function takes an array of asynchronous functions and
  a final callback function, executing the functions sequentially. This is gonna
  be an implementation based on callbacks, without using Promises or async/await
category: Technology
tags:
  - JavaScript
---


We are going to build a waterfall function that, 

* Takes 2 arguments 

  a. An array of any number of asynchronous functions
  b. A final callback function
* Executes the array of functions sequentially
* Pass the result of one function to the next, and so on
* Pass the result of last function to the final callback function
* If an error occurs during any of the function’s execution, directly jump to the final callback  function, with the error parameter



The function signature is as follows:

```

function waterfall(arr, finalCallback) {
   // Your code here
}
 
waterfall([
   function(doneCallback) {
       setTimeout(function() {
           console.log('FIRST');
           doneCallback(null, 'b')
       }, 100);
   },
   function(param, doneCallback) {
       setTimeout(function() {
           console.log('SECOND', param);
           doneCallback(null, 'c', 'd')
       }, 50);
   },
   function(param1, param2, doneCallback) {
       setTimeout(function() {
           console.log('THIRD', param1, param2);
           doneCallback(null, 'e')
       }, 10);
   }
], function(err, result) {
   console.log('err', err);
   console.log('result', result);
});
// Output:
// FIRST
// SECOND b
// THIRD c d
// err null
// result e

```

My first thought when I saw sequential implementation was to use Array.prototype.reduce But here’s the catch, when we use reduce() to sequentially resolve promises, the reduce() loop isn’t actually slowing down at all. It’s completely synchronous, doing its normal thing as fast as it can, just like always.

Just to show a demo:

```
function methodThatReturnsAPromise(nextId) {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     console.log(`Resolve! ${nextId}`);
     resolve();
   }, 1000);
 });
}
 
[1,2,3].reduce((accPromise, nextId) => {
 let date = new Date();
 console.log(
   `Loop! ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
 );
 
 return accPromise.then(() => methodThatReturnsAPromise(nextId));
}, Promise.resolve());

```

Here the Loop statements will all be printed before the Resolve statements. That's not what we want here

So, how can we ensure that the second function is executed only after the first one is finished? RECURSION! The function call with each subsequent array element happens only if the previous function call is finished. The initial value of the `result` parameter is `[]`

```
// Here result is an array
function waterfall_helper(arr, callback, result) {
 let fns = arr.slice(1);
 
 // Case of empty array, time to call the final callback
 if (!arr[0]) {
   callback(null, ...result);
   return;
 }
 let first = arr[0];
 first(...result, (err, ...data) => {
   // Error: Exit the loop and jump to the main callback
   if (err) return callback(err);
   waterfall_helper(fns, callback, data);
 });
}
 
function waterfall(arr, callback) {
 waterfall_helper(arr, callback, []);
}

```

And...we get the desired output!

PS: If you use the spread operator on an empty array and pass it as an argument to another function, like `f(...result, data)`, then data becomes the first parameter in the function f's execution and `...result` is completely ignored