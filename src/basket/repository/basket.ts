import { Basket, BasketPosition } from '../model/basket.js';

interface IBasketRepository {
    create(userId: string): Promise<Basket>;
    getByUserId(userId: string): Promise<Basket | null>;
    clearBasket(basketId: string): Promise<boolean>;
    calculateTotalPrice(basketId: string): Promise<number>;
    update(basketId: string, positionsToAdd: BasketPosition[], positionsToRemove: string[]): Promise<Basket>;
}

export { IBasketRepository };
