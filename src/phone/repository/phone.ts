import { Phone } from "../model/phone.js";

export interface IPhoneRepository {
    getById(id: string): Promise<Phone | null>;
    search(props: Partial<Phone>): Promise<Phone[]>;
    paginate(props: Partial<Phone>, pageNumber: number, pageSize: number): Promise<Phone[]>;
    create(phone: Phone): Promise<Phone>;
    update(phone: Phone): Promise<Phone | null>;
}
