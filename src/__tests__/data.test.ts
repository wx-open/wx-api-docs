import data from '../data';

test('data should be an object and with property meta', () => {
  expect(Array.isArray(data.meta)).toBeTruthy();
});
