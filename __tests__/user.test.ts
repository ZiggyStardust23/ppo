import { UserService } from '../src/user/UserService'
import { IUserRepository } from '../src/user/UserRepository';
import { User } from '../src/user/UserModel';
import { mock, instance, when, anything } from 'ts-mockito';
import { userRole } from '../src/user/userTypes';
import bcrypt from 'bcrypt';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = mock<IUserRepository>();
        userService = new UserService(instance(userRepository));
    });

    it('should create user by registration', async () => {
        // Arrange
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(null);
        when(userRepository.create(anything())).thenResolve(createdUser);
    

        // Act
        const result = await userService.registration({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phoneNumber: '1234567890', 
                                                     });

        // Assert
        expect(result).toEqual(createdUser);
    });

    it('should not create user by registration, this email already in db', async () => {
        // Arrange
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(createdUser);
    

        // Act
        const result = await userService.registration({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phoneNumber: '1234567890', 
                                                     });

        // Assert
        expect(result).toEqual(null);
    });

    it('login: success', async () => {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash('password', salt);

        const loginUser = new User('1', 'Vanya', 'test@example.com', hashedPassword, '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(loginUser);
    

        const result = await userService.login({email: 'test@example.com', 
                                                     password: 'password', 
                                                     });

        // Assert
        expect(result).toEqual(loginUser);
    });

    it('login: this email not in db', async () => {

        when(userRepository.getByEmail('someemail@example.com')).thenResolve(null);
    

        const result = await userService.login({email: 'someemail@example.com', 
                                                     password: 'password', 
                                                     });

        // Assert
        expect(result).toEqual(null);
    });

    it('login: bad password', async () => {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash('password', salt);

        const loginUser = new User('1', 'Vanya', 'test@example.com', hashedPassword, '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(loginUser);
    

        const result = await userService.login({email: 'test@example.com', 
                                                     password: 'badpassword', 
                                                     });

        // Assert
        expect(result).toEqual(null);
    });

    it('should create user', async () => {
        // Arrange
        const userToCreate = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'ITSHASHEDPASSWORD', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(null);
        when(userRepository.create(anything())).thenResolve(createdUser);
    

        // Act
        const result = await userService.createUser({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phoneNumber: '1234567890', 
                                                     role: userRole.UserRoleCustomer});

        // Assert
        expect(result).toEqual(createdUser);
    });

    it('should not create user, this email already in db', async () => {
        // Arrange
        const userToCreate = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);
        const createdUser = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        when(userRepository.getByEmail('test@example.com')).thenResolve(createdUser);
    

        // Act
        const result = await userService.createUser({name: 'Vanya', 
                                                     email: 'test@example.com', 
                                                     password: 'password', 
                                                     phoneNumber: '1234567890', 
                                                     role: userRole.UserRoleCustomer});

        // Assert
        expect(result).toEqual(null);
    });

    it('should find user by id', async () => {
        // Arrange
        const userId = '1';
        const user = new User(userId, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        // Mock behavior of userRepository.findById()
        when(userRepository.getById(userId)).thenResolve(user);

        // Act
        const result = await userService.findUserById(userId);

        // Assert
        expect(result).toEqual(user);
    });

    it('should find user by email', async () => {
        // Arrange
        const userEmail = 'test@example.com';
        const user = new User('1', 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        // Mock behavior of userRepository.findByEmail()
        when(userRepository.getByEmail(userEmail)).thenResolve(user);

        // Act
        const result = await userService.findUserByEmail(userEmail);

        // Assert
        expect(result).toEqual(user);
    });

    it('should update user', async () => {
        // Arrange
        const userId = '1';
        const userToUpdate = new User(userId, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);
        const updatedUser = new User(userId, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);

        // Mock behavior of userRepository.findById()
        when(userRepository.getById(userId)).thenResolve(userToUpdate);
        // Mock behavior of userRepository.update()
        when(userRepository.update(anything())).thenResolve(updatedUser);

        // Act
        const result = await userService.updateUser(userToUpdate);

        // Assert
        expect(result).toEqual(updatedUser);
    });

    it('should not update user, because there is no such user in db', async () => {
        // Arrange
        const userId = '1';
        const userToUpdate = new User(userId, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleCustomer);
        const updatedUser = new User(userId, 'Vanya', 'test@example.com', 'password', '1234567890', userRole.UserRoleAdmin);

        // Mock behavior of userRepository.findById()
        when(userRepository.getById(userId)).thenResolve(null);

        // Act
        const result = await userService.updateUser(userToUpdate);

        // Assert
        expect(result).toEqual(null);
    });
});
