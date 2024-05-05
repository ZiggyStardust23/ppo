import { UserService } from '../src/user/UserService'
import { IUserRepository } from '../src/user/UserRepository';
import { User } from '../src/user/UserModel';
import { mock, instance, when, anything } from 'ts-mockito';
import { userRole } from '../src/user/UserDTO';
import { hashPswd } from '../src/user/UserService';
import bcrypt from 'bcrypt';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = mock<IUserRepository>();
        userService = new UserService(instance(userRepository));
    });

    it('should create user by registration', async () => {
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(null);
        when(userRepository.create(anything())).thenResolve(createdUser);
    
        const result = await userService.registration({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phone_number: '1234567890', 
                                                     });

        expect(result).toEqual({id: '1', name: 'Vanya', email: 'test@example.com', phone_number: '1234567890', role: userRole.UserRoleCustomer});
    });

    it('should not create user by registration, this email already in db', async () => {
        const existingUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(null);
    

        const result = await userService.registration({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phone_number: '1234567890', 
                                                     });

        expect(result).toEqual({"errormsg": "This email is already in db"})
    });

    it('login: success', async () => {
        const hashed = await hashPswd("password");
        const loginUser = new User('1', 'Vanya', 'test@example.com', hashed, '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(loginUser);
    

        const result = await userService.login({email: 'test@example.com', 
                                                     password: 'password', 
                                                     });

        expect(result).toEqual({id: '1', name: 'Vanya', email: 'test@example.com', phone_number: '1234567890', role: userRole.UserRoleCustomer});
    });

    it('login: this email not in db', async () => {

        when(userRepository.getByEmail('someemail@example.com')).thenResolve(null);
    

        const result = await userService.login({email: 'someemail@example.com', 
                                                     password: 'password', 
                                                     });

        expect(result).toEqual({errormsg: "wrong email"});
    });

    it('login: bad password', async () => {
        
        const hashed = await hashPswd("password");
        const loginUser = new User('1', 'Vanya', 'test@example.com', hashed, '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(loginUser);
    

        const result = await userService.login({email: 'test@example.com', 
                                                password: 'badpassword', 
                                                     });

        expect(result).toEqual({errormsg: "wrong password"});
    });

    it('should create user', async () => {
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(null);
        when(userRepository.create(anything())).thenResolve(createdUser);
    
        const result = await userService.createUser({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phone_number: '1234567890', 
                                                     role: userRole.UserRoleCustomer});

        expect(result).toEqual({id: '1',
                                name: 'Vanya', 
                                email: 'test@example.com', 
                                phone_number: '1234567890', 
                                role: userRole.UserRoleCustomer});
    });

    it('should not create user, this email already in db', async () => {
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(createdUser);
    
        const result = await userService.createUser({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phone_number: '1234567890', 
                                                     role: userRole.UserRoleCustomer});
        expect(result).toEqual({errormsg: "this email is already in db"});
    });

    it('should find user by id', async () => {
        const userid = '1';
        const user = new User(userid, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getById(userid)).thenResolve(user);

        const result = await userService.findUserById(userid);

        expect(result).toEqual({id: '1',
                                name: 'Vanya', 
                                email: 'test@example.com', 
                                phone_number: '1234567890', 
                                role: userRole.UserRoleCustomer});
    });

    it('should find user by email', async () => {
        const userEmail = 'test@example.com';
        const user = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail(userEmail)).thenResolve(user);

        const result = await userService.findUserByEmail(userEmail);

        expect(result).toEqual({id: '1',
                                name: 'Vanya', 
                                email: 'test@example.com', 
                                phone_number: '1234567890', 
                                role: userRole.UserRoleCustomer});
    });

    it('should update user', async () => {
        const userid = '1';
        const userToUpdate = new User(userid, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);
        const updatedUser = new User(userid, 'Ivan', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getById(userid)).thenResolve(userToUpdate);
        when(userRepository.update(anything())).thenResolve(updatedUser);

        const result = await userService.updateUser({id: '1',
                                                    name: 'Vanya', 
                                                    email: 'test@example.com', 
                                                    password: 'password', 
                                                    phone_number: '1234567890', 
                                                    role: userRole.UserRoleCustomer});

        expect(result).toEqual({id: '1',
                                name: 'Ivan', 
                                email: 'test@example.com', 
                                phone_number: '1234567890', 
                                role: userRole.UserRoleCustomer});
    });

    it('should not update user, because there is no such user in db', async () => {
        const userid = '1';
        const userToUpdate = new User(userid, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.update(anything())).thenResolve(null);

        const result = await userService.updateUser({id: '1',
                                                    name: 'Vanya', 
                                                    email: 'test@example.com', 
                                                    password: 'password', 
                                                    phone_number: '1234567890', 
                                                    role: userRole.UserRoleCustomer});

        expect(result).toEqual({errormsg: "user to update not found by id"});
    });
});
