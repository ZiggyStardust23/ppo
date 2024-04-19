export interface Order {
    guid: string;
    userId: string;
    status: OrderStatus;
    address: string;
    date: Date;
    positions: Position[];
}

export enum OrderStatus {
    PLACED,
    PROCESSING,
    COMPLETED,
    CANCELLED
}

export interface Position {
    guid: string;
    orderId: string;
    productId: string;
    productsAmount: number;
}
