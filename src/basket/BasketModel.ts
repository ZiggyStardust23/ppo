export class Basket {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    private _userid: string;
    public get userid(): string {
        return this._userid;
    }
    public set userid(value: string) {
        this._userid = value;
    }
    private _positions: BasketPosition[];
    public get positions(): BasketPosition[] {
        return this._positions;
    }
    public set positions(value: BasketPosition[]) {
        this._positions = value;
    }
    
    constructor(
        id: string,
        userid: string,
        positions: BasketPosition[], 
    ){
        this._id = id;
        this._userid = userid;
        this._positions = positions
    }
}

export class BasketPosition {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    private _basketId: string;
    public get basketId(): string {
        return this._basketId;
    }
    public set basketId(value: string) {
        this._basketId = value;
    }
    private _phoneId: string;
    public get phoneId(): string {
        return this._phoneId;
    }
    public set phoneId(value: string) {
        this._phoneId = value;
    }
    private _productsAmount: number;
    public get productsAmount(): number {
        return this._productsAmount;
    }
    public set productsAmount(value: number) {
        this._productsAmount = value;
    }
    constructor(
        id: string,
        basketId: string,
        phoneId: string,
        productsAmount: number
    ){
        this._id = id;
        this._basketId = basketId;
        this._phoneId = phoneId;
        this._productsAmount = productsAmount;
    }
};
