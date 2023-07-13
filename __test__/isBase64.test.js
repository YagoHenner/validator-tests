import isBase64 from '../src/lib/isBase64';
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

describe('isBase64', () => {
  afterEach(() => {
    assertString.mockClear();
    merge.mockClear();
  });

  test('Deve retornar true para uma string base64 válida', () => {
    const string = 'SGVsbG8gd29ybGQh';
    const options = {};

    const result = isBase64(string, options);

    expect(result).toBe(true);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, {
      urlSafe: false,
    });
  });

  test('Deve retornar false para uma string inválida', () => {
    const string = 'Hello world';
    const options = {};

    const result = isBase64(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, {
      urlSafe: false,
    });
  });

  test('Deve retornar false para string base64 com preenchimento incorreto', () => {
    const string = 'SGVsbG8gd29ybGQ=';
    const options = {};

    const result = isBase64(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, {
      urlSafe: false,
    });
  });

  test('Deve retornar true para string base64 segura para URL', () => {
    const string = 'SGVsbG8gd29ybGQ';
    const options = {
      urlSafe: true,
    };

    const result = isBase64(string, options);

    expect(result).toBe(true);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, {
      urlSafe: false,
    });
  });

  test('Deve retornar false para string base64 segura para URL com caracteres não seguros para URL', () => {
    const string = 'SGVsbG8gd29ybGQ=';
    const options = {
      urlSafe: true,
    };

    const result = isBase64(string, options);

    expect(result).toBe(false);
    expect(assertString).toHaveBeenCalledWith(string);
    expect(merge).toHaveBeenCalledWith(options, {
      urlSafe: false,
    });
  });
});
