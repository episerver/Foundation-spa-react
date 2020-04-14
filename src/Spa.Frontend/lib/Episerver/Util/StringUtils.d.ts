/**
 * String utilities for common advanced string operations, which are needed across multiple
 * locations.
 */
class StringUtils {
    /**
     * Transform a model name, as received from the ContentDelivery API to a safe model name that
     * can be loaded through the ES module loaders.
     * 
     * @param   modelName   The original model name
     */
    static SafeModelName: (modelName: sting) => string
}

export default StringUtils