process.env.NODE_ENV === "test"

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

let testBook = {
    "isbn": "0691161518",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
};

let testBook2 = {
    "isbn": "0691161519",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
};

let testBookBad = {
    "isbn": "0691161520",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
  }

describe("Test Book class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    let book1 = await Book.create(testBook)
  });

  test("can create", async function () {
    let response = await request(app).post("/books").send(testBook2);

    expect(response.statusCode).toEqual(201)
    expect(response.body.book).toEqual(testBook2);
  });

  test("can get", async function () {
    let response = await request(app).get(`/books/${testBook.isbn}`);

    expect(response.statusCode).toEqual(200)
    expect(response.body.book).toEqual(testBook);
  });

  test("can return errors for not valid schema", async function () {
    let response = await request(app).post("/books").send(testBookBad);

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message[0]).toEqual(`instance requires property \"pages\"`);
  });
});


afterAll(async function() {
  await db.end();
});
