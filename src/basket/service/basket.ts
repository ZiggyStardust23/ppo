import { IBasketRepository } from '../repository/basket.js';
import { Basket, BasketPosition } from '../model/basket.js';
import { v4 as uuidv4 } from 'uuid';

interface IBasketService {
    getBasketByUserId(userId: string): Promise<Basket | null>;
    createBasket(userId: string): Promise<Basket>;
    clearBasket(basketId: string): Promise<boolean>;
    calculateTotalPrice(basketId: string): Promise<number>;
    addProductToBasket(userId: string, phoneId: string, productsAmount: number, guid: string): Promise<BasketPosition>;
    removeProductFromBasket(basketId: string, positionGuid: string): Promise<boolean>;
}

export class BasketService implements IBasketService {
    constructor(private basketRepository: IBasketRepository) {}

    public async createBasket(userId: string): Promise<Basket> {
        return this.basketRepository.create(userId);
    }

    public async getBasketByUserId(userId: string): Promise<Basket | null> {
        return this.basketRepository.getByUserId(userId);
    }

    public async clearBasket(basketId: string): Promise<boolean> {
        return this.basketRepository.clearBasket(basketId);
    }

    public async calculateTotalPrice(basketId: string): Promise<number> {
        return this.basketRepository.calculateTotalPrice(basketId);
    }

    public async addProductToBasket(userId: string, phoneId: string, productsAmount: number, guid: string): Promise<BasketPosition> {
        const basket = await this.getBasketByUserId(userId);
        if (!basket) {
            throw new Error(`Basket not found for user ID ${userId}.`);
        }
    
        const position: BasketPosition = {
            guid: guid,
            basketId: basket.guid,
            phoneId: phoneId,
            productsAmount: productsAmount
        };
    
        const updatedBasket = await this.basketRepository.update(basket.guid, [position], []);
        return position;
    }

    public async removeProductFromBasket(basketId: string, positionGuid: string): Promise<boolean> {
        const updatedBasket = await this.basketRepository.update(basketId, [], [positionGuid]);
        return true;
    }
}
