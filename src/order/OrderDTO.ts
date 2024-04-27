import { OrderStatus, Position } from "./OrderModel"

type orderCreateDTO = {
    userId: string,
    address: string,
    positions: Position[],
}

type orderUpdateStatus = {
    id: string,
    status: OrderStatus
}

type orderUpdatePositions = {
    id: string,
    positions: Position[]
}

export {orderCreateDTO, orderUpdatePositions, orderUpdateStatus}