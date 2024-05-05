import { User } from "./UserModel";
import { IUserRepository } from "./UserRepository";
import { createDTO, loginDTO, registrationDTO, returnUserDTO, updateDTO, userRole, userServiceError } from "./UserDTO";
import * as bcrypt from 'bcrypt';

interface IUserService {
    registration(regDTO: registrationDTO): Promise<returnUserDTO | userServiceError>
    login(logDTO: loginDTO): Promise<returnUserDTO | userServiceError>
    createUser(cDTO: createDTO): Promise<returnUserDTO | userServiceError>
    findUserById(id: string): Promise<returnUserDTO | userServiceError> 
    findUserByEmail(email: string): Promise<returnUserDTO | userServiceError>
    updateUser(upDTO: updateDTO): Promise<returnUserDTO | userServiceError>
}

export async function hashPswd(pswdToHash: string): Promise<string>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pswdToHash, salt);
    return Promise.resolve(hashedPassword)
}

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async registration(regDTO: registrationDTO): Promise<returnUserDTO | userServiceError> {
        const hashedPassword = await hashPswd(regDTO.password);
        const userToCreate = new User('', regDTO.name, regDTO.email, hashedPassword, regDTO.phone_number, userRole.UserRoleCustomer);
        const userCreated = await this.userRepository.create(userToCreate);
        if (userCreated == null){
            return Promise.resolve({errormsg: "This email is already in db"});
        }
        return Promise.resolve (userCreated.toDTO())
    }

    async login(logDTO: loginDTO): Promise<returnUserDTO | userServiceError> {
        const checkEmail = await this.userRepository.getByEmail(logDTO.email);
        if (checkEmail == null){
            return Promise.resolve({errormsg: "wrong email"});
        }

        try {
            const result = await bcrypt.compare(logDTO.password, checkEmail.password);
            if (!result){
                return Promise.resolve({errormsg: "wrong password"});
            }
            return Promise.resolve (checkEmail.toDTO())
        } catch (error) {
            return Promise.resolve({errormsg: "pswd compare error"});
        }
    }

    async createUser(cDTO: createDTO): Promise<returnUserDTO | userServiceError>{
        const checkEmail = await this.userRepository.getByEmail(cDTO.email);
        if (checkEmail != null){
            return Promise.resolve({errormsg: "this email is already in db"});
        }
        const hashedPassword = await hashPswd(cDTO.password)
        const userToCreate = new User('', cDTO.name, cDTO.email, hashedPassword, cDTO.phone_number, cDTO.role);
        const userCreated = await this.userRepository.create(userToCreate);
        return Promise.resolve (userCreated.toDTO())
    }

    async findUserById(id: string): Promise<returnUserDTO | userServiceError> {
        const userGetted = await this.userRepository.getById(id);
        if (userGetted == null){
            return Promise.resolve({errormsg: "user not found by this id"});
        }
        return Promise.resolve (userGetted.toDTO())
    }

    async findUserByEmail(email: string): Promise<returnUserDTO | userServiceError> {
        const userGetted = await this.userRepository.getByEmail(email);
        if (userGetted == null){
            return Promise.resolve({errormsg: "user not found by this email"});
        }
        return Promise.resolve (userGetted.toDTO())
    }

    async updateUser(upDTO: updateDTO): Promise<returnUserDTO | userServiceError> {
        const hashedPswd = await hashPswd(upDTO.password);
        const userToUpdate = new User(upDTO.id, upDTO.name, upDTO.email, hashedPswd, upDTO.phone_number, userRole.UserRoleCustomer);
        const userUpdated = await this.userRepository.update(userToUpdate);
        if (userUpdated == null){
            return Promise.resolve({errormsg: "user to update not found by id"})
        }
        return Promise.resolve (userUpdated.toDTO())
    }
}