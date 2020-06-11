---
template: post
title: Server Side Rendering with Angular Universal
slug: server-side-rendering-angular
draft: false
date: 2020-06-10T14:28:56.847Z
description: Making a simple server side rendered app using Angular Universal
category: Technology
tags:
  - Angular
---
The foundation for this walkthrough is a simple client side rendered Angular app that calls the search method of the giphy api and displays the resulting gifs. Let’s make that first before moving onto the server side part.

PS: You’re gonna need an API key from giphy’s website to access the API endpoint

The starting app should look like this

![starting sample](/media/2020-06-11_1.png "starting sample")

Cool. Starting code can be found here: <https://github.com/rjairath/angular-ssr>

Once you open the network tab in dev tools, you can see a GET request to the giphy API after the page is loaded. This is client side rendering

**Why Server Side?**

A client side Angular application executes in the browser, rendering pages in the DOM in response to user actions. Open terminal and type:

`curl localhost:4200`

```
curl localhost:4200
```