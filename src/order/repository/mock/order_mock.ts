import { IOrderRepository } from '../order.js';
import { Order, Position, OrderStatus } from '../../model/order.js';
import { v4 as uuidv4 } from 'uuid';
import { instance, mock } from 'ts-mockito';

export class OrderRepositoryMock implements IOrderRepository {
    private mock: IOrderRepository = mock<IOrderRepository>();

    public getInstance(): IOrderRepository {
        return instance(this.mock);
    }

    public async create(order: Order): Promise<Order> {
        return this.mock.create(order);
    }

    public async getById(orderId: string): Promise<Order | null> {
        return this.mock.getById(orderId);
    }

    public async getByUserId(userId: string): Promise<Order[]> {
        return this.mock.getByUserId(userId);
    }

    public async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
        return this.mock.updateOrderStatus(orderId, newStatus);
    }

    public async addPositionToOrder(orderId: string, position: Position): Promise<void> {
        return this.mock.addPositionToOrder(orderId, position);
    }

    public async removePositionFromOrder(orderId: string, positionId: string): Promise<void> {
        return this.mock.removePositionFromOrder(orderId, positionId);
    }
}