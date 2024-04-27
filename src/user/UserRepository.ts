import { User } from "./UserModel"


interface IUserRepository{
    create(user: User): Promise<User>
	update(user: User): Promise<User | null>
	authenticate(login: string, password: string): Promise<User | null>
	getByEmail(email: string): Promise<User | null>
	getById(id: string): Promise<User | null>
}

export { IUserRepository }