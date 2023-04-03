import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { DeleteUserInputDTO, EditUserInputDTO, GetUsersInputDTO, SignUpInputDTO, SignUpOutputDTO, loginInputDTO, loginOutputDTO } from "../dtos/UsersDTO";
import { BaseError } from "../errors/BaseError";
import { GetUsersOutputDTO } from "../dtos/UsersDTO";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignUpInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const output: SignUpOutputDTO = await this.userBusiness.signup(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const output: loginOutputDTO = await this.userBusiness.login(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input: GetUsersInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.userBusiness.GetUsers(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editUsers = async (req: Request, res: Response) => {
        try {
            const input: EditUserInputDTO = {
                idToEdit: req.params.id,
                token: req.headers.authorization,
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.editUsers(input)

            res.status(200).send(output)
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const input: DeleteUserInputDTO = { 
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            const outPut = await this.userBusiness.deleteUsers(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}