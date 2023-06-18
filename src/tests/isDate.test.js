import isDate from '../lib/isDate'

describe('isBase64', () => {
 test('Verificar se a data é válida', () => {
  expect(isDate('2023/06/18')).toBe(true);
  expect(isDate('2023-06-18')).toBe(true);
  expect(isDate('06/18/2023')).toBe(true);
  expect(isDate('06-18-2023')).toBe(true);
 });

 test('Verificar se a data é inválida', () => {
  expect(isDate('2023/06/40')).toBe(false);
  expect(isDate('2023-06-40')).toBe(false);
  expect(isDate('06/40/2023')).toBe(false);
  expect(isDate('06-40-2023')).toBe(false);
 });
});