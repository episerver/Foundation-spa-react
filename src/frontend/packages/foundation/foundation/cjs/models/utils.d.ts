/**
 * Change the type of one or more fields in the base type, to the specified type.
 */
export declare type ChangeType<Tin, Field extends keyof Tin, NewType> = Omit<Tin, Field> & {
    [Field in keyof Tin]: NewType;
};
/**
 * Construct a type by extending the base type, this makes sure that the
 * extension fully overrides the fields shared between the input and
 * extension
 */
export declare type ExtendType<Tin, TExtension> = Omit<Tin, keyof TExtension> & TExtension;
