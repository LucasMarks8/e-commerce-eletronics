import { UsersDatabase } from "../database/UsersDatabase";
import { DeleteUserInputDTO, EditUserInputDTO, GetUsersInputDTO, GetUsersOutputDTO, SignUpInputDTO, SignUpOutputDTO, loginInputDTO, loginOutputDTO } from "../dtos/UsersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Users } from "../models/usersModel";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Role, TokenPayload } from "../types";

export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g

export class UserBusiness {
    constructor (
        private userDatabase = new UsersDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignUpInputDTO): Promise<SignUpOutputDTO> => {
        const { email, password } = input

        if(typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string");
        }
        
        if (!email.match(regexEmail)) {
            throw new BadRequestError("'email' deve possuir letras minúsculas, deve ter um @, letras minúsculas, ponto (.) e de 2 a 4 letras minúsculas")
        }

        if(typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string");
        }

        if (!password.match(regexPassword)) {
            throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }

        const id =   this.idGenerator.generate()

        const newUser = new Users(
            id,
            email,
            password,
            Role.NORMAL
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.insertUsers(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            email: newUser.getEmail(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignUpOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: loginInputDTO) => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const userDB =  await this.userDatabase.findUsersByEmail(email)

        if(!userDB) {
            throw new NotFoundError("'email' não cadastrado")
        }

        const users = new Users(
            userDB.id,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const hashedPassword = users.getPassword()

        const isPasswordCorrect = await this.hashManager
            .compare(password, hashedPassword)

            if(!isPasswordCorrect) {
                throw new BadRequestError("'password' incorreto") 
            }

            const payload: TokenPayload = {
                id: users.getId(),
                email: users.getEmail(),
                role: users.getRole()
            }

        const token = this.tokenManager.createToken(payload)

        const output: loginOutputDTO = {
            token: token
        }

        return output
    }

    public GetUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' é necessário")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token' inválido")
        }

        const usersDB = await this.userDatabase.findUsers()

        const users = usersDB.map((userDB) => {
            const user = new Users(
                userDB.id,
                userDB.email,
                userDB.password,
                userDB.role,
            )
            return user.toBusinessModel()
        })

        const output: GetUsersOutputDTO = users

        return output
    }

    public editUsers = async (input: EditUserInputDTO): Promise<void> => {
        const { idToEdit, token, email, password } = input

        if (token === undefined) {
            throw new BadRequestError("'token' é necessário")
        }

        if (idToEdit === undefined) {
            throw new BadRequestError("'id' é necessário")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token' inválido");
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new BadRequestError("'email' deve ser uma string")
            }
            if (!email.match(regexEmail)) {
                throw new BadRequestError("'email' deve possuir letras minúsculas, deve ter um @, letras minúsculas, ponto (.) e de 2 a 4 letras minúsculas")
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new BadRequestError("'password' deve ser uma string")
            }
            if (!password.match(regexPassword)) {
                throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
            }
        }

        const newUserDB = await this.userDatabase.findUsersById(idToEdit)

        if (!newUserDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const user = new Users(
            newUserDB.id,
            newUserDB.email,
            newUserDB.password,
            newUserDB.role
        )

        if (password) {
            user.setPassword(password)
        }

        if (email) {
            user.setEmail(email)
        }

        const updatedUserDB = user.toDBModel()

        await this.userDatabase.editUsers(updatedUserDB, idToEdit)
    }

    public deleteUsers = async (input: DeleteUserInputDTO): Promise<boolean> => {
        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' é necessário")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("'token' inválido")
        }

        const userDBExists = await this.userDatabase.findUsersById(idToDelete)

        if (!userDBExists) {
            throw new NotFoundError("'id' não existe");
        }

        const creatorId = payload.id

        if (payload.role !== Role.ADMIN && userDBExists.id !== creatorId) {
            throw new BadRequestError("somente o próprio usuário ou um admin pode deletá-lo");
        }

        await this.userDatabase.deleteUsers(idToDelete)

        return true
    }
}