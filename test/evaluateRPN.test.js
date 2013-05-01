var expect = require('chai').expect,
    evaluateRPN = require('../Expression.js').evaluateRPN,
    fixtures = {};

describe('evaluateRPN', function () {
    it('should evalute simple RPN operations', function () {
        expect(evaluateRPN([3, 4, '+'])).to.equal(7);
    });

    it.skip('should evaluate simple arithmetic', function () {
        expect(evaluateRPN([3, 4, '+', 5, '-', 6, '*', 6, '/'])).to.equal(2);    
    });
});
