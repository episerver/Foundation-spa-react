import type { IContent, Property, VerboseProperty, ExpandedTypeFor, PropertyDataType, FlattenedProperty } from '../models';
export declare function isVerboseProperty<VT = unknown, ET = ExpandedTypeFor<VT>, VTI extends string = PropertyDataType<VT>>(toTest: Property<VT, ET, VTI>, propertyType?: VTI): toTest is VerboseProperty<VT, ET, VTI>;
/**
 * Read the value from an IContent property, regardless of the configuration
 * of the ContentDelivery API (i.e. it can either be short or long)
 *
 * @param       model   The IContent data to read from
 * @param       field   The property value to read
 * @returns
 */
export declare function readValue<C extends IContent, F extends keyof C>(model: C | undefined, field: F): FlattenedProperty<C[F] extends Property<infer R> ? R : C[F]>;
export declare function processValue<T>(propertyValue: Property<T>): FlattenedProperty<T>;
