import { log } from "console";
import { User } from "./UserModel";
import { IUserRepository } from "./UserRepository";
import { createDTO, loginDTO, registrationDTO } from "./UserDTO";
import * as bcrypt from 'bcrypt';
import { userRole } from "./userTypes";

interface IUserService {
    registration(regDTO: registrationDTO): Promise<User | null>
    login(logDTO: loginDTO): Promise<User | null>
    createUser(cDTO: createDTO): Promise<User | null>
    findUserById(id: string): Promise<User | null> 
    findUserByEmail(email: string): Promise<User | null>
    updateUser(user: User): Promise<User | null>
}

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async registration(regDTO: registrationDTO): Promise<User | null> {
        const checkEmail = await this.userRepository.getByEmail(regDTO.email);
        if (checkEmail != null){
            return Promise.resolve(null);
        }
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(regDTO.password, salt);
        const userToCreate = new User('', regDTO.name, regDTO.email, hashedPassword, regDTO.phone_number, userRole.UserRoleCustomer);
        return this.userRepository.create(userToCreate);
    }

    async login(logDTO: loginDTO): Promise<User | null> {
        const checkEmail = await this.userRepository.getByEmail(logDTO.email);
        if (checkEmail == null){
            return Promise.resolve(null);
        }

        try {
            const result = await bcrypt.compare(logDTO.password, checkEmail.password);
            if (!result){
                return Promise.resolve(null);
            }
            return Promise.resolve(checkEmail);
        } catch (error) {
            console.error('Ошибка сравнения паролей:', error);
            return Promise.resolve(null);
        }
    }

    async createUser(cDTO: createDTO): Promise<User | null>{
        const checkEmail = await this.userRepository.getByEmail(cDTO.email);
        if (checkEmail != null){
            return Promise.resolve(null);
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(cDTO.password, salt);
        const userToCreate = new User('', cDTO.name, cDTO.email, hashedPassword, cDTO.phone_number, cDTO.role);
        return this.userRepository.create(userToCreate);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.getById(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.getByEmail(email);
    }

    async updateUser(user: User): Promise<User | null> {
        return this.userRepository.update(user);
    }
}