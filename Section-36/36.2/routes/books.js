const express = require("express");
const Book = require("../models/book");
const jsonschema = require('jsonschema');
const bookSchema = require('../schemas/bookSchema.json');
const ExpressError = require('../expressError');

const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (e) {
    return next(e);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (e) {
    return next(e);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const schema = jsonschema.validate(req.body, bookSchema);

    if (!schema.valid) {
      const listOfErrors = schema.errors.map(error => error.stack);
      const error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (e) {
    return next(e);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const schema = jsonschema.validate(req.body, bookSchema);

    if (!schema.valid) {
      const listOfErrors = schema.errors.map(error => error.stack);
      const error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (e) {
    return next(e);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
