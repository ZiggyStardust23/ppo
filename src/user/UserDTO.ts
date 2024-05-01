import { userRole } from "./userTypes"

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

export {registrationDTO, loginDTO, createDTO}