import { IOrderRepository } from '../repository/order.js';
import { Order, OrderStatus, Position } from '../model/order.js';
import { v4 as uuidv4 } from 'uuid';

export interface IOrderService {
    createOrder(userId: string, address: string): Promise<Order>;
    getOrderById(orderId: string): Promise<Order | null>;
    getOrdersByUserId(userId: string): Promise<Order[]>;
    updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void>;
    addPositionToOrder(orderId: string, position: Position): Promise<void>;
    removePositionFromOrder(orderId: string, positionId: string): Promise<void>;
}

export class OrderService implements IOrderService {
    constructor(private orderRepository: IOrderRepository) {}

    async createOrder(userId: string, address: string): Promise<Order> {
        const order: Order = {
            guid: generateGuid(),
            userId,
            status: OrderStatus.PLACED,
            address,
            date: new Date(),
            positions: []
        };
        return await this.orderRepository.create(order);
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        return await this.orderRepository.getById(orderId);
    }

    async getOrdersByUserId(userId: string): Promise<Order[]> {
        return await this.orderRepository.getByUserId(userId);
    }

    async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
        await this.orderRepository.updateOrderStatus(orderId, newStatus);
    }

    async addPositionToOrder(orderId: string, position: Position): Promise<void> {
        await this.orderRepository.addPositionToOrder(orderId, position);
    }

    async removePositionFromOrder(orderId: string, positionId: string): Promise<void> {
        await this.orderRepository.removePositionFromOrder(orderId, positionId);
    }
}

function generateGuid(): string {
    return uuidv4();
}