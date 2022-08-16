export declare const withOptiCms: Promise<void | Response | null> | ((request: import("next-auth/middleware").NextRequestWithAuth, event: import("next/server").NextFetchEvent) => Promise<void | Response | null>);
export default withOptiCms;
export declare const config: {
    matcher: string[];
};
