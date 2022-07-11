import { useContext } from 'react';
import OptimizelyContext from './context';
export const useAndInitOptimizely = (inEditMode, isEditable) => {
    const opti = useContext(OptimizelyContext);
    if (inEditMode === true) {
        opti.inEditMode = true;
    }
    if (isEditable === true) {
        opti.isEditable = true;
    }
    return opti;
};
export const useOptimizely = () => {
    return useContext(OptimizelyContext);
};
export default useOptimizely;
//# sourceMappingURL=use.js.map