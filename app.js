const http = require("http");

const host = "localhost";
const port = 8000;

const books = [
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "The Prophet", author: "Kahlil Gibran" },
];

const requestListener = function (req, res) {
  console.log("req.method :>> ", req.method);
  res.setHeader("Content-Type", "application/json");

  switch (req.method) {
    case "GET":
      res.writeHead(200);
      res.end(JSON.stringify(books));
      break;
    case "POST":
      let body = "";

      req.on("data", function (chunk) {
        body += chunk;
      });

      req.on("end", function () {
        const { title, author } = JSON.parse(body);
        const newBook = { title, author };
        books.push(newBook);
        res.writeHead(201);
        res.end(JSON.stringify(newBook));
      });

    //   break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
