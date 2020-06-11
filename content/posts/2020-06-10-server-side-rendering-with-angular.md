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

```
curl localhost:4200
```

This is how the application starts off….. as a completely blank page.\
Angular Universal overcomes this issue by showing the user an app layout before the page becomes interactive. Universal executes on the server, generating static application pages that later get bootstrapped on the client. So the application renders more quickly. Another reason for SSR is to make the website more search engine friendly

**Adding Universal to the existing app**

Now, to create the server-side app module,` app.server.module.ts`, run the following CLI command:

```
ng add @nguniversal/express-engine --clientProject {{projectName}}
```

\
Check your project structure now with the newly created files

● `tsconfig.server.json`: this tells angular compiler where to find the (entry)root module for the Universal application.

● `app.module.server.ts`: this is the root module for the server version only.

●`main.server.ts`: exports the ​AppServerModule​ 

●`webpack.server.config.js`: the webpack configuration for bundling the Universal version

●`server.ts`: the express web server.

Now to run the app,

```
npm run build:ssr && npm run serve:ssr
```

This builds both the client side and the server side bundles.

Open the browser, navigate to ​ http://localhost:4000​ and check the network tab. You will see it calls the giphy API on the client side as well. There is a visible flash of gifs on the screen. To avoid this redundant call, we will use Angular’s TransferState class.

**Using TransferState**

TransferState class transfers data from server side of the app to the client side. When on the server, we set the transferState Key using the set() method and when on the browser we
retrieve the key using the get() method.

In `app.module.ts`, add `BrowserTransferStateModule` to the imports array

In `app.server.module.ts`, add  `ServerTransferStateModule` to the imports array

In the component file where you wish to use the transferState(ssr-home.component.ts if you’re using the code from the github repo), add the following imports:

```
import { TransferState, makeStateKey }  from '@angular/platform-browser';
import { isPlatformServer }  from '@angular/common';
```

Now define a key:

```
const RESULT_KEY = makeStateKey<string>('result');
```

In the component’s constructor, add:

```
constructor(
   private state: TransferState,
   @Inject(PLATFORM_ID) platformId
 ) {
   this.isServer = isPlatformServer(platformId);
 }

```

`isPlatformServer(platformId)`, returns true if the platform executing the above code is a server

Now inside the ngOnInit() method, define the logic where the API call to giphy happens only if it’s a server or the app is being rendered client side

```
ngOnInit() {
   this.searchQuery = "cool";
   // On the server or Client side render
   if (this.isServer || (!this.isServer && !this.state.hasKey(RESULT_KEY))) {
     this.getGif();
   }
   // On the server
   else if (this.state.hasKey(RESULT_KEY)) {
     console.log("in browser");
     this.gifList = JSON.parse(this.state.get(RESULT_KEY, ""));
   }
 }

```

Now open the browser on localhost:4000 again and there should be no default API call after page load this time. And no flickering either!!