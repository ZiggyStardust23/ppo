import { PostgresPaymentRepository } from '../src/payment/PaymentRepository';
import { PaymentService } from '../src/payment/PaymentService';
import { Payment } from '../src/payment/PaymentModel';
import { OrderStatus } from '../src/order/OrderModel';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем экземпляр репозитория
const paymentRepository = new PostgresPaymentRepository();
const paymentService = new PaymentService(paymentRepository);

describe('Payment Service Tests', () => {
    let testOrderId: string;

    test('createPayment - создание платежа', async () => {
        await paymentRepository.initialize();
        const newPayment = await paymentService.create('2');
        expect(newPayment).toBeDefined();
        expect(newPayment.id).toBeDefined();
        expect(newPayment.orderId).toBe('2');
        expect(newPayment.status).toBe(true);
        testOrderId = newPayment.orderId;
    });

    test('getPaymentById - получение платежа по ID', async () => {
        const fetchedPayment = await paymentService.findById('2');
        expect(fetchedPayment).toBeDefined();
        expect(fetchedPayment?.id).toBe(2);
    });

    test('updatePayment - обновление платежа', async () => {
        const updatedPayment = await paymentService.update({
            id: testOrderId,
            orderId: '2',
            status: false, // Предположим, что статус платежа был изменен на COMPLETED
            sum: 6000 // Предположим, что сумма платежа увеличилась до 6000
        });
        expect(updatedPayment).toBeDefined();
        expect(updatedPayment?.id).toBe(testOrderId);
        expect(updatedPayment?.orderId).toBe('2');
        expect(updatedPayment?.status).toBe(false);
        expect(updatedPayment?.sum).toBe(6000);
    });

    test('getPaymentByOrderId - получение платежа по ID заказа', async () => {
        const paymentByOrderId = await paymentService.findByOrderId('2');
        expect(paymentByOrderId).toBeDefined();
        expect(paymentByOrderId?.orderId).toBe(2);
    });
});
