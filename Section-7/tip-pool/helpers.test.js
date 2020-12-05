

//   // expects a table row element, appends a newly created td element from the value
//   function appendTd(tr, value) {
//     let newTd = document.createElement('td');
//     newTd.innerText = value;

//     tr.append(newTd);
//   }


describe('Helpers tests', function () {
    beforeEach(function () {
        allPayments = {
            payment1: {
                billAmt: "50",
                tipAmt: "50",
                tipPercent: 100
            },
            payment2: {
                billAmt: "100",
                tipAmt: "50",
                tipPercent: 50
            }
        }
    })

    describe('sumPaymentTotal testing', function () {
        it('should correctly sum the tip total', function () {
            expect(sumPaymentTotal('tipAmt')).toEqual(100)
        })
        it('should correctly sum the bill total', function () {
            expect(sumPaymentTotal('billAmt')).toEqual(150)
        })
        it('should correctly average the tip percentage total', function () {
            expect(sumPaymentTotal('tipPercent')).toEqual(150)
        })
    })

    describe('calculateTipPercentage testing', function () {
        it('should return tip percent for payment1', function () {
            let billAmt = allPayments.payment1.billAmt;
            let tipAmt = allPayments.payment1.tipAmt;
            expect(calculateTipPercent(billAmt, tipAmt)).toEqual(100)
        })
        it('should return tip percent for payment2', function () {
            let billAmt = allPayments.payment2.billAmt;
            let tipAmt = allPayments.payment2.tipAmt;
            expect(calculateTipPercent(billAmt, tipAmt)).toEqual(50)
        })
    })

    describe('appendTr testing', function () {

    })


    afterEach(function () {
        allPayments = {};
    })
})


