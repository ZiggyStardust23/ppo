import { IOrderRepository } from './OrderRepository';
import { Order, OrderStatus, OrderPosition } from './OrderModel';
import { orderCreateDTO, orderUpdatePositions, orderUpdateStatus, returnOrderDTO } from './OrderDTO';

export interface IOrderService {
    create(order: orderCreateDTO): Promise<returnOrderDTO>;
    findById(orderId: string): Promise<returnOrderDTO | Error>;
    findByUserId(userid: string): Promise<returnOrderDTO[] | Error>;
    updateOrderStatus(order: orderUpdateStatus): Promise<returnOrderDTO | Error>;
    addPositionsToOrder(order: orderUpdatePositions): Promise<returnOrderDTO | Error>;
    removePositionsFromOrder(order: orderUpdatePositions): Promise<returnOrderDTO | Error>;
}

export class OrderService implements IOrderService {
    constructor(private orderRepository: IOrderRepository) {}

    async create(order: orderCreateDTO): Promise<returnOrderDTO> {

        const orderToCreate = new Order(
            "",
            order.userid,
            OrderStatus.PLACED,
            order.address,
            new Date(),
            order.positions.map(pos => (new OrderPosition(
                pos.id,
                pos.orderId,
                pos.productId,
                pos.productsAmount
            )))); 

        const orderCreated = await this.orderRepository.create(orderToCreate);
        return Promise.resolve(orderCreated.toDTO());
    }

    async findById(orderId: string): Promise<returnOrderDTO | Error> {
        const orderGetted = await this.orderRepository.getById(orderId);
        if (orderGetted == null){
            return Promise.reject(new Error("not found in db by id"));
        }
        return Promise.resolve(orderGetted.toDTO());
    }

    async findByUserId(userid: string): Promise<returnOrderDTO[] | Error> {
        const ordersGetted = await this.orderRepository.getByUserId(userid);
        if (ordersGetted.length == 0){
            return Promise.reject(new Error("not found in db by id"));
        }
        const ordersToReturn: returnOrderDTO[] = [];
        for (let order of ordersGetted){
            ordersToReturn.push(order.toDTO());
        }
        return Promise.resolve(ordersToReturn);
    }

    async updateOrderStatus(order: orderUpdateStatus): Promise<returnOrderDTO | Error> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.resolve(new Error("not found in db by id"));
        }
        
        checkOrder.status = order.status;
        const orderUpdated = await this.orderRepository.update(checkOrder);
        if (orderUpdated == null){
            return Promise.reject(new Error("order found, but error occured"));
        }

        return orderUpdated.toDTO();
    }

    async addPositionsToOrder(order: orderUpdatePositions): Promise<returnOrderDTO | Error> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.reject(new Error("not found in db by id"));
        }
        //Чтобы одинаковые позиции не попадали в order
        let filteredPositions = order.positions.filter(function(pos) {
            for (let dbPos of checkOrder.positions){
                if (dbPos.productId === pos.productId && dbPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })
        for (let pos of filteredPositions){
            checkOrder.positions.push(new OrderPosition("", pos.orderId, pos.productId, pos.productsAmount));
        }
        
        const orderUpdated =  await this.orderRepository.update(checkOrder);
        if (orderUpdated == null){
            return Promise.reject(new Error("order found, but error occured"));
        }
        return orderUpdated.toDTO();
    }

    async removePositionsFromOrder(order: orderUpdatePositions): Promise<returnOrderDTO | Error> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.reject(new Error("not found in db by id"));
        }
        checkOrder.positions = checkOrder.positions.filter(function(pos) {
            for (let delPos of order.positions){
                if (delPos.productId === pos.productId && delPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })

        const orderUpdated =  await this.orderRepository.update(checkOrder);
        if (orderUpdated == null){
            return Promise.reject(new Error("order found, but error occured"));
        }
        return orderUpdated.toDTO();
    }
}

export { OrderPosition, Order, OrderStatus };
