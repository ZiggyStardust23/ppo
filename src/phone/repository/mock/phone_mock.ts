import { IPhoneRepository } from '../phone.js';
import { Phone } from '../../model/phone.js';
import { instance, mock } from 'ts-mockito';

export class PhoneRepositoryMock implements IPhoneRepository {
    private mock: IPhoneRepository = mock<IPhoneRepository>();

    constructor() {}

    public getInstance(): IPhoneRepository {
        return instance(this.mock);
    }

    public getById(id: string): Promise<Phone | null> {
        return this.mock.getById(id);
    }

    public search(props: Partial<Phone>): Promise<Phone[]> {
        return this.mock.search(props);
    }

    public paginate(props: Partial<Phone>, pageNumber: number, pageSize: number): Promise<Phone[]> {
        return this.mock.paginate(props, pageNumber, pageSize);
    }
    
    public create(phone: Phone): Promise<Phone> {
        return this.mock.create(phone);
    }

    public update(phone: Phone): Promise<Phone | null> {
        return this.mock.update(phone);
    }
}
