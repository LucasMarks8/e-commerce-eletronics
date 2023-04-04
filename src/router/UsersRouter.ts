import express from "express";
import { UserBusiness } from "../business/UsersBusiness";
import { UserController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UsersDatabase,
        new IdGenerator,
        new TokenManager,
        new HashManager
    )
)

usersRouter.post("/signup", userController.signup)
usersRouter.post("/login", userController.login)
usersRouter.get("/", userController.getUsers)
usersRouter.put("/:id", userController.editUsers)
usersRouter.delete("/:id", userController.deleteUser)