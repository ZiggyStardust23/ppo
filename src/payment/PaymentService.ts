import { paymentServiceError, paymentUpdateDTO, returnPaymentDTO } from "./PaymentDTO";
import { Payment } from "./PaymentModel";
import { IPaymentRepository } from "./PaymentRepository";

export interface IPaymentService {
    create(orderid: string): Promise<returnPaymentDTO>;
    update(payment: paymentUpdateDTO): Promise<returnPaymentDTO | paymentServiceError>;
    findById(paymentId: string): Promise<returnPaymentDTO | paymentServiceError>;
    findByOrderId(orderId: string): Promise<returnPaymentDTO | paymentServiceError>;
}

export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository) {}

    public async create(orderid: string): Promise<returnPaymentDTO> {
        const paymentToCreate = new Payment("", orderid, true, 0);
        const paymentCreated = await this.paymentRepository.create(paymentToCreate);
        return paymentCreated.toDTO();
    }
    
    public async update(payment: paymentUpdateDTO): Promise<returnPaymentDTO | paymentServiceError> {
        const paymentToUpdate = new Payment(payment.id, payment.orderId, payment.status, payment.sum);
        const paymentUpdated = await  this.paymentRepository.update(paymentToUpdate);
        if (paymentUpdated == null){
            return Promise.resolve({errormsg: "not found in db"});
        }
        return Promise.resolve(paymentUpdated.toDTO())
    }

    public async findById(paymentId: string): Promise<returnPaymentDTO | paymentServiceError> {
        const paymentGetted = await this.paymentRepository.getById(paymentId);
        if (paymentGetted == null){
            return Promise.resolve({errormsg: "not found in db by id"});
        }
        return Promise.resolve(paymentGetted.toDTO())
    }

    public async findByOrderId(orderId: string): Promise<returnPaymentDTO | paymentServiceError> {
        const paymentGetted = await this.paymentRepository.getByOrderId(orderId);
        if (paymentGetted == null){
            return Promise.resolve({errormsg: "not found in db by order id"});
        }
        return Promise.resolve(paymentGetted.toDTO())
    }
}