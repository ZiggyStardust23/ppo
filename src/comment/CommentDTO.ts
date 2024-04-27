type commentCreateDTO = {
    userId: string, 
    productId: string, 
    text: string,
}

type commentUpdateRateDTO = {
    id: string, 
    rate: number
}

export {commentCreateDTO, commentUpdateRateDTO}