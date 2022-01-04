const {mean, median, mode} = require("./helpers");
  
describe("Mean Tests", function () {
    it("Finds the mean", function () { 
      expect(mean([3,-6,0,-3,6])).toEqual(0)
    })
})

describe("Median Tests", function(){
    it("Finds the median of an even-sized", function(){ 
      expect(median([3,-6,0,-3,6])).toEqual(0)
    })
    it("Finds the median of an odd-sized array", function () { 
      expect(median([3,-6,0,-3])).toEqual(-6)
    })
})
  
describe("Mode Tests", function () {
    it("Finds the mode", function () { 
      expect(mode([1,3,5,4,5,4,5,3,3,3,3,3,3,3,3])).toEqual(3)
    })
})