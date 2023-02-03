import type { NextAuthOptions, Session, CallbacksOptions, Profile, Account, Awaitable } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
export type Cms12JWTData = JWT & {
    error?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    scope?: string;
};
export type Cms12SessionData = Session & {
    error?: string | null;
    at?: string;
    scope?: string;
};
export type Cms12NextAuthOptionsType<P = Profile, A = Account, S extends Session = Cms12SessionData, T extends JWT = Cms12JWTData> = Omit<NextAuthOptions, "callbacks"> & {
    callbacks: Partial<Omit<CallbacksOptions<P, A>, "session" | "jwt"> & {
        session: (params: Omit<Parameters<CallbacksOptions<P, A>["session"]>[0], "session" | "token"> & {
            session: S;
            token: T;
        }) => Awaitable<S>;
        jwt: (params: Omit<Parameters<CallbacksOptions<P, A>["jwt"]>[0], "token"> & {
            token: T;
        }) => Awaitable<T>;
    }>;
};
export declare const Cms12NextAuthOptions: Cms12NextAuthOptionsType;
