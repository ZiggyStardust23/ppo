import { PostgresPhoneRepository } from '../src/phone/PhoneRepository';
import { PhoneService, Phone } from '../src/phone/PhoneService';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем экземпляр репозитория
const phoneRepository = new PostgresPhoneRepository();
const phoneService = new PhoneService(phoneRepository);

describe('Phone Repository Tests', () => {
    let testPhoneId: string;

    test('createPhone - создание телефона', async () => {
        await phoneRepository.initialize();
        const newPhone = new Phone(
            '',
            "phone",
            "phoneProducer",
            "os",
            16,
            128,
            20,
            20000
        )
        const createdPhone = await phoneService.create({
            name: "phone",
            producername: "phoneProducer",
            osname: "os",
            ramsize: 16,
            memsize: 128,
            camres: 20,
            price: 20000
        });
        expect(createdPhone).toBeDefined();
        expect(createdPhone.id).toBeDefined();
        expect(createdPhone.name).toBe(newPhone.name);
        expect(createdPhone.producername).toBe(newPhone.producername);
        expect(createdPhone.ramsize).toBe(newPhone.ramsize);
        expect(createdPhone.memsize).toBe(newPhone.memsize);
        expect(createdPhone.camres).toBe(newPhone.camres);
        expect(createdPhone.price).toBe(newPhone.price);
        testPhoneId = createdPhone!.id;
    });

    test('findPhoneById - получение телефона по ID', async () => {
        const fetchedPhone = await phoneService.findById(testPhoneId);
        expect(fetchedPhone).toBeDefined();
        expect(fetchedPhone?.id).toBe(testPhoneId);
    });

    test('updatePhone - обновление данных телефона', async () => {
        const updatedPhone = await phoneService.update({
            id: testPhoneId,
            name: "phone",
            producername: "phoneProducer",
            osname: "os",
            ramsize: 16,
            memsize: 128,
            camres: 20,
            price: 30000
    })
        expect(updatedPhone).toBeDefined();
        expect(updatedPhone?.id).toBe(testPhoneId);
        expect(updatedPhone?.name).toBe("phone");
        expect(updatedPhone?.producername).toBe("phoneProducer");
        expect(updatedPhone?.osname).toBe("os");
        expect(updatedPhone?.ramsize).toBe(16);
        expect(updatedPhone?.memsize).toBe(128);
        expect(updatedPhone?.camres).toBe(20);
        expect(updatedPhone?.price).toBe(30000);
    });

    
    test('paginate - пагинация', async () => {
        let phoneModels: Phone[] = [];
        for (let i = 1; i < 10; i++){
            phoneModels.push(await phoneService.create({
                name: "phone" + i.toString(),
                producername: "phoneProducer" + i.toString(),
                osname: "os" + i.toString(),
                ramsize: 16,
                memsize: 128,
                camres: 20,
                price: 10000 * i
            }))
        }

        let phones = await phoneService.paginate({minPrice: 30000, maxPrice: 60000}, 0, 0);
    });
});
