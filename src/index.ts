import * as readline from 'readline-sync';
import { UserService } from "./user/UserService";
import { PostgresUserRepository } from "./user/UserRepository";
import { User } from './user/UserModel';
import { PhoneService } from './phone/PhoneService';
import { PostgresPhoneRepository } from './phone/PhoneRepository';
import { adminMenu, guestMenu, sellerMenu, userMenu } from './utils';
import { userRole } from './user/userTypes';

let user: User | null = null;

async function cliUI(){
    let choice = -1;
    console.log("Welcome to our shop!\n");
    while (choice != 0){
        if (user == null){
            const temp = "1 - Show store assortment\n" +
                         "2 - Search\n" +
                         "3 - Show your basket\n" +
                         "4 - Registration\n" +
                         "5 - Login\n"
                         "0 - Exit\n"
            while (choice != 0){

            }
        }
        else{
            if (user.status == userRole.UserRoleCustomer){
                console.log(userMenu);
                choice = parseInt(readline.question('Your choice: '));
            }
            else if(user.status == userRole.UserRoleSeller){
                console.log(sellerMenu)
                choice = parseInt(readline.question('Your choice: '));
            }
            else{
                console.log(adminMenu)
                choice = parseInt(readline.question('Your choice: '));
            }
        }
    }
}

async function guestActions(): Promise<number>{
    let choice: number = -1;
    console.log(guestMenu)
    choice = parseInt(readline.question('Your choice: '));
    while (choice != 0){
        if (choice == 1){
            const phoneRepository = new PostgresPhoneRepository();
            phoneRepository.initialize();
            const phoneService = new PhoneService(phoneRepository);
            let page = 0;
            let choice2 = -1;
            while (choice2 != 0){
                if (choice2 == -1 || choice2 == 1  || choice2 == 2){
                    let phones = await phoneService.paginate({}, page, 10);
                    for (let i = 0; i < (phones.length < 10 ? phones.length : 10); i++){
                        console.log(phones[i].id + " " + phones[i].name + " " + phones[i].price.toString() + "\n");
                    }
                }
                console.log("Page " + (page + 1).toString() + "\n");
                console.log("Whould you like to:\n");
                console.log("1. Next page\n");
                console.log("2. Previous page\n");
                console.log("3. Open phone page");
                console.log("4. Add phone to basket");
                console.log("0. Back to main menu");
                choice2 = parseInt(readline.question('Your choice: '));
            }
        }
    }
    return Promise.resolve(choice);
}