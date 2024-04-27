export class Order {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    private _userId: string;
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
    private _status: OrderStatus;
    public get status(): OrderStatus {
        return this._status;
    }
    public set status(value: OrderStatus) {
        this._status = value;
    }
    private _address: string;
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    private _date: Date;
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    private _positions: Position[];
    public get positions(): Position[] {
        return this._positions;
    }
    public set positions(value: Position[]) {
        this._positions = value;
    }
    constructor (
        id: string, 
        userId: string,
        status: OrderStatus,
        adress: string,
        date: Date,
        positions: Position[]
    ){
        this._id = id;
        this._userId = userId;
        this._status = status;
        this._address = adress;
        this._date = date;
        this._positions = positions;
    }
    
}

export enum OrderStatus {
    PLACED,
    PROCESSING,
    COMPLETED,
    CANCELLED
}

export class Position {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    private _orderId: string;
    public get orderId(): string {
        return this._orderId;
    }
    public set orderId(value: string) {
        this._orderId = value;
    }
    private _productId: string;
    public get productId(): string {
        return this._productId;
    }
    public set productId(value: string) {
        this._productId = value;
    }
    private _productsAmount: number;
    public get productsAmount(): number {
        return this._productsAmount;
    }
    public set productsAmount(value: number) {
        this._productsAmount = value;
    }

	constructor(id: string, orderId: string, productId: string, productsAmount: number) {
        this._id = id;
        this._orderId = orderId;
        this._productId = productId;
        this._productsAmount = productsAmount;
	}
    
}
