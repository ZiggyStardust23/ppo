import { IBasketRepository } from './BasketRepository';
import { Basket, BasketPosition } from './BasketModel';
import { updateBasketDTO } from './BasketDTO';

interface IBasketService {
    findByuserid(userid: string): Promise<Basket | null>;
    create(userid: string): Promise<Basket>;
    clear(basketId: string): Promise<boolean>;
    calculateTotalPrice(basketId: string): Promise<number | null>;
    addProductsToBasket(basket: updateBasketDTO): Promise<Basket | null>;
    removeProductsFromBasket(basket: updateBasketDTO): Promise<Basket | null>;
}

export class BasketService implements IBasketService {
    constructor(private basketRepository: IBasketRepository) {}

    public async create(userid: string): Promise<Basket> {
        return this.basketRepository.create(userid);
    }

    public async findByuserid(userid: string): Promise<Basket | null> {
        return this.basketRepository.getByuserid(userid);
    }

    public async clear(basketId: string): Promise<boolean> {
        return this.basketRepository.clearBasket(basketId);
    }

    public async calculateTotalPrice(basketId: string): Promise<number | null> {
        const checkBasket = await this.basketRepository.getById(basketId);
        if (checkBasket == null){
            return Promise.resolve(null);
        }
        return this.basketRepository.calculateTotalPrice(basketId);
    }

    public async addProductsToBasket(basket: updateBasketDTO): Promise<Basket | null> {
        const checkBasket = await this.basketRepository.getById(basket.basketId);
        if (checkBasket == null){
            return null;
        }
        //Чтобы одинаковые позиции не попадали в basket
        let filteredPositions = basket.positions.filter(function(pos) {
            for (let dbPos of checkBasket.positions){
                if (dbPos.phoneId === pos.phoneId && dbPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })
        for (let pos of filteredPositions){
            checkBasket.positions.push(pos);
        }
        
        return await this.basketRepository.update(checkBasket);
    }

    public async removeProductsFromBasket(basket: updateBasketDTO): Promise<Basket | null> {
        const checkBasket = await this.basketRepository.getById(basket.basketId);
        if (checkBasket == null){
            return Promise.resolve(null);
        }
        checkBasket.positions = checkBasket.positions.filter(function(pos) {
            for (let delPos of basket.positions){
                if (delPos.phoneId === pos.phoneId && delPos.productsAmount === pos.productsAmount){
                    return false;
                }
            }
            return true;
        })

        return await this.basketRepository.update(checkBasket);
    }
}

export { BasketPosition, Basket };
