export declare type CustomerBase = {
    readonly Id: string;
    Code: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    FullName: string;
    EMail: string;
    CustomerGroup: string;
    readonly EffectiveCustomerGroup: string;
    DefaultShippingAddressId: string;
    DefaultBillingAddressId: string;
    DefaultLanguage: string;
    DefaultCurrency: string;
    BirthDate: Date;
};
export declare type Customer<T extends Record<string, any> = {}> = Omit<CustomerBase, keyof T> & T & {
    [propertyName: string]: any;
};
