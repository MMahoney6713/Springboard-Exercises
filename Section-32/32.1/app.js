const express = require('express');

const app = express();

const ExpressError = require('./expressError');

const {validateAndParseInputString, mode, mean, median } = require('./helpers');


// Routes //

app.get('/mean', (request, response, next) => {
    try {
        const nums = validateAndParseInputString(request.query.nums);
        if (!nums) {
            throw new ExpressError('Nums are required', 400)
          }
        return response.json(mean(nums))
    } catch (error) {
        return next(error);
    }
})

app.get('/median', (request, response, next) => {
    try {
        const nums = validateAndParseInputString(request.query.nums);
        return response.json(median(nums))
    } catch (error) {
        return next(error);
    }
})

app.get('/mode', (request, response, next) => {
    try {
        const nums = validateAndParseInputString(request.query.nums);
        return response.json(mode(nums))
    } catch (error) {
        return next(error);
    }
})

// Error Handlers //

app.use(function (request, response, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  

app.use(function(error, request, response, next) {
    let status = error.status || 500;
    let message = error.message;

    return response.status(status).json({
        'error': {message, status}
    })
})



app.listen(3000, () => console.log('App on port 3000'));