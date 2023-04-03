import { Role, UsersModel } from "../types"

export interface SignUpInputDTO {
    email: unknown,
    password: unknown
}

export interface SignUpOutputDTO {
    token: string
}

export interface loginInputDTO {
    email: unknown,
    password: unknown
}

export interface loginOutputDTO {
    token: string
}

export interface GetUsersInputDTO {
    token: string | undefined
}

export type GetUsersOutputDTO = UsersModel[]

export interface EditUserInputDTO {
    idToEdit?: string,
    token: string | undefined,
    email?: string,
    password?: string
}

export interface EditUserOutputDTO {
    id: string,
    email: string,
    password: string,
    role: Role,
}

export interface DeleteUserInputDTO {
    idToDelete: string,
    token: string | undefined
}

