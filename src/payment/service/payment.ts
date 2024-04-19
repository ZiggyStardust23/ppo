import { Payment } from "../model/payment.js";
import { IPaymentRepository } from "../repository/payment.js";

export interface IPaymentService {
    createPayment(orderId: string, sum: number): Promise<Payment>;
    updatePaymentStatus(paymentId: string, status: boolean): Promise<Payment | null>;
    getPaymentById(paymentId: string): Promise<Payment | null>;
    getPaymentByOrderId(orderId: string): Promise<Payment | null>;
}

export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    public async createPayment(orderId: string, sum: number): Promise<Payment> {
        const payment: Payment = {
            guid: 'payment123',
            orderId: orderId,
            status: false,
            sum: sum
        };
        return this.paymentRepository.create(payment);
    }
    
    public async updatePaymentStatus(paymentId: string, status: boolean): Promise<Payment | null> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            return null;
        }
        payment.status = status;
        return this.paymentRepository.update(payment);
    }

    public async getPaymentById(paymentId: string): Promise<Payment | null> {
        return this.paymentRepository.getById(paymentId);
    }

    public async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
        return this.paymentRepository.getByOrderId(orderId);
    }
}