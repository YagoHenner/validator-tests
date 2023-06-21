import isCurrency from '../src/lib/isCurrency';

describe('isCurrency', () => {
  test('Verificar se a string é uma moeda válida (retorna true)', () => {
    expect(isCurrency('$100')).toBe(true);
    expect(isCurrency('$1,000,000.50')).toBe(true);
    expect(isCurrency('-$50.00')).toBe(true);
    expect(isCurrency('R$123', { symbol: 'R$' })).toBe(true);
    expect(isCurrency('€10', { symbol: '€' })).toBe(true);
  });

  test('Verificar se a string não é uma moeda válida (retorna false)', () => {
    expect(isCurrency('aaa')).toBe(false);
    expect(isCurrency('USD 100')).toBe(false);
    expect(isCurrency('$10,00')).toBe(false);
    expect(isCurrency('-$50.0')).toBe(false);
    expect(isCurrency('R123')).toBe(false);
    expect(isCurrency('€10,00')).toBe(false);
    expect(isCurrency('')).toBe(false);
  });

  test('Verificar se está utilizando as opções default', () => {
    expect(isCurrency('$100')).toBe(true);
    expect(isCurrency('$100', {})).toBe(true);
  });

  test('Verificar se as opções enviadas estão sendo utilizadas', () => {
    const options = {
      symbol: '€',
      allow_decimal: false,
    };

    expect(isCurrency('$100')).toBe(true);
    expect(isCurrency('$100', options)).toBe(false);
    expect(isCurrency('€100', options)).toBe(true);
  });
});
