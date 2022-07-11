import { useContext } from 'react'
import type { ContextType } from './context'
import OptimizelyContext from './context'

export const useAndInitOptimizely : (inEditMode ?: boolean, isEditable ?: boolean) => Readonly<ContextType> = (inEditMode ?: boolean, isEditable ?: boolean) => 
{
    const opti = useContext(OptimizelyContext)
    if (inEditMode === true) {
        opti.inEditMode = true
    }
    if (isEditable === true) {
        opti.isEditable = true
    }
    return opti;
}

export const useOptimizely : () => Readonly<ContextType> = () => 
{
    return useContext(OptimizelyContext)
}
export default useOptimizely