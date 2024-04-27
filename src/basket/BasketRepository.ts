import { Basket, BasketPosition } from './BasketModel';

interface IBasketRepository {
    create(userId: string): Promise<Basket>;
    getByUserId(userId: string): Promise<Basket | null>;
    getById(baskerId: string): Promise<Basket | null>
    clearBasket(basketId: string): Promise<boolean>;
    calculateTotalPrice(basketId: string): Promise<number>;
    update(basket: Basket): Promise<Basket>;
}

export { IBasketRepository };
