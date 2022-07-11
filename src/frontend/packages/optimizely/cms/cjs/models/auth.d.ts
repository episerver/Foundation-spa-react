export declare type AuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    client_id: string;
    username: string;
    ".issued": Date;
    ".expires": Date;
};
export declare type AuthApiResponse = {
    readonly [P in keyof AuthResponse]: AuthResponse[P] extends Date ? string : AuthResponse[P];
};
export declare type AuthRequest = {
    client_id: "Default";
} & ({
    grant_type: "refresh_token";
    refresh_token: string;
} | {
    grant_type: "password";
    username: string;
    password: string;
});
