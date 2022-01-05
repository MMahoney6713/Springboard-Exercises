
const express = require("express");
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');


router.get("/", (request, response) => {
    return response.json(items);
})

router.get('/:name', (request, response) => {
    const searchItem = items.find(item => item.name === request.params.name)
    if(searchItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    response.status(200).json({ item: searchItem })
})

router.post("/", (request, response) => {
    const newItem = {
        name: request.body.name, 
        price: request.body.price
    }
    items.push(newItem);
    return response.status(201).json({ item: newItem });
})

router.patch('/:name', (request, response) => {
    const searchItem = items.find(item => item.name === request.params.name)
    if (searchItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    searchItem.name = request.body.name || searchItem.name;
    searchItem.price = request.body.price || searchItem.price;
    return response.status(200).json(searchItem)
})

router.delete('/:name', (request, response) => {
    const searchItem = items.findIndex(item => item.name === request.params.name)
    if (searchItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(searchItem, 1)
    return response.status(202).json({message: 'Deleted'});
})


module.exports = router;