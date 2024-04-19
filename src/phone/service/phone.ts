import { IPhoneRepository } from "../repository/phone.js";
import { Phone } from "../model/phone.js";

export interface IPhoneService {
    getById(id: string): Promise<Phone | null>;
    search(props: Partial<Phone>): Promise<Phone[]>;
    paginate(props: Partial<Phone>, pageNumber: number, pageSize: number): Promise<Phone[]>;
}

export class PhoneService implements IPhoneService {
    constructor(private phoneRepository: IPhoneRepository) {}

    getById(id: string): Promise<Phone | null> {
        return this.phoneRepository.getById(id);
    }

    search(props: Partial<Phone>): Promise<Phone[]> {
        return this.phoneRepository.search(props);
    }

    paginate(props: Partial<Phone>, pageNumber: number, pageSize: number): Promise<Phone[]> {
        return this.phoneRepository.paginate(props, pageNumber, pageSize);
    }

    create(phone: Phone): Promise<Phone> {
        return this.phoneRepository.create(phone);
    }

    update(phone: Phone): Promise<Phone | null> {
        return this.phoneRepository.update(phone);
    }
}
