import { userRole } from "./userTypes"

type registrationDTO = {
    email: string,
    name: string,
    phoneNumber: string,
    password: string
}

type loginDTO = {
    email: string,
    password: string
}

type createDTO = {
    email: string,
    phoneNumber: string,
    name: string,
    password: string,
    role: userRole,
}

export {registrationDTO, loginDTO, createDTO}