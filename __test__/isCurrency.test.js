import isCurrency from '../src/lib/isCurrency';
import assertString from '../src/lib/util/assertString';
import merge from '../src/lib/util/merge';

jest.mock('../src/lib/util/assertString', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../src/lib/util/merge', () => ({
  __esModule: true,
  default: jest.fn((options, defaultOptions) => ({
    ...defaultOptions,
    ...options,
  })),
}));

const defaultOptions = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false,
};

describe('isCurrency', () => {
  beforeEach(() => {
    assertString.mockClear();
    merge.mockClear();
  });

  test('Deve retornar true para currency válida', () => {
    const string = '$1,000.00';
    const options = {};

    const result = isCurrency(string, options);

    expect(result).toBe(true);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });

  test('Deve retornar false para string currency errada', () => {
    const string = '12345';
    const options = {};

    const result = isCurrency(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });

  test('Deve retornar true para currency válida com opções personalizadas', () => {
    const string = '€1.000,00';
    const options = {
      symbol: '€',
      thousands_separator: '.',
      decimal_separator: ',',
      digits_after_decimal: [2],
    };

    const result = isCurrency(string, options);

    expect(result).toBe(true);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });

  test('Deve retornar true para currency negativa válida com opções personalizadas', () => {
    const string = '-$1,000.00';
    const options = {
      symbol: '$',
      allow_negatives: true,
    };

    const result = isCurrency(string, options);

    expect(result).toBe(true);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });

  test('Deve retornar false para currency com dígitos decimais ausentes ', () => {
    const string = '$1,000.';
    const options = {};

    const result = isCurrency(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });

  test('Deve retornar falso para currency com separador de milhares inválido', () => {
    const string = '$1.000,00';
    const options = {
      thousands_separator: ',',
    };

    const result = isCurrency(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, defaultOptions);
  });
});
