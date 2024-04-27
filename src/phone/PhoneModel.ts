export class Phone {
    private _id: string;
    private _name: string;
    private _producerName: string;
    private _osName: string;
    private _ramSize: number;
    private _memSize: number;
    private _camRes: number;
    private _price: number;

    constructor(
        id: string,
        name: string,
        producerName: string,
        osName: string,
        ramSize: number,
        memSize: number,
        camRes: number,
        price: number
    ) {
        this._id = id;
        this._name = name;
        this._producerName = producerName;
        this._osName = osName;
        this._ramSize = ramSize;
        this._memSize = memSize;
        this._camRes = camRes;
        this._price = price;
    }

    clone(): Phone{
        return new Phone(
            this.id,
            this.name,
            this.producerName,
            this.osName,
            this.ramSize,
            this.memSize,
            this.camRes,
            this.price
        )
    }

    get id(): string {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get producerName(): string {
        return this._producerName;
    }
    set producerName(producerName: string) {
        this._producerName = producerName;
    }

    get osName(): string {
        return this._osName;
    }
    set osName(osName: string) {
        this._osName = osName;
    }

    get ramSize(): number {
        return this._ramSize;
    }
    set ramSize(ramSize: number) {
        this._ramSize = ramSize;
    }

    get memSize(): number {
        return this._memSize;
    }
    set memSize(memSize: number) {
        this._memSize = memSize;
    }

    get camRes(): number {
        return this._camRes;
    }
    set camRes(camRes: number) {
        this._camRes = camRes;
    }

    get price(): number {
        return this._price;
    }
    set price(price: number) {
        this._price = price;
    }
}
