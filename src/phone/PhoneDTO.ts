type phoneFullDTO = {
    id: string,
    name: string,
    producerName: string,
    osName: string,
    ramSize: number,
    memSize: number,
    camRes: number,
    price: number
}

type phoneCreateDTO = {
    name: string,
    producerName: string,
    osName: string,
    ramSize: number,
    memSize: number,
    camRes: number,
    price: number
}

export {phoneFullDTO, phoneCreateDTO}