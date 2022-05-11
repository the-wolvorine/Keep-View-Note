let assert = require('chai').assert;
let hello = require('../src/testFunction').hello;

describe('Function', ()=> {
    it('should say Hello', ()=> {
        assert.equal(hello, 'hello');
    });
    it('should return data type of string', () => {
        assert.typeOf(hello, 'string');
    });
});