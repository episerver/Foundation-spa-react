/**
 * The path provider is the generic interface that must be implemented within the
 * Episerver context to ensure the current path is provided correctly based upon
 * the current execution environment.
 */
export default interface PathProvider {
    /**
     * Retrieve the current application path
     */
    getCurrentPath(): string
}