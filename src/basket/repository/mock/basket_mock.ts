import { IBasketRepository } from '../basket.js';
import { Basket, BasketPosition } from '../../model/basket.js';
import { instance, mock } from 'ts-mockito';

export class BasketRepositoryMock implements IBasketRepository {
    private mock: IBasketRepository = mock<IBasketRepository>();

    constructor() {}

    public getInstance(): IBasketRepository {
        return instance(this.mock);
    }

    public create(userId: string): Promise<Basket> {
        return this.mock.create(userId);
    }

    public getByUserId(userId: string): Promise<Basket | null> {
        return this.mock.getByUserId(userId);
    }

    public clearBasket(basketId: string): Promise<boolean> {
        return this.mock.clearBasket(basketId);
    }

    public calculateTotalPrice(basketId: string): Promise<number> {
        return this.mock.calculateTotalPrice(basketId);
    }

    public update(basketId: string, positionsToAdd: BasketPosition[], positionsToRemove: string[]): Promise<Basket> {
        return this.mock.update(basketId, positionsToAdd, positionsToRemove);
    }
}
