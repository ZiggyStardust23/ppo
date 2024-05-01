import { IPhoneRepository } from "./PhoneRepository";
import { Phone } from "./PhoneModel";
import { phoneCreateDTO, phoneFullDTO, phoneSearchDTO } from "./PhoneDTO";

export interface IPhoneService {
    findById(id: string): Promise<Phone | null>;
    paginate(props: Partial<phoneSearchDTO>, pageNumber: number, pageSize: number): Promise<Phone[]>;
    create(phone: phoneCreateDTO): Promise<Phone>;
    update(phone: phoneFullDTO): Promise<Phone | null>;
}

export class PhoneService implements IPhoneService {
    constructor(private phoneRepository: IPhoneRepository) {}

    async findById(id: string): Promise<Phone | null> {
        return this.phoneRepository.getById(id);
    }

    async paginate(props: Partial<phoneSearchDTO>, pageNumber: number, pageSize: number): Promise<Phone[]> {
        return this.phoneRepository.paginate(props, pageNumber, pageSize);
    }

    async create(phone: phoneCreateDTO): Promise<Phone> {
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
        return this.phoneRepository.create(phoneToCreate);
    }

    async update(phone: phoneFullDTO): Promise<Phone | null> {
        const checkId = await this.phoneRepository.getById(phone.id);
        if (checkId == null)
            return Promise.resolve(null);
        const phoneUpdated = new Phone(
            phone.id,
            phone.name,
            phone.producername,
            phone.osname,
            phone.ramsize,
            phone.memsize,
            phone.camres,
            phone.price
        )
        return this.phoneRepository.update(phoneUpdated);
    }
}
export { Phone };

