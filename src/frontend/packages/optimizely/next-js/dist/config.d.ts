import type { NextConfig } from 'next';
import type { WebsiteDefinition } from '@optimizely/cms/models';
/**
 * Automatically incorportate the needed configuration to connect with Optimizely
 * Content Cloud within a Next.JS site
 *
 * @param config            The base configuration, which will be extended
 * @param websiteConfig     Contents of the generated website definition file, which will be used
 */
export declare function withOptimizelyConfig(config: NextConfig, websiteConfig: WebsiteDefinition): NextConfig;
