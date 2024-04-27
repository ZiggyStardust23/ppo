import { IPhoneRepository } from '../src/phone/PhoneRepository';
import { PhoneService } from '../src/phone/PhoneService';
import { Phone } from '../src/phone/PhoneModel';
import { mock, instance, when, anything } from 'ts-mockito';

describe('OrderService', () => {
    let phoneService: PhoneService;
    let phoneRepository: IPhoneRepository;

    beforeEach(() => {
        phoneRepository = mock<IPhoneRepository>();
        phoneService = new PhoneService(instance(phoneRepository));
    });

    it('should create a phone', async () => {
        const id_ = "";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;
        const createdPhone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            price_
        )

        when(phoneRepository.create(anything())).thenResolve(createdPhone);
    

        // Act
        const result = await phoneService.create({            
            name: name_,
            producerName: producerName_,
            osName: osName_,
            ramSize: ramSize_,
            memSize: memSize_,
            camRes: camRes_,
            price: price_});

        // Assert
        expect(result).toEqual(createdPhone);
    });

    it('findById: success', async () => {
        const id_ = "test";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;
        const phoneToFind = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            price_
        )

        when(phoneRepository.getById("test")).thenResolve(phoneToFind);
    

        // Act
        const result = await phoneService.findById("test");

        // Assert
        expect(result).toEqual(phoneToFind);
    });

    it('findById: fail', async () => {

        when(phoneRepository.getById("test")).thenResolve(null);
    

        // Act
        const result = await phoneService.findById("test");

        // Assert
        expect(result).toEqual(null);
    });

    it('paginate: find first by os name', async () => {
        const id_ = "test";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;
        const phone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            price_
        )
        const phones = [
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(), 
        ]
        phones[0].id = 'test1';
        phones[1].id = 'test2';
        phones[2].id = 'test3'; phones[2].osName = 'specialOs';
        phones[3].id = 'test4';
        phones[4].id = 'test5';

        when(phoneRepository.paginate(anything(), 1, 1)).thenResolve([
            phones[2]
        ]);
    

        // Act
        const result = await phoneService.paginate({osName: "specialOs"}, 1, 1);

        // Assert
        expect(result[0]).toEqual(phones[2]);
    });
    it('paginate: find all by osName, on one page', async () => {
        const id_ = "test";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;
        const phone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            price_
        )
        const phones = [
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(), 
        ]
        phones[0].id = 'test1';
        phones[1].id = 'test2';
        phones[2].id = 'test3'; phones[2].osName = 'specialOs';
        phones[3].id = 'test4';
        phones[4].id = 'test5'; phones[4].osName = 'specialOs';

        when(phoneRepository.paginate(anything(), 1, 2)).thenResolve([
            phones[2], phones[4]
        ]);
    

        // Act
        const result = await phoneService.paginate({osName: "specialOs"}, 1, 2);

        // Assert
        expect(result).toEqual([phones[2], phones[4]]);
    });
    it('paginate: not found', async () => {
        const id_ = "test";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;
        const phone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            price_
        )
        const phones = [
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(),
            phone.clone(), 
        ]
        phones[0].id = 'test1';
        phones[1].id = 'test2';
        phones[2].id = 'test3'; phones[2].osName = 'notSpecialOs';
        phones[3].id = 'test4';
        phones[4].id = 'test5'; phones[4].osName = 'notSpecialOs';

        when(phoneRepository.paginate(anything(), 1, 2)).thenResolve([]);
    

        // Act
        const result = await phoneService.paginate({osName: "specialOs"}, 1, 2);

        // Assert
        expect(result).toEqual([]);
    });

    it('should succesfully update the price of phone', async () => {
        const id_ = "1";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const givenPhone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            20000
        )
        const updatedPhone = new Phone(
            id_,
            name_,
            producerName_,
            osName_,
            ramSize_,
            memSize_,
            camRes_,
            25000
        )

        when(phoneRepository.getById("1")).thenResolve(givenPhone);
        when(phoneRepository.update(anything())).thenResolve(updatedPhone);
    

        // Act
        const result = await phoneService.update({     
            id: id_,       
            name: name_,
            producerName: producerName_,
            osName: osName_,
            ramSize: ramSize_,
            memSize: memSize_,
            camRes: camRes_,
            price: 25000});

        // Assert
        expect(result).toEqual(updatedPhone);
    });

    it('update fail: phone not found', async () => {
        const id_ = "1";
        const name_ = "testname";
        const producerName_ = "producer1";
        const osName_ = "os1";
        const ramSize_ = 16;
        const memSize_ = 128;
        const camRes_ = 20;
        const price_ = 20000;

        when(phoneRepository.getById("2")).thenResolve(null);
        when(phoneRepository.update(anything())).thenResolve(null);
    

        // Act
        const result = await phoneService.update({     
            id: "2",       
            name: name_,
            producerName: producerName_,
            osName: osName_,
            ramSize: ramSize_,
            memSize: memSize_,
            camRes: camRes_,
            price: 25000});

        // Assert
        expect(result).toEqual(null);
    });
});
