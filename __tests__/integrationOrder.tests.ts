import { PostgresOrderRepository } from '../src/order/OrderRepository';
import { OrderService, Order, OrderStatus, Position } from '../src/order/OrderService';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем экземпляр репозитория
const orderRepository = new PostgresOrderRepository();
const orderService = new OrderService(orderRepository);

describe('Order Repository Tests', () => {
    let testOrderId: string;
    let posId: string;

    test('createOrder - создание заказа', async () => {
        await orderRepository.initialize();
        const newOrder = new Order(
            '',
            '2',
            OrderStatus.PLACED,
            'some_address_here',
            new Date(),
            []
        );
        const createdOrder = await orderService.create({
            userid: '2',
            address: 'some_address_here',
            positions: []
        });
        expect(createdOrder).toBeDefined();
        expect(createdOrder.id).toBeDefined();
        expect(createdOrder.userid).toBe(newOrder.userid);
        expect(createdOrder.status).toBe(newOrder.status);
        expect(createdOrder.address).toBe(newOrder.address);
        expect(createdOrder.date).toBeDefined(); // Так как дата автоматически генерируется
        expect(createdOrder.positions).toEqual(newOrder.positions);
        testOrderId = createdOrder!.id;
    });

    test('findOrderById - получение заказа по ID', async () => {
        const fetchedOrder = await orderService.findById(testOrderId);
        expect(fetchedOrder).toBeDefined();
        expect(fetchedOrder?.id).toBe(testOrderId);
    });

    test('findByUserId - получение заказов по ID пользователя', async () => {
        const fetchedOrders = await orderService.findByuserid('2');
        expect(fetchedOrders).toBeDefined();
        expect(fetchedOrders.length).toBeGreaterThan(0);
        expect(fetchedOrders.every(order => order.userid == '2')).toBeTruthy();
    });

    test('updateOrderStatus - обновление статуса заказа', async () => {
        const updatedOrder = await orderService.updateOrderStatus({
            id: testOrderId,
            status: OrderStatus.COMPLETED
        });
        expect(updatedOrder).toBeDefined();
        expect(updatedOrder?.id).toBe(testOrderId);
        expect(updatedOrder?.status).toBe(OrderStatus.COMPLETED);
    });

    test('addPositionsToOrder - добавление позиций в заказ', async () => {
        const position: Position = new Position(
            '',
            testOrderId,
            '2',
            2
        );
        const updatedOrder = await orderService.addPositionsToOrder({
            id: testOrderId,
            positions: [position]
        });
        posId = updatedOrder?.positions[0].id || '';
    });

    test('removePositionsFromOrder - удаление позиций из заказа', async () => {
        const updatedOrder = await orderService.removePositionsFromOrder({
        id: testOrderId,
        positions: [new Position(
                posId,
                testOrderId,
                '1',
                2
        )]})
        expect(updatedOrder).toBeDefined();
        expect(updatedOrder?.id).toBe(testOrderId);
        expect(updatedOrder?.positions.length).toBe(0);
    });
});
