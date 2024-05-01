import { PostgresBasketRepository } from '../src/basket/BasketRepository';
import { BasketService } from '../src/basket/BasketService';
import { Basket, BasketPosition } from '../src/basket/BasketModel';

// Создаем экземпляр репозитория
const basketRepository = new PostgresBasketRepository();
const basketService = new BasketService(basketRepository);

describe('Basket Service Integration Tests', () => {
    let testBasketId: string;

    beforeAll(async () => {
        // Инициализация базы данных перед началом тестов
        await basketRepository.initialize();
    });

    test('create - создание корзины', async () => {
        const newBasket = await basketService.create('2');
        expect(newBasket).toBeDefined();
        expect(newBasket.userid).toBe('2');
        expect(newBasket.positions).toHaveLength(0);
        testBasketId = newBasket.id;
    });

    test('findByuserid - получение корзины по userId', async () => {
        const fetchedBasket = await basketService.findByuserid('2');
        expect(fetchedBasket).toBeDefined();
        expect(fetchedBasket?.id).toBe(testBasketId);
        expect(fetchedBasket?.userid).toBe('2');
        expect(fetchedBasket?.positions).toHaveLength(0);
    });

    test('clear - очистка корзины', async () => {
        const result = await basketService.clear(testBasketId);
        expect(result).toBeTruthy();

        const fetchedBasket = await basketService.findByuserid('2');
        expect(fetchedBasket).toBeNull();
    });

    test('addProductsToBasket - добавление товаров в корзину', async () => {
        // Создаем новую корзину без позиций
        const newBasket = await basketService.create('2');
        
        // Добавляем товары в корзину
        const updatedBasket = await basketService.addProductsToBasket({
            basketId: newBasket.id,
            positions: [
                new BasketPosition('', newBasket.id, '1', 2 ),
                new BasketPosition('', newBasket.id, '2', 2 ),
            ]
        });

        expect(updatedBasket).toBeDefined();
        expect(updatedBasket?.id).toBe(newBasket.id);
        expect(updatedBasket?.userid).toBe('2');
        expect(updatedBasket?.positions).toHaveLength(2);

        // Проверяем, что общая сумма расчитывается корректно
        const total = await basketService.calculateTotalPrice(newBasket.id);
        expect(total).toBeGreaterThan(0);
    });

    test('removeProductsFromBasket - удаление товаров из корзины', async () => {
        // Создаем новую корзину с позициями
        const newBasket = await basketService.create('2');
        await basketService.addProductsToBasket({
            basketId: newBasket.id,
            positions: [
                new BasketPosition('', newBasket.id, '1', 2 ),
                new BasketPosition('', newBasket.id, '2', 2 ),
            ]
        });

        // Удаляем товар из корзины
        const updatedBasket = await basketService.removeProductsFromBasket({
            basketId: newBasket.id,
            positions: [new BasketPosition('', newBasket.id, '1', 2 ),]
        });

        expect(updatedBasket).toBeDefined();
        expect(updatedBasket?.id).toBe(newBasket.id);
        expect(updatedBasket?.userid).toBe('2');
        expect(updatedBasket?.positions).toHaveLength(1);

        // Проверяем, что общая сумма расчитывается корректно
        const total = await basketService.calculateTotalPrice(newBasket.id);
        expect(total).toBeGreaterThan(0);
    });
});
