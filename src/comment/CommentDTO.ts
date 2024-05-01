type commentCreateDTO = {
    userid: string, 
    productId: string, 
    text: string,
}

type commentUpdateRateDTO = {
    id: string, 
    rate: number
}

export {commentCreateDTO, commentUpdateRateDTO}