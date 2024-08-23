export interface Item {
    shortDescription: string;
    price: number;
}

export interface Receipt {
    retailer: string;
    purchaseDate: string;
    purchaseTime: string;
    items: Item[];
    total: number;
}
