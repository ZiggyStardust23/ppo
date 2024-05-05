import { IBasketRepository } from './BasketRepository';
import { Basket, BasketPosition } from './BasketModel';
import { basketServiceError, returnBasketDTO, updateBasketDTO } from './BasketDTO';

interface IBasketService {
    findByUserId(userId: string): Promise<returnBasketDTO | basketServiceError>;
    create(userId: string): Promise<returnBasketDTO>;
    clear(basketId: string): Promise<boolean>;
    calculateTotalPrice(basketId: string): Promise<number | basketServiceError>;
    addProductsToBasket(basket: updateBasketDTO): Promise<returnBasketDTO | basketServiceError>;
    removeProductsFromBasket(basket: updateBasketDTO): Promise<returnBasketDTO | basketServiceError>;
}

export class BasketService implements IBasketService {
    constructor(private basketRepository: IBasketRepository) {}

    public async create(userId: string): Promise<returnBasketDTO> {
        const basketCreated = await this.basketRepository.create(userId);
        return Promise.resolve(basketCreated.toDTO());
    }

    public async findByUserId(userId: string): Promise<returnBasketDTO | basketServiceError> {
        const basketGetted = await this.basketRepository.getByuserid(userId);
        if (basketGetted == null){
            return Promise.resolve({errormsg: "basket not found by id"});
        }
        return Promise.resolve(basketGetted.toDTO());
    }

    public async clear(basketId: string): Promise<boolean> {
        return this.basketRepository.clearBasket(basketId);
    }

    public async calculateTotalPrice(basketId: string): Promise<number | basketServiceError> {
        const checkBasket = await this.basketRepository.getById(basketId);
        if (checkBasket == null){
            return Promise.resolve({errormsg: "basket not found by id"});
        }
        return this.basketRepository.calculateTotalPrice(basketId);
    }

    public async addProductsToBasket(basket: updateBasketDTO): Promise<returnBasketDTO | basketServiceError> {
        const checkBasket = await this.basketRepository.getById(basket.id);
        if (checkBasket == null){
            return Promise.resolve({errormsg: "basket not found by id"});
        }
        //Чтобы одинаковые позиции не попадали в basket
        let filteredPositions = basket.positions.filter(function(pos) {
            for (let dbPos of checkBasket.positions){
                if (dbPos.phoneId === pos.productId && dbPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })
        for (let pos of filteredPositions){
            checkBasket.positions.push(new BasketPosition("", basket.id, pos.productId, pos.productsAmount));
        }
        
        const basketUpdated = await this.basketRepository.update(checkBasket);
        if (basketUpdated == null){
            return Promise.resolve({errormsg: "basket not updated, error occured"});
        }

        return Promise.resolve(basketUpdated.toDTO());
    }

    public async removeProductsFromBasket(basket: updateBasketDTO): Promise<returnBasketDTO | basketServiceError> {
        const checkBasket = await this.basketRepository.getById(basket.id);
        if (checkBasket == null){
            return Promise.resolve({errormsg: "basket not found by id"});
        }
        checkBasket.positions = checkBasket.positions.filter(function(pos) {
            for (let delPos of basket.positions){
                if (delPos.productId === pos.phoneId && delPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })

        const basketUpdated = await this.basketRepository.update(checkBasket);
        if (basketUpdated == null){
            return Promise.resolve({errormsg: "basket not updated, error occured"});
        }

        return Promise.resolve(basketUpdated.toDTO());
    }
}

export { BasketPosition, Basket };
