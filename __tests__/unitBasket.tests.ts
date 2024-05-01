import { IBasketRepository } from '../src/basket/BasketRepository'
import { BasketService } from '../src/basket/BasketService'
import { Basket, BasketPosition} from '../src/basket/BasketModel';
import { mock, instance, when, anything } from 'ts-mockito';
import { Phone } from "../src/phone/PhoneModel"

describe('BasketService', () => {
    let basketService: BasketService;
    let basketRepository: IBasketRepository;

    beforeEach(() => {
        basketRepository = mock<IBasketRepository>();
        basketService = new BasketService(instance(basketRepository));
    });

    it('should create a basket', async () => {
        const userid = "test";
        const positions:BasketPosition[] = [];

        const basketCreated = new Basket(
            "test", 
            userid, 
            positions
        )
        when(basketRepository.create(userid)).thenResolve(basketCreated);
    
        const result = await basketService.create(userid);
        expect(result).toEqual(basketCreated);
    });

    it('findByuserid: success', async () => {
        const userid = "test";
        const positions = [new BasketPosition("test1", "test", "p1", 3), new BasketPosition("test2", "test", "p2", 3)];

        const basketToFind = new Basket(
            "test", 
            userid, 
            positions
        )

        when(basketRepository.getByuserid("test")).thenResolve(basketToFind);
    

        // Act
        const result = await basketService.findByuserid("test");

        // Assert
        expect(result).toEqual(basketToFind);
    });

    it('findByuserid: fail', async () => {

        when(basketRepository.getByuserid("badid")).thenResolve(null);
    

        // Act
        const result = await basketService.findByuserid("badid");

        // Assert
        expect(result).toEqual(null);
    });

    it('clear: success', async () => {
        const basketId = "test";
        when(basketRepository.clearBasket(basketId)).thenResolve(true);
    

        // Act
        const result = await basketService.clear(basketId);

        // Assert
        expect(result).toEqual(true);
    });
    it('clear: fail, basket not found', async () => {
        const basketId = "badid";
        when(basketRepository.clearBasket(basketId)).thenResolve(false);
    

        // Act
        const result = await basketService.clear(basketId);

        // Assert
        expect(result).toEqual(false);
    });
    it('calculateTotalPrice', async () => {
        const basketId = "test";
        const userid = "test";
        const positions = [new BasketPosition("test1", "test", "p1", 3), new BasketPosition("test2", "test", "p2", 3)];

        const basket = new Basket(
            "test", 
            userid, 
            positions
        )

        const phone1 = new Phone("p1", "test", "test", "test", 10, 10, 10, 100);
        const phone2 = new Phone("p1", "test", "test", "test", 10, 10, 10, 200);

        when(basketRepository.getById(basketId)).thenResolve(basket);
        when(basketRepository.calculateTotalPrice(basketId)).thenResolve(
            phone1.price * positions[0].productsAmount +
            phone2.price * positions[1].productsAmount
        );
    

        // Act
        const result = await basketService.calculateTotalPrice(basketId);

        // Assert
        expect(result).toEqual(
            phone1.price * positions[0].productsAmount +
            phone2.price * positions[1].productsAmount
        );
    });

    it('should succesfully add positions to basket', async () => {
        const userid = "test";
        const positions = [new BasketPosition("test1", "", "p1", 3), new BasketPosition("test2", "", "p2", 3)];
        const positionsToAdd = [new BasketPosition("test2", "", "p2", 3), new BasketPosition("test3", "", "p3", 3)];
        const positionsUpdated = [new BasketPosition("test1", "", "p1", 3), new BasketPosition("test2", "", "p2", 3), new BasketPosition("test3", "", "p3", 3)];

        const basketToFind = new Basket(
            "test", 
            userid, 
            positions
        )

        const basketUpdated = new Basket(
            "test", 
            userid, 
            positionsUpdated
        )

        when(basketRepository.getById("test")).thenResolve(basketToFind);
        when(basketRepository.update(anything())).thenResolve(basketUpdated);
    

        // Act
        const result = await basketService.addProductsToBasket({     
            basketId: "test",       
            positions: positionsToAdd,
        })

        // Assert
        expect(result).toEqual(basketUpdated);
    });
    it('should succesfully remove positions from basket', async () => {
        const userid = "test";
        const positions = [new BasketPosition("test1", "", "p1", 3), new BasketPosition("test2", "", "p2", 3)];
        const positionsToRemove = [new BasketPosition("test2", "", "p2", 3)];
        const positionsUpdated = [new BasketPosition("test1", "", "p1", 3)];

        const basketToFind = new Basket(
            "test", 
            userid, 
            positions
        )

        const basketUpdated = new Basket(
            "test", 
            userid, 
            positionsUpdated
        )

        when(basketRepository.getById("test")).thenResolve(basketToFind);
        when(basketRepository.update(anything())).thenResolve(basketUpdated);
    

        // Act
        const result = await basketService.removeProductsFromBasket({     
            basketId: "test",       
            positions: positionsToRemove,
        })

        // Assert
        expect(result).toEqual(basketUpdated);
    });
});
