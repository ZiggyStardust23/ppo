import bcrypt from 'bcrypt';
import { PostgresUserRepository } from '../src/user/UserRepository';
import { UserService } from '../src/user/UserService';
import { User } from '../src/user/UserModel';
import { userRole } from '../src/user/userTypes'
import { generateRandomString } from '../src/utils'
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем экземпляр репозитория
const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);

describe('User Repository Tests', () => {
    let testuserid: string;
    let testUserEmail: string;

    test('createUser - создание пользователя', async () => {
        await userRepository.initialize();
        const newUser = new User('', 'Test User', generateRandomString(15), 'password', '0987654321', userRole.UserRoleSeller);
        const createdUser = await userService.createUser(newUser);
        expect(createdUser).toBeDefined();
        expect(createdUser?.id).toBeDefined();
        expect(createdUser?.name).toBe(newUser.name);
        expect(createdUser?.email).toBe(newUser.email);
        let passwordToCheck: string = createdUser?.password || "";
        expect(await bcrypt.compare(newUser.password, passwordToCheck)).toBe(true);
        expect(createdUser?.phone_number).toBe(newUser.phone_number);
        expect(createdUser?.role).toBe(newUser.role);
        testuserid = createdUser!.id; // Сохраняем id созданного пользователя для использования в других тестах
        testUserEmail = createdUser!.email;
    });

    test('login - авторизация пользователя', async () => {
        const newUser = new User('', 'Test User', testUserEmail, 'password', '0987654321', userRole.UserRoleSeller);
        const createdUser = await userService.login({email: testUserEmail, password: 'password'});
        expect(createdUser).toBeDefined();
        expect(createdUser?.id).toBeDefined();
        expect(createdUser?.name).toBe(newUser.name);
        expect(createdUser?.email).toBe(newUser.email);
        let passwordToCheck: string = createdUser?.password || "";
        expect(await bcrypt.compare(newUser.password, passwordToCheck)).toBe(true);
        expect(createdUser?.phone_number).toBe(newUser.phone_number);
        expect(createdUser?.role).toBe(newUser.role);
        testuserid = createdUser!.id; // Сохраняем id созданного пользователя для использования в других тестах
        testUserEmail = createdUser!.email;
    });

    test('login - авторизация пользователя', async () => {
        const newUser = new User('', 'Test User', generateRandomString(15), 'password', '0987654321', userRole.UserRoleCustomer);
        const createdUser = await userService.registration(newUser);
        expect(createdUser).toBeDefined();
        expect(createdUser?.id).toBeDefined();
        expect(createdUser?.name).toBe(newUser.name);
        expect(createdUser?.email).toBe(newUser.email);
        let passwordToCheck: string = createdUser?.password || "";
        expect(await bcrypt.compare(newUser.password, passwordToCheck)).toBe(true);
        expect(createdUser?.phone_number).toBe(newUser.phone_number);
        expect(createdUser?.role).toBe(newUser.role);
    });

    test('findUserById - получение пользователя по ID', async () => {
        const fetchedUser = await userService.findUserById(testuserid);
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser?.id).toBe(testuserid);
    });
    test('findUserById - получение пользователя по ID', async () => {
        const fetchedUser = await userService.findUserByEmail(testUserEmail);
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser?.id).toBe(testuserid);
    });

    test('updateUser - обновление данных пользователя', async () => {
        const updatedUser = await userService.updateUser(new User(testuserid, 'Updated Name', 'updated@example.com', 'newpassword', '9876543210', userRole.UserRoleAdmin));
        expect(updatedUser).toBeDefined();
        expect(updatedUser?.id).toBe(testuserid);
        expect(updatedUser?.name).toBe('Updated Name');
        expect(updatedUser?.email).toBe('updated@example.com');
        expect(updatedUser?.phone_number).toBe('9876543210');
        expect(updatedUser?.role).toBe(userRole.UserRoleAdmin);
    });

    //Такого метода в service нет
    test('delete - удаление пользователя', async () => {
        const deleted = await userRepository.delete(testuserid);
        expect(deleted).toBeTruthy();
        const fetchedUser = await userRepository.getById(testuserid);
        expect(fetchedUser).toBeNull();
    });
});
