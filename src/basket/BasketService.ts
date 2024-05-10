import { IBasketRepository } from './BasketRepository';
import { Basket, BasketPosition } from './BasketModel';
import { returnBasketDTO, updateBasketDTO } from './BasketDTO';

interface IBasketService {
    findByUserId(userId: string, role: string): Promise<returnBasketDTO | Error>;
    create(userId: string, role: string): Promise<returnBasketDTO>;
    clear(basketId: string, role: string): Promise<boolean>;
    calculateTotalPrice(basketId: string, role: string): Promise<number | Error>;
    addProductsToBasket(basket: updateBasketDTO, role: string): Promise<returnBasketDTO | Error>;
    removeProductsFromBasket(basket: updateBasketDTO, role: string): Promise<returnBasketDTO | Error>;
}

export class BasketService implements IBasketService {
    constructor(private basketRepository: IBasketRepository) {}

    public async create(userId: string, role: string): Promise<returnBasketDTO> {
        const basketCreated = await this.basketRepository.create(userId, role);
        return Promise.resolve(basketCreated.toDTO());
    }

    public async findByUserId(userId: string, role: string): Promise<returnBasketDTO | Error> {
        const basketGetted = await this.basketRepository.getByuserid(userId, role);
        if (basketGetted == null){
            return Promise.reject(new Error("basket not found by id"));
        }
        return Promise.resolve(basketGetted.toDTO());
    }

    public async clear(basketId: string, role: string): Promise<boolean> {
        return this.basketRepository.clearBasket(basketId, role);
    }

    public async calculateTotalPrice(basketId: string, role: string): Promise<number | Error> {
        const checkBasket = await this.basketRepository.getById(basketId, role);
        if (checkBasket == null){
            return Promise.reject(new Error("basket not found by id"));
        }
        return this.basketRepository.calculateTotalPrice(basketId, role);
    }

    public async addProductsToBasket(basket: updateBasketDTO, role: string): Promise<returnBasketDTO | Error> {
        const checkBasket = await this.basketRepository.getById(basket.id, role);
        if (checkBasket == null){
            return Promise.reject(new Error("basket not found by id"));
        }
        //Чтобы одинаковые позиции не попадали в basket
        let filteredPositions = basket.positions.filter(function(pos) {
            for (let dbPos of checkBasket.positions){
                if (dbPos.phoneId == pos.productId && dbPos.productsAmount == pos.productsAmount){
                    return false;
                }
            }
            return true;
        })
        for (let pos of filteredPositions){
            checkBasket.positions.push(new BasketPosition("", basket.id, pos.productId, pos.productsAmount));
        }
        
        const basketUpdated = await this.basketRepository.update(checkBasket, role);
        if (basketUpdated == null){
            return Promise.reject(new Error("basket not updated, error occured"));
        }

        return Promise.resolve(basketUpdated.toDTO());
    }

    public async removeProductsFromBasket(basket: updateBasketDTO, role: string): Promise<returnBasketDTO | Error> {
        const checkBasket = await this.basketRepository.getById(basket.id, role);
        if (checkBasket == null){
            return Promise.reject(new Error("basket not found by id"));
        }
        checkBasket.positions = checkBasket.positions.filter(function(pos) {
            for (let delPos of basket.positions){
                if (delPos.productId == pos.phoneId && delPos.productsAmount == pos.productsAmount){
                    return false;
                }
            }
            return true;
        })

        const basketUpdated = await this.basketRepository.update(checkBasket, role);
        if (basketUpdated == null){
            return Promise.reject(new Error("basket not updated, error occured"));
        }

        return Promise.resolve(basketUpdated.toDTO());
    }
}

export { BasketPosition, Basket };
