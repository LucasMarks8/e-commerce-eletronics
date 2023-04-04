import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { ProductsController } from "../controller/ProductsController";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { ProductsDatabase } from "../database/ProductsDatabase";

export const productsRouter = express.Router()

const productsController = new ProductsController(
    new ProductsBusiness(
        new ProductsDatabase,
        new IdGenerator,
        new TokenManager
    )
)

productsRouter.get("/:category", productsController.getProducts)
productsRouter.get("/", productsController.getProducts)
productsRouter.post("/", productsController.createProducts)
productsRouter.put("/:id", productsController.editProducts)
productsRouter.delete("/:id", productsController.deleteProducts)