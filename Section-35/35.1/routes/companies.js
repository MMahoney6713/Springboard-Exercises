const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require('../db')


router.get('/', (request, response, next) => {
    db.query(`SELECT * FROM companies`)
        .then(data => response.json({companies: data.rows}))
        .catch(err => next(err));
})

router.get('/:code', (request, response, next) => {
    const { code } = request.params;

    let dbData = {company: '', invoices: '', industries: ''};
    let dbPromises = [
        db.query(`SELECT * FROM companies WHERE code=$1`, [code])
            .then(data => dbData.company = data.rows[0])
            .catch(err => next(err)),

        db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [code])
            .then(data => dbData.invoices = data.rows)
            .catch(err => next(err)),

        db.query(`
            SELECT i.industry FROM industries AS i
            RIGHT JOIN companies_industries AS ci
                ON i.code = ci.industry_code
            LEFT JOIN companies AS c 
                ON ci.company_code = c.code
            WHERE c.code = $1;
            `, [code])
            .then(data => dbData.industries = data.rows.map(r => r.industry))
            .catch(err => next(err))
    ]

    Promise.all(dbPromises)
        .then(result => {
            if (!dbData.company) {
                throw new ExpressError(`Company with code ${code} not found.`, 404)
            }
            dbData.company.invoices = dbData.invoices;
            dbData.company.industries = dbData.industries;
            return response.json({company: dbData.company})
        })
        .catch(err => next(err));
})

router.post('/', (request, response, next) => {
    const { name, description } = request.body;
    db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [slugify(name), name, description])
        .then(data => response.status(201).json({company: data.rows[0]}))
        .catch(err => next(err));
})

router.put('/:code', (request, response, next) => {
    const { code } = request.params;
    const { name, description } = request.body;
    db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code])
        .then(data => {
            if (data.rows.length === 0) {
                throw new ExpressError(`Company with code ${code} not found.`, 404)
            }
            return response.json({company: data.rows[0]})
        })
        .catch(err => next(err));
})

router.delete('/:code', (request, response, next) => {
    const { code } = request.params;
    db.query(`DELETE FROM companies WHERE code=$1 RETURNING code`, [code])
        .then(data => {
            if (data.rows.length === 0) {
                throw new ExpressError(`Company with code ${code} not found.`, 404)
            }
            return response.json({status: "deleted"})
        })
        .catch(err => next(err));
})


module.exports = router;
