import isTime from '../src/lib/isTime';

describe('isTime', () => {
  test('Verfiicar para tempos validos', () => {
    expect(isTime('12:34')).toBe(true);
    expect(isTime('01:23:45', { mode: 'withSeconds' })).toBe(true);
  });

  test('Verificar para tempos inválidos', () => {
    expect(isTime('25:00')).toBe(false);
    expect(isTime('12:60')).toBe(false);
    expect(isTime('12:34:60')).toBe(false);
    expect(isTime('9:45 AM')).toBe(false);
    expect(isTime('01:23:45 PM')).toBe(false);
    expect(isTime('string qualquer')).toBe(false);
    expect(isTime(12345)).toBe(false);
    expect(isTime(null)).toBe(false);
    expect(isTime(undefined)).toBe(false);
  });
});
