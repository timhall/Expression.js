var expect = require('chai').expect,
    convertToTokens = require('../Expression.js').convertToTokens,
    fixtures = {};

describe('convertToTokens', function () {
    it('should split simple expression with spaces', function () {
        expect(convertToTokens('3 + 4'))
            .to.deep.equal(['3', '+', '4']);
    });

    it('should split simple expression without spaces', function () {
        expect(convertToTokens('3+4'))
            .to.deep.equal(['3', '+', '4']);
    })
});