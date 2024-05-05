import { IPhoneRepository } from "./PhoneRepository";
import { Phone } from "./PhoneModel";
import { phoneCreateDTO, phoneFullDTO, phoneSearchDTO, phoneServiceError, returnPhoneDTO } from "./PhoneDTO";

export interface IPhoneService {
    findById(id: string): Promise<returnPhoneDTO | phoneServiceError>;
    paginate(props: Partial<phoneSearchDTO>, pageNumber: number, pageSize: number): Promise<returnPhoneDTO[] | phoneServiceError>;
    create(phone: phoneCreateDTO): Promise<returnPhoneDTO>;
    update(phone: phoneFullDTO): Promise<returnPhoneDTO | phoneServiceError>;
}

export class PhoneService implements IPhoneService {
    constructor(private phoneRepository: IPhoneRepository) {}

    async findById(id: string): Promise<returnPhoneDTO | phoneServiceError> {
        const phone = await this.phoneRepository.getById(id);
        if (phone == null){
            return Promise.resolve({errormsg: "not found by id"});
        }
        return Promise.resolve(phone.toDTO());
    }

    async paginate(props: Partial<phoneSearchDTO>, pageNumber: number, pageSize: number): Promise<returnPhoneDTO[] | phoneServiceError> {
        const phones =  await this.phoneRepository.paginate(props, pageNumber, pageSize);
        if (phones.length == 0){
            return Promise.resolve({errormsg: "not found by this props"});
        }
        const phonesToReturn: returnPhoneDTO[] = [];
        for (let i = 0; i < phones.length; i++){
            phonesToReturn.push(phones[i].toDTO());
        }
        return Promise.resolve(phonesToReturn);
    }

    async create(phone: phoneCreateDTO): Promise<returnPhoneDTO> {
        const phoneToCreate = new Phone(
            '',
            phone.name,
            phone.producername,
            phone.osname,
            phone.ramsize,
            phone.memsize,
            phone.camres,
            phone.price
        )
        const phoneCreated = await this.phoneRepository.create(phoneToCreate);
        return Promise.resolve(phoneCreated.toDTO());
    }

    async update(phone: phoneFullDTO): Promise<returnPhoneDTO | phoneServiceError> {
        const phoneToUpdate = new Phone(
            phone.id,
            phone.name,
            phone.producername,
            phone.osname,
            phone.ramsize,
            phone.memsize,
            phone.camres,
            phone.price
        )
        const phoneUpdated = await this.phoneRepository.update(phoneToUpdate);
        if (phoneUpdated == null){
            return Promise.resolve({errormsg: "not found in db"});
        }
        return Promise.resolve(phoneUpdated.toDTO());
    }
}
export { Phone };

