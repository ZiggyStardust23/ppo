import { User } from "./UserModel";
import { IUserRepository } from "./UserRepository";
import { createDTO, loginDTO, registrationDTO, returnUserDTO, updateDTO, userRole } from "./UserDTO";
import * as bcrypt from 'bcrypt';

interface IUserService {
    registration(regDTO: registrationDTO): Promise<returnUserDTO | Error>
    login(logDTO: loginDTO): Promise<returnUserDTO | Error>
    createUser(cDTO: createDTO): Promise<returnUserDTO | Error>
    findUserById(id: string): Promise<returnUserDTO | Error> 
    findUserByEmail(email: string): Promise<returnUserDTO | Error>
    updateUser(upDTO: updateDTO): Promise<returnUserDTO | Error>
}

export async function hashPswd(pswdToHash: string): Promise<string>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pswdToHash, salt);
    return Promise.resolve(hashedPassword)
}

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async registration(regDTO: registrationDTO): Promise<returnUserDTO | Error> {
        const hashedPassword = await hashPswd(regDTO.password);
        const userToCreate = new User('', regDTO.name, regDTO.email, hashedPassword, regDTO.phone_number, userRole.UserRoleCustomer);
        const userCreated = await this.userRepository.create(userToCreate);
        if (userCreated == null){
            return Promise.reject(new Error("This email is already in db"));
        }
        return Promise.resolve (userCreated.toDTO())
    }

    async login(logDTO: loginDTO): Promise<returnUserDTO | Error> {
        const checkEmail = await this.userRepository.getByEmail(logDTO.email);
        if (checkEmail == null){
            return Promise.reject(new Error("wrong email"));
        }

        try {
            const result = await bcrypt.compare(logDTO.password, checkEmail.password);
            if (!result){
                return Promise.reject(new Error("wrong password"));
            }
            return Promise.resolve (checkEmail.toDTO())
        } catch (error) {
            return Promise.reject(new Error("pswd compare error"));
        }
    }

    async createUser(cDTO: createDTO): Promise<returnUserDTO | Error>{
        const checkEmail = await this.userRepository.getByEmail(cDTO.email);
        if (checkEmail != null){
            return Promise.reject(new Error("this email is already in db"));
        }
        const hashedPassword = await hashPswd(cDTO.password)
        const userToCreate = new User('', cDTO.name, cDTO.email, hashedPassword, cDTO.phone_number, cDTO.role);
        const userCreated = await this.userRepository.create(userToCreate);
        return Promise.resolve (userCreated.toDTO())
    }

    async findUserById(id: string): Promise<returnUserDTO | Error> {
        const userGetted = await this.userRepository.getById(id);
        if (userGetted == null){
            return Promise.reject(new Error ("user not found by this id"));
        }
        return Promise.resolve (userGetted.toDTO())
    }

    async findUserByEmail(email: string): Promise<returnUserDTO | Error> {
        const userGetted = await this.userRepository.getByEmail(email);
        if (userGetted == null){
            return Promise.reject(new Error("user not found by this email"));
        }
        return Promise.resolve (userGetted.toDTO())
    }

    async updateUser(upDTO: updateDTO): Promise<returnUserDTO | Error> {
        const hashedPswd = await hashPswd(upDTO.password);
        const userToUpdate = new User(upDTO.id, upDTO.name, upDTO.email, hashedPswd, upDTO.phone_number, userRole.UserRoleCustomer);
        const userUpdated = await this.userRepository.update(userToUpdate);
        if (userUpdated == null){
            return Promise.reject(new Error("user to update not found by id"))
        }
        return Promise.resolve (userUpdated.toDTO())
    }
}