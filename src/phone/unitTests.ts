import { expect } from 'chai';
import { PhoneService } from './service/phone.js';
import { IPhoneRepository } from './repository/phone.js';
import { Phone } from './model/phone.js';
import { PhoneRepositoryMock } from './repository/mock/phone_mock.js';
import { mock, instance, when } from 'ts-mockito';

describe('PhoneService', () => {
    let phoneService: PhoneService;
    let phoneRepository: IPhoneRepository;

    beforeEach(() => {
        phoneRepository = mock(PhoneRepositoryMock);
        phoneService = new PhoneService(instance(phoneRepository));
    });

    describe('getById', () => {
        it('should return phone by id', async () => {
            const id = '1';
            const phone: Phone = new Phone(id, 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500);

            when(phoneRepository.getById(id)).thenResolve(phone);

            const result = await phoneService.getById(id);

            expect(result).to.deep.equal(phone);
        });

        it('should return null if phone is not found', async () => {
            const id = '1';

            when(phoneRepository.getById(id)).thenResolve(null);

            const result = await phoneService.getById(id);

            expect(result).to.be.null;
        });
    });

    describe('search', () => {
        it('should return phones by characteristics', async () => {
            const props: Partial<Phone> = { osName: 'OS1', ramSize: 4 };
            const phones: Phone[] = [
                new Phone('1', 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500),
                new Phone('2', 'Phone2', 'Producer2', 'OS1', 4, 128, 16, 700)
            ];

            when(phoneRepository.search(props)).thenResolve(phones);

            const result = await phoneService.search(props);

            expect(result).to.deep.equal(phones);
        });

        it('should return an empty array if no phones are found by characteristics', async () => {
            const props: Partial<Phone> = { osName: 'NonExistingOS', ramSize: 8 };

            when(phoneRepository.search(props)).thenResolve([]);

            const result = await phoneService.search(props);

            expect(result).to.deep.equal([]);
        });
    });

    describe('paginate', () => {
        it('should return phones with pagination by characteristics', async () => {
            const props: Partial<Phone> = { osName: 'OS1', ramSize: 4 };
            const pageNumber = 1;
            const pageSize = 10;
            const phones: Phone[] = [
                new Phone('1', 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500),
                new Phone('2', 'Phone2', 'Producer2', 'OS1', 4, 128, 16, 700)
            ];

            when(phoneRepository.paginate(props, pageNumber, pageSize)).thenResolve(phones);

            const result = await phoneService.paginate(props, pageNumber, pageSize);

            expect(result).to.deep.equal(phones);
        });
    });

    describe('create', () => {
        it('should create a new phone', async () => {
            const phone: Phone = new Phone('1', 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500);

            when(phoneRepository.create(phone)).thenResolve(phone);

            const result = await phoneService.create(phone);

            expect(result).to.deep.equal(phone);
        });
    });

    describe('update', () => {
        it('should update an existing phone', async () => {
            const phone: Phone = new Phone('1', 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500);

            when(phoneRepository.update(phone)).thenResolve(phone);

            const result = await phoneService.update(phone);

            expect(result).to.deep.equal(phone);
        });

        it('should return null if phone is not found for update', async () => {
            const phone: Phone = new Phone('1', 'Phone1', 'Producer1', 'OS1', 4, 64, 12, 500);

            when(phoneRepository.update(phone)).thenResolve(null);

            const result = await phoneService.update(phone);

            expect(result).to.be.null;
        });
    });

});
