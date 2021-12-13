const { square } = require('./square.js')


describe('square function', function() {
    test('square should square a number', function() {
        const res = square(3)
        expect(res).toEqual(9)
    })
    
    test('square should square a negative number', function() {
        const res = square(-9);
        expect(res).toEqual(81);
    })
})
