import isDate from '../src/lib/isDate';

jest.mock('../src/lib/util/merge', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(options => options),
}));

describe('isDate', () => {
  const originalGetFullYear = Date.prototype.getFullYear;

  beforeAll(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getFullYear = jest.fn().mockReturnValue(2023);
  });

  afterAll(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getFullYear = originalGetFullYear;
  });

  test('Verificar função com datas válidas', () => {
    expect(isDate('2023/06/20')).toBe(true);
    expect(isDate('23/06/20')).toBe(true);
    expect(isDate('2023-06-20')).toBe(true);
    expect(isDate('23-06-20')).toBe(true);
  });

  test('Verificar com datas válidas e formatos customizados', () => {
    expect(isDate('20-06-2023', { format: 'DD-MM-YYYY' })).toBe(true);
    expect(isDate('06/20/23', { format: 'MM/DD/YY' })).toBe(true);
    expect(isDate('2023|06|20', { format: 'YYYY|MM|DD' })).toBe(true);
  });

  test('Verificar se retorna true para objeto de datas no modo strict', () => {
    expect(isDate(new Date())).toBe(true);
  });

  test('Verificar datas com formatos variado', () => {
    const options = {
      format: 'DD-MM-YYYY',
      delimiters: ['-', '/'],
      strictMode: true,
    };

    expect(isDate('20-06-2023', options)).toBe(true);
    expect(isDate('20/06/2023', options)).toBe(true);
  });
});
