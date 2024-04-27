import { Payment } from "./PaymentModel";

export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    getById(paymentId: string): Promise<Payment | null>;
    getByOrderId(orderId: string): Promise<Payment | null>;
    update(payment: Payment): Promise<Payment | null>;
}
