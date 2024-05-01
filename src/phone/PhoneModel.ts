export class Phone {
    private _id: string;
    private _name: string;
    private _producername: string;
    private _osname: string;
    private _ramsize: number;
    private _memsize: number;
    private _camres: number;
    private _price: number;

    constructor(
        id: string,
        name: string,
        producername: string,
        osname: string,
        ramsize: number,
        memsize: number,
        camres: number,
        price: number
    ) {
        this._id = id;
        this._name = name;
        this._producername = producername;
        this._osname = osname;
        this._ramsize = ramsize;
        this._memsize = memsize;
        this._camres = camres;
        this._price = price;
    }

    clone(): Phone{
        return new Phone(
            this.id,
            this.name,
            this.producername,
            this.osname,
            this.ramsize,
            this.memsize,
            this.camres,
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

    get producername(): string {
        return this._producername;
    }
    set producername(producername: string) {
        this._producername = producername;
    }

    get osname(): string {
        return this._osname;
    }
    set osname(osname: string) {
        this._osname = osname;
    }

    get ramsize(): number {
        return this._ramsize;
    }
    set ramsize(ramsize: number) {
        this._ramsize = ramsize;
    }

    get memsize(): number {
        return this._memsize;
    }
    set memsize(memsize: number) {
        this._memsize = memsize;
    }

    get camres(): number {
        return this._camres;
    }
    set camres(camres: number) {
        this._camres = camres;
    }

    get price(): number {
        return this._price;
    }
    set price(price: number) {
        this._price = price;
    }
}
