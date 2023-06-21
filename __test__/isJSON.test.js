import isJSON from '../src/lib/isJSON';

describe('isJSON', () => {
  test('Verificar JSONs válidos', () => {
    expect(isJSON('{"name":"John","age":30,"city":"New York"}')).toBe(true);
    expect(isJSON('{"name":"John","age":30,"city":"New York","isActive":true}')).toBe(true);
    expect(isJSON('[1,2,3]')).toBe(true);
    expect(isJSON('true', { allow_primitives: true })).toBe(true);
    expect(isJSON('false', { allow_primitives: true })).toBe(true);
    expect(isJSON('null', { allow_primitives: true })).toBe(true);
  });

  test('Verificar JSONs inválidos', () => {
    expect(isJSON('{"name":"John","age":30,"city":"New York"')).toBe(false);
    expect(isJSON('{"name":"John","age":30,"city":"New York","isActive":}')).toBe(false);
    expect(isJSON('{"name":"John","age":30,"city":"New York","isActive":true')).toBe(false);
    expect(isJSON('1,2,3')).toBe(false);
    expect(isJSON('true')).toBe(false);
    expect(isJSON('false')).toBe(false);
    expect(isJSON('null')).toBe(false);
  });

  test('Verificar throw (código não faz um throw Error) caso o valor não seja uma string', () => {
    expect(() => isJSON(null)).toThrow();
    expect(() => isJSON(undefined)).toThrow();
    expect(() => isJSON(123)).toThrow();
    expect(() => isJSON({})).toThrow();
  });
});
