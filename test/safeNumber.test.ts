import SafeNumber from '../src/safeNumber';

describe('SafeNumber', () => {
  let safeNumber: SafeNumber;

  beforeEach(() => {
    safeNumber = new SafeNumber({
      convertAll: false,
      specialKeys: ['id', 'userId'],
      decimalPlaces: 2,
    });
  });

  describe('Basic Number Handling', () => {
    test('should handle integer numbers', () => {
      const result = safeNumber.handleResponse({ value: 42 });
      expect(result.data.value).toBe(42);
    });

    test('should handle floating point numbers', () => {
      const result = safeNumber.handleResponse({ value: 3.14159 });
      expect(result.data.value).toBe(3.14);
    });

    test('should handle string numbers', () => {
      const result = safeNumber.handleResponse({ value: '123.456' });
      expect(result.data.value).toBe(123.46);
    });
  });

  describe('Special Fields Handling', () => {
    test('should convert special keys to strings', () => {
      const result = safeNumber.handleResponse({
        userId: 12345678901234567890,
        balance: 1000.567,
      });
      expect(typeof result.data.userId).toBe('string');
      expect(result.data.balance).toBe(1000.57);
    });
  });

  describe('Array Handling', () => {
    test('should process arrays correctly', () => {
      const result = safeNumber.handleResponse([1.234, 5.678]);
      expect(result.data).toEqual([1.23, 5.68]);
    });
  });

  describe('Nested Object Handling', () => {
    test('should process nested objects', () => {
      const result = safeNumber.handleResponse({
        user: {
          id: 12345678901234567890,
          scores: [98.765, 87.654],
        },
      });
      expect(typeof result.data.user.id).toBe('string');
      expect(result.data.user.scores).toEqual([98.77, 87.65]);
    });
  });

  describe('Currency Formatting', () => {
    test('should format currency correctly', () => {
      const formatted = safeNumber.formatCurrency(1234.56);
      expect(formatted).toBe('¥1,234.56');
    });
  });

  describe('Custom Rounding', () => {
    test('should round numbers using different methods', () => {
      expect(safeNumber.customRound(3.14159, 2)).toBe(3.14);
      expect(safeNumber.customRound(3.14159, 2, 'floor')).toBe(3.14);
      expect(safeNumber.customRound(3.14159, 2, 'ceil')).toBe(3.15);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid input gracefully', () => {
      const result = safeNumber.handleResponse({ value: NaN });
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(NaN);
    });
  });

  describe('Static Methods', () => {
    test('should check safe integers', () => {
      expect(SafeNumber.isSafeInteger(42)).toBe(true);
      expect(SafeNumber.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });

    test('should validate numbers', () => {
      expect(SafeNumber.isValidNumber(42)).toBe(true);
      expect(SafeNumber.isValidNumber('42')).toBe(true);
      expect(SafeNumber.isValidNumber('abc')).toBe(false);
    });
  });
});
