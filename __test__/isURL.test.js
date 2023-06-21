import isURL, { isRegExp, checkHost } from '../src/lib/isURL';

describe('isURL', () => {
  test('Deve retornar true para urls válidos', () => {
    expect(isURL('http://www.example.com')).toBe(true);
    expect(isURL('https://www.example.com')).toBe(true);
    expect(isURL('ftp://www.example.com')).toBe(true);
    expect(isURL('http://example.com')).toBe(true);
    expect(isURL('http://example.com/path')).toBe(true);
    expect(isURL('http://example.com?query=123')).toBe(true);
    expect(isURL('http://example.com#fragment')).toBe(true);
    expect(isURL('http://example.com:8080')).toBe(true);
    expect(isURL('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]')).toBe(true);
    expect(isURL('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]:8080')).toBe(true);
  });

  test('deve retornar false para urls inválidos', () => {
    expect(isURL('')).toBe(false);
    expect(isURL('http://')).toBe(false);
    expect(isURL('http://example')).toBe(false);
    expect(isURL('http://example..com')).toBe(false);
    expect(isURL('http://example.com:abc')).toBe(false);
    expect(isURL('http://example.com:0')).toBe(false);
    expect(isURL('http://example.com:65536')).toBe(false);
    expect(isURL('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(false);
    expect(isURL('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]:')).toBe(false);
    expect(isURL('http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]:abc')).toBe(false);
  });

  test('deve retornar false para URLs com recursos não permitidos', () => {
    expect(isURL('mailto:example@example.com')).toBe(false);
    expect(isURL('http://example.com#fragment', { allow_fragments: false })).toBe(false);
    expect(isURL('http://example.com?query=123', { allow_query_components: false })).toBe(false);
  });

  test('deve retornar false para URLs que não correspondem à lista de permissões', () => {
    expect(isURL('http://example.com', { host_whitelist: ['www.example.com'] })).toBe(false);
  });

  test('deve retornar false para URLs correspondentes à lista negra', () => {
    expect(isURL('http://example.com', { host_blacklist: ['example.com'] })).toBe(false);
  });
});

describe('isRegExp', () => {
  test('deve retornar true para expressões regulares', () => {
    expect(isRegExp(/test/)).toBe(true);
  });

  test('deve retornar false para expressões não regulares', () => {
    expect(isRegExp('test')).toBe(false);
    expect(isRegExp(123)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp(null)).toBe(false);
  });
});

describe('checkHost', () => {
  test('deve retornar true quando o host corresponder a uma cadeia de caracteres exata', () => {
    const matches = ['example.com', 'test.com'];
    const host = 'example.com';
    expect(checkHost(host, matches)).toBe(true);
  });

  test('deve retornar true quando o host corresponder a uma expressão regular', () => {
    const matches = [/^test/];
    const host = 'test123.com';
    expect(checkHost(host, matches)).toBe(true);
  });

  test('deve retornar false quando o host não corresponder a nenhuma entrada', () => {
    const matches = ['example.com', /^test/];
    const host = 'other.com';
    expect(checkHost(host, matches)).toBe(false);
  });
});
