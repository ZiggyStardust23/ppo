type paymentUpdateDTO = {
    id: string,
    orderId: string,
    status: boolean,
    sum: number
}

type returnPaymentDTO = {
    id: string,
    orderId: string,
    status: boolean,
    sum: number
}

type paymentServiceError = {errormsg: string};

export {paymentUpdateDTO, returnPaymentDTO, paymentServiceError}