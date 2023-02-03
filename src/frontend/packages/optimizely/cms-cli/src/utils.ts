/**
 * Tranform the provided type to make the fields provided required, without
 * changing any of the other fields.
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Tranform the provided type to make the fields provided optional, without
 * changing any of the other fields.
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Merge to types, but removing the keys shared between the two from Base and
 * taking them from the extension. This allows to change the type of fields
 * within the Extension
 */
export type Extend<Base, Extension> = Omit<Base, keyof Extension> & Extension