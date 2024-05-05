import { IPaymentRepository } from '../src/payment/PaymentRepository'
import { PaymentService } from '../src/payment/PaymentService'
import { Payment } from '../src/payment/PaymentModel';
import { mock, instance, when, anything } from 'ts-mockito';

describe('OrderService', () => {
    let paymentService: PaymentService;
    let paymentRepository: IPaymentRepository;

    beforeEach(() => {
        paymentRepository = mock<IPaymentRepository>();
        paymentService = new PaymentService(instance(paymentRepository));
    });

    it('should create a payment', async () => {
        const id_ = "1";
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const createdPayment = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )

        when(paymentRepository.create(anything())).thenResolve(createdPayment);
    
        const result = await paymentService.create(orderId_,);
        expect(result).toEqual({
            id: id_,
            orderId: orderId_,
            status: status_,
            sum: sum_
        });
    });

    it('findById: success', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const paymentToFind = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )

        when(paymentRepository.getById("test")).thenResolve(paymentToFind);
    
        const result = await paymentService.findById("test");

        expect(result).toEqual({
                                id: id_,
                                orderId: orderId_,
                                status: status_,
                                sum: sum_
                            });
    });

    it('findById: fail', async () => {

        when(paymentRepository.getById("test")).thenResolve(null);
    
        const result = await paymentService.findById("test");

        expect(result).toEqual({errormsg: "not found in db by id"});
    });

    it('findByOrderId: success', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const paymentToFind = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )

        when(paymentRepository.getByOrderId("test")).thenResolve(paymentToFind);
    
        const result = await paymentService.findByOrderId("test");

        expect(result).toEqual({
                                id: id_,
                                orderId: orderId_,
                                status: status_,
                                sum: sum_
                            });
    });
    it('findByOrderId: fail', async () => {

        when(paymentRepository.getByOrderId("test")).thenResolve(null);
    
        const result = await paymentService.findByOrderId("test");

        expect(result).toEqual({errormsg: "not found in db by order id"});
    });
    
    it('should succesfully update the status of payment', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;

        const paymentUpdated = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )

        when(paymentRepository.update(anything())).thenResolve(paymentUpdated);
    
        const result = await paymentService.update({     
            id: id_,       
            orderId: orderId_,
            status: status_,
            sum: sum_
        })

        expect(result).toEqual({
                                id: id_,
                                orderId: orderId_,
                                status: status_,
                                sum: sum_
                            });
    });

    it('update fail: payment not found', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = false;
        const sum_ = 20000;

        when(paymentRepository.getById("test")).thenResolve(null);
    
        const result = await paymentService.update({     
            id: id_,       
            orderId: orderId_,
            status: false,
            sum: sum_
        })

        expect(result).toEqual({errormsg: "not found in db"});
    });
});
