/**
 * Find and replace the @PreLoad annotation within a
 * TypeScript file to automatically create a pre-load
 * of normally dynamically loaded modules.
 * 
 * @param source The source prepared by Webpack
 * @returns      The source with the injected preloading code
 */
export default function (source: string): string;