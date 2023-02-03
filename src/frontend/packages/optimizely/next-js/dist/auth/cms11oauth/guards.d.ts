import type { User as NextAuthUser } from 'next-auth';
import type { User } from './types';
export declare function isUser(toTest: NextAuthUser | undefined): toTest is User;
