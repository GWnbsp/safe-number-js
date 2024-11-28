import {
  SafeNumberOptions,
  ProcessResult,
  RoundingMethod,
  ProcessableData,
  JsonValue,
  JsonObject,
} from './types';

class SafeNumber {
  private readonly MAX_SAFE_INTEGER: number;
  private readonly MIN_SAFE_INTEGER: number;
  private readonly NUMBER_REGEX: RegExp;
  private readonly options: Required<SafeNumberOptions>;
  private readonly ignoreKeysSet: Set<string>;
  private readonly specialKeysSet: Set<string>;

  constructor(options: SafeNumberOptions = {}) {
    this.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
    this.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
    this.NUMBER_REGEX = /^-?\d*\.?\d+$/;

    this.options = {
      convertAll: false,
      ignoreKeys: [],
      specialKeys: ['id', 'userId', 'orderId'],
      decimalPlaces: 2,
      ...options,
    };

    this.ignoreKeysSet = new Set(this.options.ignoreKeys);
    this.specialKeysSet = new Set(this.options.specialKeys);

    this.validateOptions();
  }

  private validateOptions(): void {
    if (typeof this.options.convertAll !== 'boolean') {
      throw new Error('convertAll must be a boolean');
    }
    if (!Array.isArray(this.options.ignoreKeys)) {
      throw new Error('ignoreKeys must be an array');
    }
    if (!Array.isArray(this.options.specialKeys)) {
      throw new Error('specialKeys must be an array');
    }
    if (
      typeof this.options.decimalPlaces !== 'number' ||
      this.options.decimalPlaces < 0
    ) {
      throw new Error('decimalPlaces must be a non-negative number');
    }
  }

  public handleResponse<T extends ProcessableData>(data: T): ProcessResult<T> {
    try {
      const processedData = this.recursiveHandle(data) as T;
      return {
        success: true,
        data: processedData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: data,
      };
    }
  }

  private recursiveHandle<T extends ProcessableData>(
    data: T,
    currentKey = '',
  ): T {
    if (Array.isArray(data)) {
      return data.map((item) => this.recursiveHandle(item, currentKey)) as T;
    }

    if (typeof data === 'object' && data !== null) {
      const result: JsonObject = {};
      for (const key in data) {
        if (this.isIgnoredKey(key)) {
          result[key] = data[key];
          continue;
        }
        result[key] = this.recursiveHandle(data[key], key);
      }
      return result as T;
    }

    return this.handleValue(data, currentKey) as T;
  }

  private isSpecialKey(key: string): boolean {
    return this.specialKeysSet.has(key);
  }

  private isIgnoredKey(key: string): boolean {
    return this.ignoreKeysSet.has(key);
  }

  private handleValue(value: JsonValue, key: string): JsonValue {
    if (typeof value === 'number') {
      return this.handleNumber(value, key);
    }

    if (typeof value === 'string' && this.NUMBER_REGEX.test(value.trim())) {
      const num = Number(value);
      if (
        this.isSpecialKey(key) ||
        num > this.MAX_SAFE_INTEGER ||
        num < this.MIN_SAFE_INTEGER
      ) {
        return value;
      }
      return this.options.convertAll ? value : this.handleNumber(num, key);
    }

    return value;
  }

  private handleNumber(num: number, key: string): string | number {
    if (this.isSpecialKey(key)) {
      return String(num);
    }

    if (num > this.MAX_SAFE_INTEGER || num < this.MIN_SAFE_INTEGER) {
      return String(num);
    }

    if (num % 1 !== 0) {
      const fixed = this.customRound(num, this.options.decimalPlaces);
      return this.options.convertAll ? String(fixed) : fixed;
    }

    return this.options.convertAll ? String(num) : num;
  }

  public customRound(
    value: number,
    precision: number,
    method: RoundingMethod = 'round',
  ): number {
    const factor = Math.pow(10, precision);
    switch (method) {
      case 'floor':
        return Math.floor(value * factor) / factor;
      case 'ceil':
        return Math.ceil(value * factor) / factor;
      default:
        return Math.round(value * factor) / factor;
    }
  }

  public formatCurrency(value: number, currency = 'CNY'): string {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency,
    }).format(value);
  }

  public batchProcess<T extends ProcessableData[]>(items: T): ProcessResult<T> {
    try {
      const results = items.map((item) => this.handleResponse(item));
      return {
        success: true,
        data: results.map((r) => r.data) as T,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: items,
      };
    }
  }

  public static isSafeInteger(num: number): boolean {
    return num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER;
  }

  public static isValidNumber(value: JsonValue): boolean {
    if (typeof value === 'number') {
      return !isNaN(value) && isFinite(value);
    }
    if (typeof value === 'string') {
      const num = Number(value);
      return !isNaN(num) && isFinite(num);
    }
    return false;
  }
}

export default SafeNumber;
