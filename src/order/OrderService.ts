import { IOrderRepository } from './OrderRepository';
import { Order, OrderStatus, Position } from './OrderModel';
import { orderCreateDTO, orderUpdatePositions, orderUpdateStatus } from './OrderDTO';

export interface IOrderService {
    create(order: orderCreateDTO): Promise<Order>;
    findById(orderId: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    updateOrderStatus(order: orderUpdateStatus): Promise<Order | null>;
    addPositionsToOrder(order: orderUpdatePositions): Promise<Order | null>;
    removePositionsFromOrder(order: orderUpdatePositions): Promise<Order | null>;
}

export class OrderService implements IOrderService {
    constructor(private orderRepository: IOrderRepository) {}

    async create(order: orderCreateDTO): Promise<Order> {

        const orderToCreate = new Order(
            "",
            order.userId,
            OrderStatus.PLACED,
            order.address,
            new Date(),
            order.positions
        ); 

        return await this.orderRepository.create(orderToCreate);
    }

    async findById(orderId: string): Promise<Order | null> {
        return await this.orderRepository.getById(orderId);
    }

    async findByUserId(userId: string): Promise<Order[]> {
        return await this.orderRepository.getByUserId(userId);
    }

    async updateOrderStatus(order: orderUpdateStatus): Promise<Order | null> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.resolve(null);
        }
        checkOrder.status = order.status;
        return await this.orderRepository.update(checkOrder);
    }

    async addPositionsToOrder(order: orderUpdatePositions): Promise<Order | null> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.resolve(null);
        }
        //Чтобы одинаковые позиции не попадали в order
        let filteredPositions = order.positions.filter(function(pos) {
            for (let dbPos of checkOrder.positions){
                if (dbPos.id === pos.id){
                    return false;
                }
            }
            return true;
        })
        for (let pos of filteredPositions){
            checkOrder.positions.push(pos);
        }
        
        return await this.orderRepository.update(checkOrder);
    }

    async removePositionsFromOrder(order: orderUpdatePositions): Promise<Order | null> {
        const checkOrder = await this.orderRepository.getById(order.id);
        if (checkOrder == null){
            return Promise.resolve(null);
        }
        checkOrder.positions = checkOrder.positions.filter(function(pos) {
            for (let delPos of order.positions){
                if (delPos.id === pos.id){
                    return false;
                }
            }
            return true;
        })

        return await this.orderRepository.update(checkOrder);
    }
}