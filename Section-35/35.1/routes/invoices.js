const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require('../db')

router.get('/', (request, response, next) => {
    db.query(`SELECT * FROM invoices`)
        .then(data => response.json({invoices: data.rows}))
        .catch(err => next(err));
})

router.get('/:id', (request, response, next) => {
    const { id } = request.params;
    db.query(`SELECT * FROM invoices WHERE id=$1`, [id])
        .then(data => {
            if (data.rows.length === 0) {
                throw new ExpressError(`invoice with id ${id} not found.`, 404)
            }
            return response.json({invoice: data.rows[0]})
        })
        .catch(err => next(err));
})

router.post('/', (request, response, next) => {
    const { comp_code, amt } = request.body;
    console.log(comp_code, amt)
    db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, [comp_code, amt])
        .then(data => response.json({invoice: data.rows[0]}))
        .catch(err => next(err));
})

router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const { amt } = request.body;
    db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date`, [amt, id])
        .then(data => {
            if (data.rows.length === 0) {
                throw new ExpressError(`Invoice with id ${id} not found.`, 404)
            }
            return response.json({invoice: data.rows[0]})
        })
        .catch(err => next(err));
})

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;
    db.query(`DELETE FROM invoices WHERE id=$1 RETURNING id`, [id])
        .then(data => {
            if (data.rows.length === 0) {
                throw new ExpressError(`Invoice with id ${id} not found.`, 404)
            }
            return response.json({status: "deleted"})
        })
        .catch(err => next(err));
})

module.exports = router;