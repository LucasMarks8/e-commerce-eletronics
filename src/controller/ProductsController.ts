import { Request, Response } from "express";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { BaseError } from "../errors/BaseError";
import { CreateProductsInputDTO, DeleteProductsInputDTO, EditProductsInputDTO, GetProductsByCategoryInputDTO } from "../dtos/ProductsDTO";

export class ProductsController {
    constructor(
        private productsBusiness: ProductsBusiness
    ) {}

    public getProducts = async (req: Request, res: Response) => {
        try {
           const output = await this.productsBusiness.getProducts()

           res.status(200).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getProductsByCategory = async (req: Request, res: Response) => {
        try {
            const input: GetProductsByCategoryInputDTO = {
                category: req.params.category
            }

            const output = await this.productsBusiness.getProductsByCategory(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createProducts = async (req: Request, res: Response) => {
        try {
            const input: CreateProductsInputDTO = {
                token: req.headers.authorization,
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                image: req.body.image
            }

            const output = await this.productsBusiness.createProducts(input)

            res.status(201).send(output)
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editProducts = async (req: Request, res: Response) => {
        try {
            const input: EditProductsInputDTO = {
                idToEdit: req.params.id,
                token: req.headers.authorization,
                price: req.body.price
            }

            const output = await this.productsBusiness.editProducts(input)

            res.status(200).send(output)
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteProducts = async (req: Request, res: Response) => {
        try {
            const input: DeleteProductsInputDTO = { 
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            const output = await this.productsBusiness.deleteProducts(input)

            res.status(200).send(output)

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