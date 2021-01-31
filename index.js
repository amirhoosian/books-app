const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("wellcome to Edurekas REST API");
});

const books = [
  { title: "kale gaze", author: "hasane", id: 1 },
  { title: "hsan kjal madrese mere", author: "jafar", id: 2 },
  { title: "fill ha parvaz mekonan", author: "dane", id: 3 },
];

app.get("/api/books", (req, res) => res.send(books));

app.get("/api/books/:id", (req, res) => {
  const book = books.find((a) => a.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const { error } = req.body;
  if (error) {
    return res.status(400).send(error.detalis[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((a) => a.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );

  const { error } = req.body;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  book.title = req.body.title;
  book.author = req.body.author;
  res.send(book);
});

app.delete("/api/books:id", (req, res) => {
  const book = books.find((a) => a.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );

  const index = books.indexOf(books);
  books.splice(index, 1);
  res.send(book);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
