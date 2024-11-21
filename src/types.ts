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
export interface ProcessResult {
    /** Whether the processing was successful */
    success: boolean;
    /** Error message if processing failed */
    error?: string;
    /** Processed data */
    data: any;
}

/**
 * Available rounding methods
 */
export type RoundingMethod = 'round' | 'floor' | 'ceil';