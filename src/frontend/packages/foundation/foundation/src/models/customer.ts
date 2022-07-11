export type CustomerBase = {
    readonly Id: string
    Code: string
    FirstName: string
    MiddleName: string
    LastName: string
    FullName: string
    EMail: string
    CustomerGroup: string
    readonly EffectiveCustomerGroup: string
    DefaultShippingAddressId: string
    DefaultBillingAddressId: string
    DefaultLanguage: string
    DefaultCurrency: string
    BirthDate: Date


/*
        public virtual Guid Id { get; set; } = Guid.Empty;
        public virtual string Code { get; set; } = string.Empty;
        public virtual string FirstName { get; set; } = string.Empty;
        public virtual string MiddleName { get; set; } = string.Empty;
        public virtual string LastName { get; set; } = string.Empty;
        public virtual string FullName { get; set; } = string.Empty;
        public virtual string EMail { get; set; } = string.Empty;
        public virtual string CustomerGroup { get; set; } = string.Empty;
        public virtual string EffectiveCustomerGroup { get; set; } = string.Empty;
        public virtual Guid DefaultShippingAddressId { get; set; } = Guid.Empty;
        public virtual Guid DefaultBillingAddressId { get; set; } = Guid.Empty;
        public virtual string DefaultLanguage { get; set; } = string.Empty;
        public virtual string DefaultCurrency { get; set; } = string.Empty;
        public virtual DateTime? BirthDate { get; set; }
*/

}
export type Customer<T extends Record<string, any> = {}> = Omit<CustomerBase, keyof T> & T & {
    [ propertyName: string ] : any
}