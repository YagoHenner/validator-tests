import isBase64 from '../../src/lib/isBase64';

describe('isBase64', () => {
 test('Verificar se uma string é uma representação válida em Base64', () => {
   expect(isBase64('SGVsbG8gd29ybGQh')).toBe(true);
   expect(isBase64('VGhpcyBpcyBhIGJhc2U2NCBlbmNvZGluZyBzdHJpbmc=')).toBe(true);
 });

 test('Verificar se uma string não é uma representação válida em Base64', () => {
   expect(isBase64('Qualquer coisa')).toBe(false);
   expect(isBase64('Não é Base64')).toBe(false);
 });
});