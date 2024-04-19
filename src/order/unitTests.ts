import { expect } from 'chai';
import { IOrderService, OrderService } from './service/order.js';
import { IOrderRepository } from './repository/order.js';
import { Order, OrderStatus, Position } from './model/order.js';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { OrderRepositoryMock } from './repository/mock/order_mock.js';

describe('OrderService', () => {
    let orderService: IOrderService;
    let orderRepositoryMock: IOrderRepository;

    beforeEach(() => {
        orderRepositoryMock = mock<IOrderRepository>();
        orderService = new OrderService(instance(orderRepositoryMock));
    });

    describe('createOrder', () => {
        it('should create a new order', async () => {
            const userId = 'user123';
            const address = '123 Main St';
            const order: Order = {
                guid: 'order123',
                userId: userId,
                status: OrderStatus.PLACED,
                positions: [],
                date: new Date(),
                address: address
            };
    
            when(orderRepositoryMock.create(anything())).thenResolve(order);
    
            const createdOrder = await orderService.createOrder(userId, address);
            expect(createdOrder).to.deep.equal(order);
        });
    });

    describe('getOrderById', () => {
        it('should return the order with the given ID', async () => {
            const orderId = 'testOrderId';
            const order: Order = {
                guid: orderId,
                userId: 'user123',
                status: OrderStatus.PLACED,
                positions: [],
                date: new Date(),
                address: '123 Main St'
            };
            when(orderRepositoryMock.getById(orderId)).thenResolve(order);

            const foundOrder = await orderService.getOrderById(orderId);
            expect(foundOrder).to.deep.equal(order);
        });

        it('should return null if order with the given ID is not found', async () => {
            const orderId = 'nonExistentOrderId';
            when(orderRepositoryMock.getById(orderId)).thenResolve(null);

            const foundOrder = await orderService.getOrderById(orderId);
            expect(foundOrder).to.be.null;
        });
    });

    describe('getOrdersByUserId', () => {
        it('should return orders for the given user ID', async () => {
            const userId = 'user123';
            const orders: Order[] = [
                {
                    guid: 'order1',
                    userId: userId,
                    status: OrderStatus.PLACED,
                    positions: [],
                    date: new Date(),
                    address: '123 Main St'
                },
                // Additional test orders...
            ];
            when(orderRepositoryMock.getByUserId(userId)).thenResolve(orders);

            const foundOrders = await orderService.getOrdersByUserId(userId);
            expect(foundOrders).to.deep.equal(orders);
        });

        it('should return an empty array if no orders are found for the given user ID', async () => {
            const userId = 'nonExistentUserId';
            when(orderRepositoryMock.getByUserId(userId)).thenResolve([]);

            const foundOrders = await orderService.getOrdersByUserId(userId);
            expect(foundOrders).to.deep.equal([]);
        });
    });

    describe('updateOrderStatus', () => {
        it('should update the status of the order with the given ID', async () => {
            const orderId = 'order123';
            const newStatus = OrderStatus.COMPLETED;
            when(orderRepositoryMock.updateOrderStatus(orderId, newStatus)).thenResolve();

            await orderService.updateOrderStatus(orderId, newStatus);
            verify(orderRepositoryMock.updateOrderStatus(orderId, newStatus)).once();
        });
    });

    describe('addPositionToOrder', () => {
        it('should add a new position to the order with the given ID', async () => {
            const orderId = 'order123';
            const position: Position = {
                guid: 'position789',
                orderId: orderId,
                productId: 'product456',
                productsAmount: 2
            };
            when(orderRepositoryMock.addPositionToOrder(orderId, position)).thenResolve();

            await orderService.addPositionToOrder(orderId, position);
            verify(orderRepositoryMock.addPositionToOrder(orderId, position)).once();
        });
    });

    describe('removePositionFromOrder', () => {
        it('should remove the position with the given ID from the order with the given ID', async () => {
            const orderId = 'order123';
            const positionId = 'position789';
            when(orderRepositoryMock.removePositionFromOrder(orderId, positionId)).thenResolve();

            await orderService.removePositionFromOrder(orderId, positionId);
            verify(orderRepositoryMock.removePositionFromOrder(orderId, positionId)).once();
        });
    });
});