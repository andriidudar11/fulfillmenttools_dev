export interface Listing {
    imageUrl: string;
    price: number;
    tenantArticleId: string;
    title: string;
    titleLocalized?: {
        de_DE: string;
        en_US: string;
    };
}
