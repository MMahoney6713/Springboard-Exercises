process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

const toothbrush = {name: 'toothbrush', price: '12.00'}
const deodorant = {name: 'deodorant', price: '4.33'}


beforeEach(() => {
    items.push(toothbrush);
    items.push(deodorant);
})

afterEach(() => {
    items.length = 0;
})



describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const response = await request(app).get('/items');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([toothbrush, deodorant]);
    });
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const razor = {name: 'razor', price: '3.77'};
        const response = await request(app).post('/items').send(razor);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({item: razor});
    })
})

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const response = await request(app)
            .patch(`/items/${toothbrush.name}`)
            .send({name: 'hairbrush'});

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            name: 'hairbrush',
            price: toothbrush.price
        });
    })

    test("Response with 404 if id is invalid", async function() {
        const response = await request(app).patch('/items/notAValidName');
        expect(response.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const response = await request(app).delete(`/items/${toothbrush.name}`);

        expect(response.statusCode).toBe(202);
        expect(response.body).toEqual({message: 'Deleted'});
    })
})