const { sqlForPartialUpdate, sqlGetAllCompanyQuery, sqlGetAllJobQuery } = require('./sql');
const { BadRequestError, ExpressError } = require("../expressError");

const testData1 = { firstName: 'Aliya', age: 32 };
const jsToSql1 = { firstName: 'first_name' };

describe("sqlForPartialUpdate", function () {
    test("Returns object with correct SET column names and values", function () {
        const sql = sqlForPartialUpdate(testData1, jsToSql1);
        expect(sql).toEqual({ "setCols": "\"first_name\"=$1, \"age\"=$2", "values": ["Aliya", 32] })
    });

    test("Returns BadRequestError when input data is incomplete", function () {
        let testData = {};
        try {
            const sql = sqlForPartialUpdate(testData, jsToSql1);
        } catch (e) {
            expect(e.status).toEqual(400);
        }
    });
});

describe("sqlGetAllCompanyQuery", function () {
    test("Returns when all three filters applied", function () {
        const sqlStatements = sqlGetAllCompanyQuery(name = 'Michael', minEmployees = 200, maxEmployees = 300);
        expect(sqlStatements).toEqual("WHERE name iLIKE '%Michael%' AND num_employees >= 200 AND num_employees <= 300")
    });

    test("Returns when two filters applied", function () {
        const sqlStatements = sqlGetAllCompanyQuery(name = 'Michael', minEmployees = null, maxEmployees = 300);
        expect(sqlStatements).toEqual("WHERE name iLIKE '%Michael%' AND num_employees <= 300")
    });

    test("Returns when one filter applied", function () {
        const sqlStatements = sqlGetAllCompanyQuery(name = '', minEmployees = null, maxEmployees = 300);
        expect(sqlStatements).toEqual("WHERE num_employees <= 300")
    });

    test("Returns 400 error when maxEmployees is less than minEmployees", function () {
        try {
            const sqlStatements = sqlGetAllCompanyQuery(name = '', minEmployees = 400, maxEmployees = 300);
        } catch (e) {
            expect(e.status).toEqual(400)
        }
    })
});


describe("sqlGetAllJobQuery", function () {
    test("Returns when all three filters applied", function () {
        const sqlStatements = sqlGetAllJobQuery(title = 'Michael', minSalary = 100000, hasEquity = true);
        expect(sqlStatements).toEqual("WHERE title iLIKE '%Michael%' AND salary >= 100000 AND equity > 0")
    });

    test("Returns when two filters applied", function () {
        const sqlStatements = sqlGetAllJobQuery(title = '', minSalary = 100000, hasEquity = 300);
        expect(sqlStatements).toEqual("WHERE salary >= 100000 AND equity > 0")
    });

    test("Returns when one filter applied", function () {
        const sqlStatements = sqlGetAllJobQuery(title = '', minSalary = null, hasEquity = 300);
        expect(sqlStatements).toEqual("WHERE equity > 0")
    });
});