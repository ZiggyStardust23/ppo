type paymentCreateDTO = {
    orderId: string,
    sum: number
}

type paymentUpdateDTO = {
    id: string,
    orderId: string,
    status: boolean,
    sum: number
}

export {paymentCreateDTO, paymentUpdateDTO}