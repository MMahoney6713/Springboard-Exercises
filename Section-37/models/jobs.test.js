"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
        title: "newJob",
        salary: 75000,
        equity: 0,
        company_handle: 'c2'
    };

    test("works", async function () {

        let job = await Job.create(newJob);
        newJob.id = job.id;

        expect(job).toEqual({
            id: job.id,
            title: "newJob",
            salary: 75000,
            equity: '0',
            company_handle: 'c2'
        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = $1`, [job.id]);
        expect(result.rows).toEqual([{
            id: job.id,
            title: "newJob",
            salary: 75000,
            equity: '0',
            company_handle: 'c2'
        }]);
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "title1",
                salary: 100000,
                equity: '0',
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "title2",
                salary: 120000,
                equity: '0.1',
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "title3",
                salary: 50000,
                equity: '0',
                company_handle: "c2",
            },
        ]);
    });

    test("works: with filter", async function () {
        let jobs = await Job.findAll('title', 100000, true);
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "title2",
                salary: 120000,
                equity: '0.1',
                company_handle: "c1",
            },
        ]);
    });
});

/************************************** get */

describe("get", function () {
    test("works", async function () {
        let job = await Job.get(1);
        expect(job).toEqual({
            id: 1,
            title: "title1",
            salary: 100000,
            equity: '0',
            company_handle: "c1",
        });
    });

    test("not found if no such job", async function () {
        try {
            await Job.get(10000);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        title: "newTitle1",
        salary: 120000,
        equity: 0.1,
    }

    test("works", async function () {
        let job = await Job.update(1, updateData);
        expect(job).toEqual({
            id: 1,
            title: "newTitle1",
            salary: 120000,
            equity: '0.1',
            company_handle: 'c1'
        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = 1`);
        expect(result.rows).toEqual([{
            id: 1,
            title: "newTitle1",
            salary: 120000,
            equity: '0.1',
            company_handle: "c1",
        }]);
    });

    test("not found if no such job", async function () {
        try {
            await Job.update(10000, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Job.update(1, {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Job.remove(1);
        const res = await db.query(
            "SELECT id FROM jobs WHERE id=1");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such job", async function () {
        try {
            await Job.remove(100000);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
