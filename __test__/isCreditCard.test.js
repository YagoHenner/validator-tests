import isCreditCard from '../src/lib/isCreditCard';

const creditCardNumbers = {
  visa: '4111111111111111',
  mastercard: '5555555555554444',
  amex: '378282246310005',
  dinersclub: '30569309025904',
  discover: '6011111111111117',
  jcb: '3530111333300000',
  unionpay: '627412345678901234',
};

describe('isCreditCard', () => {
  test('Verificar se um número de cartão de crédito é válido  (retorna true)', () => {
    expect(isCreditCard(creditCardNumbers.visa)).toBe(true);
    expect(isCreditCard(creditCardNumbers.mastercard)).toBe(true);
    expect(isCreditCard(creditCardNumbers.amex)).toBe(true);
  });

  test('Verificar se um número de cartão de crédito é inválido (retorna false)', () => {
    expect(isCreditCard('1234567890123456')).toBe(false); // Número inválido
    expect(isCreditCard('4111111111111112')).toBe(false); // Código verificador inválido
  });

  test('Verificar se um número de  cartão de crédito com provedor específico (retorna true)', () => {
    expect(isCreditCard(creditCardNumbers.visa, { provider: 'visa' })).toBe(true);
    expect(isCreditCard(creditCardNumbers.mastercard, { provider: 'mastercard' })).toBe(true);
    expect(isCreditCard(creditCardNumbers.amex, { provider: 'amex' })).toBe(true);
    expect(isCreditCard(creditCardNumbers.dinersclub, { provider: 'dinersclub' })).toBe(true);
    expect(isCreditCard(creditCardNumbers.discover, { provider: 'discover' })).toBe(true);
    expect(isCreditCard(creditCardNumbers.jcb, { provider: 'jcb' })).toBe(true);
  });

  test('Verificar se um número de cartão de crédito com provedor específico (retorna false)', () => {
    expect(isCreditCard(creditCardNumbers.visa, { provider: 'amex' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.mastercard, { provider: 'visa' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.amex, { provider: 'mastercard' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.dinersclub, { provider: 'discover' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.discover, { provider: 'dinersclub' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.jcb, { provider: 'unionpay' })).toBe(false);
    expect(isCreditCard(creditCardNumbers.unionpay, { provider: 'jcb' })).toBe(false);
  });

  test('Verificar se uma  exceção é lançada quando o provedor não é válido', () => {
    const invalidProvider = 'invalid-provider';
    const cardNumber = '1234567890123456';

    expect(() => {
      isCreditCard(cardNumber, { provider: invalidProvider });
    }).toThrow(`${invalidProvider} is not a valid credit card provider.`);
  });
});
