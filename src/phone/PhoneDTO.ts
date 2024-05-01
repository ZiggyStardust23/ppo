type phoneFullDTO = {
    id: string,
    name: string,
    producername: string,
    osname: string,
    ramsize: number,
    memsize: number,
    camres: number,
    price: number
}

type phoneSearchDTO = {
    name: string,
    producername: string,
    osname: string,
    minramsize: number,
    maxramsize: number,
    minmemsize: number,
    maxmemsize: number,
    mincamres: number,
    maxcamres: number,
    minPrice: number,
    maxPrice: number
}

type phoneCreateDTO = {
    name: string,
    producername: string,
    osname: string,
    ramsize: number,
    memsize: number,
    camres: number,
    price: number
}

export {phoneFullDTO, phoneCreateDTO, phoneSearchDTO}