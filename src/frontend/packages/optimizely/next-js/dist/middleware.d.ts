import type { NextRequest, NextMiddleware, NextFetchEvent } from 'next/server';
export declare type OptiCmsMiddleware = (req: NextRequest, event: NextFetchEvent, nextMiddleware?: NextMiddleware) => ReturnType<NextMiddleware>;
export declare const withOptiCms: OptiCmsMiddleware;
export default withOptiCms;
