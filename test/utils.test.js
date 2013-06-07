var expect = require('chai').expect,
  utils = require('../Expression.js').utils,
  fixtures = {
    before: {a: 'howdy', b: 4, c: [1, 2, 3], d: {message: 'world'}, before: 'abc'},
    after: {a: 'hello', c: ['1', '2', '3'], d: {msg: 'universe'}, after: '123'}
  };

describe('utils', function () {
  describe('extend', function () {
    it('should perform shallow extend', function () {
      var combined = utils.extend({}, fixtures.before, fixtures.after);
      
      expect(combined.d).to.deep.equal({msg: 'universe'});
      expect(combined.before).to.equal('abc');
      expect(combined.after).to.equal('123');
    });

    it('should extend base object by reference', function () {
      var original = {a: 'b', c: 'd'};

      utils.extend(original, {c: 'howdy', e: 'something new'});

      expect(original.e).to.equal('something new');
    });
  })
});
