window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loanAmount = document.querySelector('#loan-amount');
  const loanYears = document.querySelector('#loan-years');
  const loanRate = document.querySelector('#loan-rate');

  loanAmount.value = 10000;
  loanYears.value = 5;
  loanRate.value = 5;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();

  let monthlyPaymentValue = calculateMonthlyPayment(values);

  updateMonthly(monthlyPaymentValue);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let amount = parseFloat(values.amount);
  let rate = parseFloat(values.rate) / 100 / 12;
  let payments = parseFloat(values.years) * 12;
  let monthlyPaymentValue = Math.abs((amount * rate) / (1 - (1 + rate) ** -payments));
  return monthlyPaymentValue.toFixed(2);
  // toFixed found at https://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.querySelector('#monthly-payment');
  monthlyPayment.innerText = monthly;
}
