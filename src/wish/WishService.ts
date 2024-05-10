import { Wish } from "./WishModel";
import { IWishRepository } from "./WishRepository";
import { createDTO, returnDTO } from "./WishDTO";
import * as bcrypt from 'bcrypt';

interface IWishService {
    create(wish: createDTO, role: string): Promise<returnDTO | Error>
	findByUserId(userId: string, role: string): Promise<returnDTO[] | Error>
	delete(id: string, role: string): Promise<boolean>
}

export class WishService implements IWishService {
    constructor(private wishRepository: IWishRepository) {}

    async create(wish: createDTO, role: string): Promise<returnDTO | Error> {
        const w = new Wish("", wish.userId, wish.productId);
        const wishCreated = await this.wishRepository.create(w, role);
        if (wishCreated == null){
            return Promise.reject(new Error("This wish is already exists"));
        }
        return Promise.resolve (wishCreated.toDTO())
    }

    async findByUserId(userId: string, role: string): Promise<returnDTO[] | Error> {
        const wishGetted = await this.wishRepository.getByUserId(userId, role);
        if (wishGetted.length == 0){
            return Promise.reject(new Error("Wishes not found"));
        }
        const wishesToReturn: returnDTO[] = [];
        for (let i = 0; i < wishGetted.length; i++){
            wishesToReturn.push(wishGetted[i].toDTO());
        }
        return Promise.resolve (wishesToReturn)
    }

    async delete(id: string, role: string): Promise<boolean>{
        return this.wishRepository.delete(id, role);
    }
}

