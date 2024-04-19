export type Basket = {
    guid: string;
    userId: string;
    positions: BasketPosition[];
};

export type BasketPosition = {
    guid: string;
    basketId: string;
    phoneId: string;
    productsAmount: number;
};
