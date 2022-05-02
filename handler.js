const serverless = require("serverless-http");
const express = require("express");
const app = express();
const https = require('https')
   
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from  commit 1!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path Commit1!",
  });
});

app.get("/posts", (req, res, next) => {
  let dataString = '';
  let url = "https://jsonplaceholder.typicode.com/posts";
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://jsonplaceholder.typicode.com/posts", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.parse(dataString)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });

  });
  return response;
});
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
