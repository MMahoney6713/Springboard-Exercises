process.env.NODE_ENV = "test";

const request = require("supertest");
const slugify = require("slugify")

const app = require("../app");
const db = require('../db')

let testCompany1 = {code: 'apple', name: 'Apple Computer', description: 'Maker of OSX.'};
let testCompany2 = {code: 'ibm', name: 'IBM', description: 'Big blue.'};
let testCompany3 = {name: 'Michael Mahoney', description: 'Its me'};
let invoice1;
let invoice2;
let invoice3;

beforeEach(async () => {
    await Promise.all([
        db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3)`, [testCompany1.code, testCompany1.name, testCompany1.description]),
        db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3)`, [testCompany2.code, testCompany2.name, testCompany2.description]),

        db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, ['apple', 100])
            .then(data => invoice1 = data.rows[0]),
        db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, ['apple', 200])
            .then(data => invoice2 = data.rows[0]),
        db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, ['ibm', 400])
            .then(data => invoice3 = data.rows[0])
        ]
    )
})

afterEach(async () => {
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM invoices');
})

afterAll(async () => {
    await db.end();
})


describe("GET /companies", function() {
    test("Gets a list of companies", async function() {
        const response = await request(app).get(`/companies`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({companies: [testCompany1, testCompany2]});
    });
});

describe("POST /companies", function() {
    test("Creates a new company", async function() {
        const response = await request(app).post('/companies').send(testCompany3);

        testCompany3.code = slugify(testCompany3.name)
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({company: testCompany3})
    })
})

describe("PUT /companies/:id", function() {
    test("Updates a single company", async function() {
      const response = await request(app).put(`/companies/${testCompany1.code}`).send(testCompany3);
      
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({company: {
          code: testCompany1.code, 
          name: testCompany3.name,
          description: testCompany3.description
        }});
    });
  
    test("Responds with 404 if can't find company", async function() {
      const response = await request(app).put(`/companies/0`);

      expect(response.statusCode).toEqual(404);
    });
});

describe("DELETE /companies/:id", function() {
    test("Deletes a single a company", async function() {
      const response = await request(app).delete(`/companies/${testCompany2.code}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({status: "deleted"});
    });
  });