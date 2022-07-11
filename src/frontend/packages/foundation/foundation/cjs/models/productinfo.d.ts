export declare type Product = {
    Id: string;
    Type: string;
    Code: string;
    Name: string;
    Slug: string;
    Url: string;
    Assets: ProductAsset[];
    Price: ProductPrice;
    Properties: ProductProperties;
};
export declare type ConfigurableProduct = Product & {
    Options: ProductOption[];
    Variants: VariantProduct[];
    Type: "ConfigurableProduct";
};
export declare type VariantProduct = Product & {
    Options: Record<string, any>;
    Type: "VariantProduct";
};
export declare type ProductOption = {
    Code: string;
    Name: string;
    Description: string | null;
    Values: ProductOptionValue[];
};
export declare type ProductOptionValue = {
    Value: string;
    Name: string;
    Description: string | null;
    CssColor: string | null;
    ImageUrl: string | null;
};
export declare type ProductAsset = {
    Id: string;
    Group: string;
    Type: string;
    Url: string;
    SortOrder: number;
    Name: string;
};
export declare type ProductPrice = {
    CurrencyCode: string;
    MarketId: string;
    Price: number;
    ListPrice: number;
    IsCustomerSpecific: boolean;
};
export declare type ProductProperties = Record<string, any>;
