import type { NextConfig } from 'next';
import type { WebsiteDefinition } from '@optimizely/cms/models';
export declare function withOptimizelyConfig(config: NextConfig, websiteConfig: WebsiteDefinition): NextConfig;
