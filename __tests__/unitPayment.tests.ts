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
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const createdPayment = new Payment(
            "",
            orderId_,
            status_,
            sum_
        )

        when(paymentRepository.create(anything())).thenResolve(createdPayment);
    
        const result = await paymentService.create(orderId_,);
        expect(result).toEqual(createdPayment);
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
    

        // Act
        const result = await paymentService.findById("test");

        // Assert
        expect(result).toEqual(paymentToFind);
    });

    it('findById: fail', async () => {

        when(paymentRepository.getById("test")).thenResolve(null);
    

        // Act
        const result = await paymentService.findById("test");

        // Assert
        expect(result).toEqual(null);
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
    

        // Act
        const result = await paymentService.findByOrderId("test");

        // Assert
        expect(result).toEqual(paymentToFind);
    });
    it('findByOrderId: fail', async () => {

        when(paymentRepository.getByOrderId("test")).thenResolve(null);
    

        // Act
        const result = await paymentService.findByOrderId("test");

        // Assert
        expect(result).toEqual(null);
    });
    
    it('should succesfully update the status of payment', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const givenPayment = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )
        const paymentToUpdate = new Payment(
            id_,
            orderId_,
            false,
            sum_
        )

        when(paymentRepository.getById("test")).thenResolve(givenPayment);
        when(paymentRepository.update(anything())).thenResolve(paymentToUpdate);
    

        // Act
        const result = await paymentService.update({     
            id: id_,       
            orderId: orderId_,
            status: false,
            sum: sum_
        })

        // Assert
        expect(result).toEqual(paymentToUpdate);
    });

    it('update fail: payment not found', async () => {
        const id_ = "test"
        const orderId_ = "test";
        const status_ = true;
        const sum_ = 20000;
        const givenPayment = new Payment(
            id_,
            orderId_,
            status_,
            sum_
        )
        const paymentToUpdate = new Payment(
            id_,
            orderId_,
            false,
            sum_
        )

        when(paymentRepository.getById("test")).thenResolve(null);
    

        // Act
        const result = await paymentService.update({     
            id: id_,       
            orderId: orderId_,
            status: false,
            sum: sum_
        })

        // Assert
        expect(result).toEqual(null);
    });
});
