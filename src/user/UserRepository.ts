import { User } from "./UserModel"


interface IUserRepository{
    create(user: User): Promise<User>
	update(user: User): Promise<User | null>
	authenticate(login: string, password: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	findById(id: string): Promise<User | null>
}

export { IUserRepository }