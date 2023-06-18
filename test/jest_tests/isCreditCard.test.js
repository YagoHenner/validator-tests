import isCreditCard from "../../src/lib/isCreditCard";

describe("isCreditCard", () => {
 test('Verificar se um número de cartão de crédito é válido  (retorna true)', () => {
  expect(isCreditCard('4111111111111111')).toBe(true)
  expect(isCreditCard('5555555555554444')).toBe(true)
  expect(isCreditCard('378282246310005')).toBe(true)
 });

 test('Verificar se um número de cartão de crédito é inválido (retorna false)', () => {
  expect(isCreditCard('1234567890123456')).toBe(false) // Número inválido
  expect(isCreditCard('4111111111111112')).toBe(false) // Código verificador inválido
 });

 test('Verificar se um número de  cartão de crédito com provedor específico (retorna true)', () => {
  expect(isCreditCard('4111111111111111', {provider: 'visa'})).toBe(true)
  expect(isCreditCard('5555555555554444', {provider: 'mastercard'})).toBe(true)
  expect(isCreditCard('378282246310005', {provider: 'amex'})).toBe(true)
  expect(isCreditCard('30569309025904', { provider: 'dinersclub' })).toBe(true);
  expect(isCreditCard('6011111111111117', { provider: 'discover' })).toBe(true);
  expect(isCreditCard('3530111333300000', { provider: 'jcb' })).toBe(true);
  expect(isCreditCard('6222000400000000', { provider: 'unionpay' })).toBe(true);
 });

 test('Verificar se um número de cartão de crédito com provedor específico (retorna false)', () => {
  expect(isCreditCard('4111111111111111', {provider: 'amex'})).toBe(false)
  expect(isCreditCard('5555555555554444', {provider: 'visa'})).toBe(false)
  expect(isCreditCard('378282246310005', {provider: 'mastercard'})).toBe(false)
  expect(isCreditCard('30569309025904', { provider: 'discover' })).toBe(false);
  expect(isCreditCard('6011111111111117', { provider: 'dinersclub' })).toBe(false);
  expect(isCreditCard('3530111333300000', { provider: 'unionpay' })).toBe(false);
  expect(isCreditCard('6222000400000000', { provider: 'jcb' })).toBe(false);
 });

 test('Verificar se uma  exceção é lançada quando o provedor não é válido', () => {
  expect(isCreditCard('4111111111111111', {provider: 'elo'})).toThrowError('elo is not a valid credit card provider.');
 });
});