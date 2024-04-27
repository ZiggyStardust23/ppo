import { Phone } from "./PhoneModel";
import { phoneFullDTO } from "./PhoneDTO";

export interface IPhoneRepository {
    getById(id: string): Promise<Phone | null>;
    paginate(props: Partial<phoneFullDTO>, pageNumber: number, pageSize: number): Promise<Phone[]>;
    create(phone: Phone): Promise<Phone>;
    update(phone: Phone): Promise<Phone | null>;
}
