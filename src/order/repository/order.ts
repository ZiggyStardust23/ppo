import { Order, Position } from '../model/order.js';
import { OrderStatus } from '../model/order.js';

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    getById(orderId: string): Promise<Order | null>;
    getByUserId(userId: string): Promise<Order[]>;
    updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void>;
    addPositionToOrder(orderId: string, position: Position): Promise<void>;
    removePositionFromOrder(orderId: string, positionId: string): Promise<void>;
}