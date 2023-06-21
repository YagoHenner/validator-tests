import isPostalCode, { locales } from '../src/lib/isPostalCode';

describe('isPostalCode', () => {
  test('Verificar para códigos postais validos', () => {
    expect(isPostalCode('12345', 'US')).toBe(true);
    expect(isPostalCode('V6B 4P4', 'CA')).toBe(true);
    expect(isPostalCode('WC2N 5DU', 'GB')).toBe(true);
  });

  test('Verificar para códigos postais invalidos', () => {
    expect(isPostalCode('123', 'US')).toBe(false);
    expect(isPostalCode('ABC', 'CA')).toBe(false);
    expect(isPostalCode('12345', 'GB')).toBe(false);
  });

  test('Verificar exceção de erro em códigos postais inválidos', () => {
    expect(() => isPostalCode('12345', 'XYZ')).toThrow("Invalid locale 'XYZ'");
  });

  test('Deve retornar true para codigos postais válidos com o locale "any"', () => {
    expect(isPostalCode('12345', 'any')).toBe(true);
    expect(isPostalCode('V6B 4P4', 'any')).toBe(true);
    expect(isPostalCode('WC2N 5DU', 'any')).toBe(true);
  });

  test('Locales deve conter cada um dos locales suportados', () => {
    expect(locales).toContain('AD');
    expect(locales).toContain('US');
    expect(locales).toContain('GB');
  });
});
