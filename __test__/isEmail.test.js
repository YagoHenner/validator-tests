import isEmail from '../src/lib/isEmail';

describe('isEmail', () => {
  test('Verificar se um email é válido (retornar true)', () => {
    expect(isEmail('test@example.com')).toBe(true);
  });

  test('Verificar se um email é inválido (retornar false)', () => {
    expect(isEmail('invalid_email')).toBe(false);
  });

  test('Verificar um email sem domínio correto (retornar false)', () => {
    expect(isEmail('test@example')).toBe(false);
  });

  test('Verficar email com char inválido', () => {
    expect(isEmail('test@ex ample.com')).toBe(false);
  });

  test('Verificar email com display name inválido', () => {
    expect(isEmail('"Invalid Display Name" <test@example.com>')).toBe(false);
  });

  test('Verificar email com display name válido', () => {
    expect(isEmail('"displayName" <test@example.com>', { allow_display_name: true })).toBe(true);
  });

  test('Verificar se email está na blacklist retornar false', () => {
    const options = {
      host_blacklist: ['example.com', 'test.com'],
    };
    expect(isEmail('test@example.com', options)).toBe(false);
  });

  test('Verificar se retorna false para um email com host fora da whitelist', () => {
    const options = {
      host_whitelist: ['example.com', 'test.com'],
    };
    expect(isEmail('test@other.com', options)).toBe(false);
  });
});
