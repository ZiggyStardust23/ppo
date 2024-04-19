import { expect } from 'chai';
import { BasketService } from './service/basket.js';
import { BasketRepositoryMock } from './repository/mock/basket_mock.js';
import { IBasketRepository } from './repository/basket.js';
import { Basket, BasketPosition } from './model/basket.js';
import { mock, instance, when } from 'ts-mockito';
import { v4 as uuidv4 } from 'uuid';

describe('BasketService', () => {
    let basketService: BasketService;
    let basketRepositoryMock: IBasketRepository;

    beforeEach(() => {
        basketRepositoryMock = mock(BasketRepositoryMock);
        basketService = new BasketService(instance(basketRepositoryMock));
    });

    describe('createBasket', () => {
        it('should create a new basket for the given user ID', async () => {
            const userId = 'user123';
            const expectedBasket: Basket = { guid: 'basket123', userId: userId, positions: [] };
            when(basketRepositoryMock.create(userId)).thenReturn(Promise.resolve(expectedBasket));
            const result = await basketService.createBasket(userId);
            expect(result).to.deep.equal(expectedBasket);
        });
    });

    describe('getBasketByUserId', () => {
        it('should return the basket for the given user ID', async () => {
            const userId = 'user123';
            const expectedBasket: Basket = { guid: 'basket123', userId: userId, positions: [] };
            when(basketRepositoryMock.getByUserId(userId)).thenReturn(Promise.resolve(expectedBasket));
            const result = await basketService.getBasketByUserId(userId);
            expect(result).to.deep.equal(expectedBasket);
        });

        it('should return null if no basket found for the given user ID', async () => {
            const userId = 'user123';
            when(basketRepositoryMock.getByUserId(userId)).thenReturn(Promise.resolve(null));
            const result = await basketService.getBasketByUserId(userId);
            expect(result).to.be.null;
        });
    });

    describe('clearBasket', () => {
        it('should clear the basket for the given basket ID', async () => {
            const basketId = 'basket123';
            when(basketRepositoryMock.clearBasket(basketId)).thenReturn(Promise.resolve(true));
            const result = await basketService.clearBasket(basketId);
            expect(result).to.be.true;
        });

        it('should return false if clearing basket fails', async () => {
            const basketId = 'basket123';
            when(basketRepositoryMock.clearBasket(basketId)).thenReturn(Promise.resolve(false));
            const result = await basketService.clearBasket(basketId);
            expect(result).to.be.false;
        });
    });

    describe('calculateTotalPrice', () => {
        it('should calculate the total price of items in the basket', async () => {
            const basketId = 'basket123';
            const expectedTotalPrice = 500;
            when(basketRepositoryMock.calculateTotalPrice(basketId)).thenReturn(Promise.resolve(expectedTotalPrice));
            const result = await basketService.calculateTotalPrice(basketId);
            expect(result).to.equal(expectedTotalPrice);
        });
    });

    describe('addProductToBasket', () => {
        it('should add a product to the basket and return the added position', async () => {
            const userId = 'user123';
            const phoneId = 'phone456';
            const productsAmount = 2;
            const staticGuid = '123';
            const expectedPosition: BasketPosition = { guid: staticGuid, basketId: 'basket123', phoneId: phoneId, productsAmount: productsAmount };
            const expectedBasket: Basket = { guid: 'basket123', userId: userId, positions: [expectedPosition] };
            when(basketRepositoryMock.getByUserId(userId)).thenReturn(Promise.resolve(expectedBasket));
            when(basketRepositoryMock.update('basket123', [expectedPosition], [])).thenReturn(Promise.resolve(expectedBasket));
            const result = await basketService.addProductToBasket(userId, phoneId, productsAmount, staticGuid);
            expect(result).to.deep.equal(expectedPosition);
        });
    });
    

    describe('removeProductFromBasket', () => {
        it('should remove a product from the basket', async () => {
            const basketId = 'basket123';
            const positionGuid = 'position456';
            when(basketRepositoryMock.update(basketId, [], [positionGuid])).thenReturn(Promise.resolve({ guid: basketId, userId: '', positions: [] }));
            const result = await basketService.removeProductFromBasket(basketId, positionGuid);
            expect(result).to.be.true;
        });
    });

});