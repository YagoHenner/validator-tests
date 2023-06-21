import isUUID from '../src/lib/isUUID';

describe('isUUID', () => {
  test('should return true for valid UUIDs', () => {
    expect(isUUID('eebb998a-0fdc-11ee-be56-0242ac120002', 1)).toBe(true);
    expect(isUUID('000003e8-0fdd-21ee-8800-2eb5a363657c', 2)).toBe(true);
    expect(isUUID('e5350157-56b0-32cc-9887-d1eea6925098', 3)).toBe(true);
    expect(isUUID('de6c951a-5ab4-46ef-903b-9ecaa9de7e03', 4)).toBe(true);
    expect(isUUID('6ab4d152-d4e0-56c8-8fe9-67c0efd4002d', 5)).toBe(true);
    expect(isUUID('eebb998a-0fdc-11ee-be56-0242ac120002', 'all')).toBe(true);
  });

  test('should return false for invalid UUIDs', () => {
    expect(isUUID('eebb998a-04fdc-11ee-be56-0242ac120002', 1)).toBe(false);
    expect(isUUID('000003e8-02fdd-21ee-8800-2eb5a363657c', 2)).toBe(false);
    expect(isUUID('e5350157-56ab0-32cc-9887-d1eea6925098', 3)).toBe(false);
    expect(isUUID('de6c951a-5ccab4-46ef-903b-9ecaa9de7e03', 4)).toBe(false);
    expect(isUUID('6ab4d152-d4123e0-56c8-8fe9-67c0efd4002d', 5)).toBe(false);
    expect(isUUID('eebb998a-0f555dc-11ee-be56-0242ac120002', 'all')).toBe(false);
  });
});
