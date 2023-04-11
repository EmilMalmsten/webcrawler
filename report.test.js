const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('Object get sorted based on value in desc order', () => {
    const obj = {
      a: 10,
      b: 5,
      c: 15
    };

    const sortedObj = sortPages(obj);
    const expected = { c: 15, a: 10, b: 5 };

    expect(sortedObj).toEqual(expected);
});
