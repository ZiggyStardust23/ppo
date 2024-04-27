import { Order, Position } from './OrderModel';
import { OrderStatus } from './OrderModel';

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    getById(orderId: string): Promise<Order | null>;
    getByUserId(userId: string): Promise<Order[]>;
    update(order: Order): Promise<Order>;
}