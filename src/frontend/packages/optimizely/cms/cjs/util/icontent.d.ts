import type { IContent, ErrorType, ErrorContent } from '../models';
export declare function isIContent(toTest: any): toTest is IContent;
export declare function createErrorContent(errorType: ErrorType, code: number, message?: string, contentReference?: string, details?: any): ErrorContent;
