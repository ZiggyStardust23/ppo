type registrationDTO = {
    email: string,
    name: string,
    phone_number: string,
    password: string
}

type loginDTO = {
    email: string,
    password: string
}

type createDTO = {
    email: string,
    phone_number: string,
    name: string,
    password: string,
    role: userRole,
}

type updateDTO = {
    id: string,
    email: string,
    phone_number: string,
    name: string,
    password: string,
    role: userRole,
}

type returnUserDTO = {
    id: string,
    email: string,
    phone_number: string,
    name: string,
    role: userRole,
}

enum userRole {
    UserRoleAdmin = 0,
    UserRoleSeller = 1,
    UserRoleCustomer = 2
}

type userServiceError = {
    errormsg: string;
}

export {registrationDTO, loginDTO, createDTO, returnUserDTO, updateDTO, userRole, userServiceError}