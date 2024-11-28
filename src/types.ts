/**
 * SafeNumber configuration options
 */
export interface SafeNumberOptions {
  /** Convert all numbers to strings */
  convertAll?: boolean;
  /** Keys to ignore during processing */
  ignoreKeys?: string[];
  /** Keys that should always be converted to strings */
  specialKeys?: string[];
  /** Number of decimal places to round to */
  decimalPlaces?: number;
}

/**
 * Result of processing data through SafeNumber
 */
export interface ProcessResult<T> {
  /** Whether the processing was successful */
  success: boolean;
  /** Error message if processing failed */
  error?: string;
  /** Processed data */
  data: T;
}

/**
 * Available rounding methods
 */
export type RoundingMethod = 'round' | 'floor' | 'ceil';

/**
 * JSON primitive types
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * JSON array type
 */
export type JsonArray = JsonValue[];

/**
 * JSON object type
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * JSON value type
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

/**
 * Type of data that can be processed by SafeNumber
 */
export type ProcessableData = JsonValue;
