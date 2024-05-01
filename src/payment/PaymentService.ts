import { paymentUpdateDTO } from "./PaymentDTO";
import { Payment } from "./PaymentModel";
import { IPaymentRepository } from "./PaymentRepository";

export interface IPaymentService {
    create(orderid: string): Promise<Payment>;
    update(payment: paymentUpdateDTO): Promise<Payment | null>;
    findById(paymentId: string): Promise<Payment | null>;
    findByOrderId(orderId: string): Promise<Payment | null>;
}

export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    public async create(orderid: string): Promise<Payment> {
        const paymentCreated = new Payment("", orderid, true, 0);
        return this.paymentRepository.create(paymentCreated);
    }
    
    public async update(payment: paymentUpdateDTO): Promise<Payment | null> {
        const checkPayment = await this.paymentRepository.getById(payment.id);
        if (!checkPayment) {
            return null;
        }
        const paymentToUpdate = new Payment(payment.id, payment.orderId, payment.status, payment.sum);
        return this.paymentRepository.update(paymentToUpdate);
    }

    public async findById(paymentId: string): Promise<Payment | null> {
        return this.paymentRepository.getById(paymentId);
    }

    public async findByOrderId(orderId: string): Promise<Payment | null> {
        return this.paymentRepository.getByOrderId(orderId);
    }
}