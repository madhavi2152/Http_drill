const express = require("express");
const fs = require("fs");
const htmlpath = "/home/madvi/Documents/http/htmlfile.html";
const jsonf = "/home/madvi/Documents/http/stringt.json";
const { v4: uuidv4 } = require("uuid");

async function readf(htmlp) {
  return new Promise((res, rej) => {
    fs.readFile(htmlp, "utf-8", (err, data) => {
      if (data) res(data);
      else rej(err);
    });
  });
}

const server = express();
server.get("/html", (req, res) => {
  readf(htmlpath)
    .then((data) => {
      res.write(data);
      res.end();
    })
    .catch((err) => {
      console.error(err);
    });
});

server.get("/json", (req, res) => {
  readf(jsonf)
    .then((data) => {
      res.write(data);
      res.end();
    })
    .catch((err) => console.log(err));
});

server.get("/uuid", (req, res) => {
  const generatedUuid = uuidv4();
  const response = { uuid: generatedUuid };
  res.json(response);
});

let arr = [100, 200, 300, 400, 500];
arr.forEach((ele) => {
  server.get(`/status/${ele}`, (req, res) => {
    res.writeHead(ele, {
      "content-Type": "text/html",
    });
    res.write(JSON.stringify(res.statusCode));
    console.log(res.statusCode);

    res.end();
  });
});

server.get(/delay/, (req, res) => {
  let temp = req.url;
  let arr = temp.split("/");
  let time = Number(arr[arr.length - 1]);
  console.log(time);
  time *= 1000;
  setTimeout(() => {
    res.json(res.statusCode);
    res.end();
  }, time);
});

server.listen(3000);

// if (req.url.includes("delay")) {
//   let temp = req.url;
//   let arr = temp.split("/");
//   let time = Number(arr[arr.length - 1]);
//   // console.log(time);
//   time *= 1000;
//   setTimeout(() => {
//     res.write(JSON.stringify(res.statusCode));
//     res.end();
//   }, time);
// }

//  http.createServer((req, res) => {
//   if (req.url === "/html" && req.method === "GET") {
//     readf(htmlpath)
//       .then((data) => {
//         res.write(data);
//         res.end();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
//   if (req.url === "/json" && req.method === "GET") {
//     readf(jsonf)
//       .then((data) => {
//         res.write(data);
//         res.end();
//       })
//       .catch((err) => console.log(err));
//   }
//   let arr = [100, 200, 300, 400, 500];
//   arr.forEach((ele) => {
//     if (req.url === `/status/${ele}` && req.method === "GET") {
//       res.writeHead(ele, {
//         "content-Type": "text/html",
//       });

//       res.write(JSON.stringify(res.statusCode));
//       console.log(res.statusCode);

//       res.end();
//     }
//   });

//   //GET /delay/{delay_in_seconds} - Should return a success response but after the specified delay in the request. For example: If the request sent is GET /delay/3, then the server should wait for 3 seconds and only then send a response with 200 status code.

//   if (req.url.includes("delay")) {
//     let temp = req.url;
//     let arr = temp.split("/");
//     let time = Number(arr[arr.length - 1]);
//     // console.log(time);
//     time *= 1000;
//     setTimeout(() => {
//       res.write(JSON.stringify(res.statusCode));
//       res.end();
//     }, time);
//   }
// });
// server.listen(3000);

/*


GET /status/{status_code} - Should return a response with a status code as specified in the request. For example:

    /status/100 - Return a response with 100 status code
    /status/500 - Return a response with 500 status code

Try it out for 100,200,300,400,500.

*/

/*fs.readFile(htmlpath, "utf-8", (err, data) => {
  if (err) console.log(err);
  else {
    const server = http.createServer((req, res) => {
      if (req.url === "/html" && req.method === "GET") {
        res.write(data);
        res.end();
      }
      if (req.url === "/json" && req.method === "get") {
        res.write();
      }
    });
    server.listen(3000);
  }
});
*/
