import { PaymentService } from './service/payment.js';
import { IPaymentRepository } from './repository/payment.js';
import { PaymentRepositoryMock } from './repository/mock/payment_mock.js';
import { Payment } from './model/payment.js';
import { instance, mock, when, anything } from 'ts-mockito';
import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';

describe('PaymentService', () => {
    let paymentService: PaymentService;
    let paymentRepositoryMock: IPaymentRepository;

    beforeEach(() => {
        paymentRepositoryMock = mock<PaymentRepositoryMock>();
        paymentService = new PaymentService(instance(paymentRepositoryMock));
    });

    describe('createPayment', () => {
        it('should create a new payment', async () => {
            const orderId = 'order123';
            const sum = 100;
            const expectedPayment: Payment = { guid: 'payment123', orderId, status: false, sum };
            when(paymentRepositoryMock.create(anything())).thenResolve(expectedPayment);
            const result = await paymentService.createPayment(orderId, sum);

            expect(result).deep.equal(expectedPayment);
        });
    });

    describe('updatePaymentStatus', () => {
        it('should update the status of the payment with the given ID', async () => {
            const paymentId = 'payment123';
            const status = true;
            const existingPayment: Payment = { guid: paymentId, orderId: 'order123', status: false, sum: 100 };
            const updatedPayment: Payment = { ...existingPayment, status };
            when(paymentRepositoryMock.getById(anything())).thenResolve(existingPayment);
            when(paymentRepositoryMock.update(anything())).thenResolve(updatedPayment);

            const result = await paymentService.updatePaymentStatus(paymentId, status);

            expect(result).deep.equal(updatedPayment);
        });

        it('should return null if payment with the given ID is not found', async () => {
            // Arrange
            const paymentId = 'invalidPaymentId';
            when(paymentRepositoryMock.getById(paymentId)).thenReturn(Promise.resolve(null));

            // Act
            const result = await paymentService.updatePaymentStatus(paymentId, true);

            // Assert
            expect(result).equal(null);
        });
    });

    describe('getPaymentById', () => {
        it('should return the payment with the given ID', async () => {
            // Arrange
            const paymentId = 'payment123';
            const expectedPayment: Payment = { guid: paymentId, orderId: 'order123', status: false, sum: 100 };
            when(paymentRepositoryMock.getById(paymentId)).thenReturn(Promise.resolve(expectedPayment));

            // Act
            const result = await paymentService.getPaymentById(paymentId);

            // Assert
            expect(result).equal(expectedPayment);
        });

        it('should return null if payment with the given ID is not found', async () => {
            // Arrange
            const paymentId = 'invalidPaymentId';
            when(paymentRepositoryMock.getById(paymentId)).thenReturn(Promise.resolve(null));

            // Act
            const result = await paymentService.getPaymentById(paymentId);

            // Assert
            expect(result).equal(null);
        });
    });

    describe('getPaymentByOrderId', () => {
        it('should return payment for the given order ID', async () => {
            // Arrange
            const orderId = 'order123';
            const expectedPayment: Payment = { guid: 'payment1', orderId, status: false, sum: 100 };
            when(paymentRepositoryMock.getByOrderId(orderId)).thenReturn(Promise.resolve(expectedPayment));

            // Act
            const result = await paymentService.getPaymentByOrderId(orderId);

            // Assert
            expect(result).equal(expectedPayment);
        });

        it('should return null if no payment is found for the given order ID', async () => {
            // Arrange
            const orderId = 'order123';
            when(paymentRepositoryMock.getByOrderId(orderId)).thenReturn(Promise.resolve(null));

            // Act
            const result = await paymentService.getPaymentByOrderId(orderId);

            // Assert
            expect(result).equal(null);
        });
    });
});