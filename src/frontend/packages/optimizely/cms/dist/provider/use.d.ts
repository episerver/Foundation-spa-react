import type { ContextType } from './context';
export declare const useAndInitOptimizely: (inEditMode?: boolean, isEditable?: boolean) => Readonly<ContextType>;
export declare const useOptimizely: () => Readonly<ContextType>;
export default useOptimizely;
