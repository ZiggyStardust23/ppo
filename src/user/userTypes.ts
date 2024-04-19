export enum userRole {
    UserRoleAdmin = 0,
    UserRoleSeller = 1,
    UserRoleCustomer = 2
}

export type errType = {
    retCode: number;
    errText: string;
}