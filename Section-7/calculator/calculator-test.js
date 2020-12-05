
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 10000,
    years: 5,
    rate: 5
  }
  expect(calculateMonthlyPayment(values)).toEqual('188.71');
});


it("should return a result with 2 decimal places", function () {
  const values = {
    amount: 17854,
    years: 5.6,
    rate: 5.54
  }
  expect(calculateMonthlyPayment(values)).toEqual('309.63');
});

/// etc
