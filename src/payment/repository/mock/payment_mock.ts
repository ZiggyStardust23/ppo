import { IPaymentRepository } from '../payment.js';
import { Payment } from '../../model/payment.js';
import { mock, instance, when } from 'ts-mockito';

export class PaymentRepositoryMock implements IPaymentRepository {
    private readonly mockInstance: IPaymentRepository;

    constructor() {
        this.mockInstance = mock<IPaymentRepository>();
    }

    public getInstance(): IPaymentRepository {
        return instance(this.mockInstance);
    }

    public create(payment: Payment): Promise<Payment> {
        return this.mockInstance.create(payment);
    }

    public getById(paymentId: string): Promise<Payment | null> {
        // Возвращаем Payment, если ID равен 'payment123', иначе возвращаем null
        if (paymentId === 'payment123') {
            const payment: Payment = {
                guid: 'payment123',
                orderId: 'order123',
                status: false,
                sum: 100
            };
            return Promise.resolve(payment);
        } else {
            return Promise.resolve(null);
        }
    }

    public getByOrderId(orderId: string): Promise<Payment | null> {
        // Возвращаем Payment, если ID заказа равен 'order123', иначе возвращаем null
        if (orderId === 'order123') {
            const payment: Payment = {
                guid: 'payment123',
                orderId: 'order123',
                status: false,
                sum: 100
            };
            return Promise.resolve(payment);
        } else {
            return Promise.resolve(null);
        }
    }

    public update(payment: Payment): Promise<Payment | null> {
        // Возвращаем обновленный объект Payment, если обновление прошло успешно
        return Promise.resolve(payment); 
    }
}
