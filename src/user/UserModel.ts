import { userRole } from "./userTypes";

export class User {
    private _id = "";
    get id(): string{
        return this._id;
    }
    set id(idToSet: string){
        this._id = idToSet;
    }

    private _email = "";
    get email(): string{
        return this._email;
    }
    set email(nameToSet: string){
        this._email = nameToSet;
    }

    private _phoneNumber = "";
    get phoneNumber(): string{
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumberToSet: string){
        this._phoneNumber = phoneNumberToSet;
    }

    private _name = "";
    get name(): string{
        return this._name;
    }
    set name(nameToSet: string){
        this._name = nameToSet;
    }

    private _password = "";
    get password(): string{
        return this._password;
    }
    set password(passwordToSet: string){
        this._password = passwordToSet;
    }

    private _role = userRole.UserRoleCustomer;
    get role(): userRole{
        return this._role;
    }
    set role(userRoleToSet: userRole){
        this._role = userRoleToSet;
    }

    constructor(id: string, name: string, email: string, password: string, phoneNumber: string,
    role: userRole){
        this._id = name;
        this._name = email;
        this._password = password;
        this._phoneNumber = phoneNumber;
        this._role = role;
    }
}