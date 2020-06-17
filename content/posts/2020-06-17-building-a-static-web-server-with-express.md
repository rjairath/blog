---
template: post
title: Building a static web server with Express
slug: static-web-server-express
draft: false
date: 2020-06-17T12:09:05.482Z
description: Here we build a static web server using plain NodeJS first, and
  then the same using Express. Express is faster and a lot more convenient
category: Technology
tags:
  - Express
---
**What is a static web server?**

A static web server is a web server which serves only static content: any files (html, js, css, etc.) that are available at the moment they are requested by the client.

A static web server is not meant to serve dynamically generated content which does not exist but needs to be constructed on-the-fly  (e.g. after extracting certain info from a database)

Alright, let’s jump onto the code now

**The NodeJS way**

The directory structure looks like the following:

![directory structure](/media/2020-06-17_1.png "directory structure")

The index.js is our entry point for the application. Inside index.js, create a server using Node’s inbuilt http module:

```
const http = require("http");
const path = require("path");
const fs = require("fs");
 
const server = http.createServer((req, res) => {
  res.end(‘Server started’)
})
 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
```

This has created a basic http server. Go to localhost:5000 to test it out Now create the static files in the public folder and modify the server in index.js
We will first modify the function to extract the file path and extension from the request url:

```
const server = http.createServer((req, res) => {
 let filePath = path.join(
   __dirname,
   "public",
   req.url === "/" ? index.html : req.url
 );
 
 let extension = path.extname(filePath);
 let contentType = "text/html"; //Default contentType
 
 switch (extension) {
   case ".js":
     contentType = "text/js";
     break;
   case ".css":
     contentType = "text/css";
     break;
   case ".json":
     contentType = "application/json";
     break;
 }
});
```

Eg: localhost:5000/about.html will extract out the file extension, html and construct the filepath,  `${__dirname}/public/about.html`

Now all we need to do is to render the requested file and check for any errors:

```
fs.readFile(filePath, (err, content) => {
   if (err) {
     if (err.code == "ENOENT") {
       // Page not found
       fs.readFile(
         path.join(__dirname, "public", "404.html"),
         (err, content) => {
           res.writeHead(200, { "Content-Type": "text/html" });
           res.end(content, "utf8");
         }
       );
     } else {
       res.writeHead(500, { "Content-Type": "text/html" });
       res.end(`server error code: ${err.code}`);
     }
   } else {
     // Page found
     res.writeHead(200, { "Content-Type": contentType });
     res.end(content, "utf8");
   }
 });

```

Done. Now run the code with `node index`, and open the browser on localhost: 5000



**The Express way**

Install express with `npm i express`

In a new file, index-express.js:

```
const express = require("express");
const path = require("path");
 
const app = express();
 
app.use(express.static(path.join(__dirname, "public")));
 
app.get("*", (req, res) => {
 res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
 
const PORT = process.env.PORT || 4000;
 
app.listen(PORT, () => {
 console.log(`listening on port ${PORT}`);
});

```

And that’s it! Run the code with node index-express and open the browser on localhost:4000 Here we don’t need to explicitly handle the content type or read files. Express handles all that stuff for us. Express is great !