import blacklist from '../src/lib/blacklist';
import assertString from '../src/lib/util/assertString';

jest.mock('./util/assertString', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('blacklist', () => {
  afterEach(() => {
    assertString.mockClear();
  });

  test('Deve remover chars da string', () => {
    const string = 'Hello world!';
    const chars = 'o';
    const expected = 'Hell wrld!';

    const result = blacklist(string, chars);

    expect(result).toBe(expected);
    expect(assertString).toHaveBeenCalledWith(string);
  });

  test('Deve remover múltiplos chars da string', () => {
    const string = 'Hello world!';
    const chars = 'lo';
    const expected = 'He wrd!';

    const result = blacklist(string, chars);

    expect(result).toBe(expected);
    expect(assertString).toHaveBeenCalledWith(string);
  });

  test('Deve remover chars mesmo que apareçam multiplas vezes', () => {
    const string = 'Hello world!';
    const chars = 'll';
    const expected = 'Heo word!';

    const result = blacklist(string, chars);

    expect(result).toBe(expected);
    expect(assertString).toHaveBeenCalledWith(string);
  });
});
