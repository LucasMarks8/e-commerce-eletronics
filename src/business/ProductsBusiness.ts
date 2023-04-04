import { ProductsDatabase } from "../database/ProductsDatabase";
import { CreateProductsInputDTO, DeleteProductsInputDTO, EditProductsInputDTO, GetProductsByCategoryInputDTO, GetProductsOutputDTO } from "../dtos/ProductsDTO";
import { EditUserInputDTO } from "../dtos/UsersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Products } from "../models/productsModel";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Category } from "../types";

export class ProductsBusiness {
    constructor(
        private productsDatabase: ProductsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getProducts = async (): Promise<GetProductsOutputDTO> => {
        const productsDB = await this.productsDatabase.findProducts()

        const products = productsDB.map((productDB) => {
            const product = new Products(
                productDB.id,
                productDB.name,
                productDB.price,
                productDB.category,
                productDB.image
            )
            return product.toBusinessModel()
        })

        const output: GetProductsOutputDTO = products

        return output
    }

    public getProductsByCategory = async (input: GetProductsByCategoryInputDTO): Promise<GetProductsOutputDTO> => {
        const productsDB = await this.productsDatabase.findProductsByCategory(input)

        const products = productsDB.map((productDB) => {
            const product = new Products(
                productDB.id,
                productDB.name,
                productDB.price,
                productDB.category,
                productDB.image
            )
                return product.toBusinessModel()
        })

        const output: GetProductsOutputDTO = products

        return output
    }

    public createProducts = async (input: CreateProductsInputDTO): Promise<boolean> => {
        const { token, name, price, category, image } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token' inválido")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser uma string")
        }

        if (typeof price !== "number") {
            throw new BadRequestError("'price' deve ser uma number")
        }

        if (typeof category !== "string") {
            throw new BadRequestError("'category' deve ser 'Umac', 'Upad', 'Uphone'")
        }

        if (typeof image !== "string") {
            throw new BadRequestError("'image' deve ser uma string")
        }

        const id = this.idGenerator.generate()

        const newProduct = new Products(
            id,
            name,
            price,
            category,
            image
        )

        const newProductsDB = newProduct.toDBModel()

        await this.productsDatabase.insertProducts(newProductsDB)

        return true
    }

    public editProducts = async (input: EditProductsInputDTO): Promise<void> => {
        const { idToEdit, token, price } = input

        if (token === undefined) {
            throw new BadRequestError("'token' é necessário")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token' inválido");
        }

        if (typeof price !== "number") {
            throw new BadRequestError("'price' deve ser uma number")
        }

        const newProductsDB = await this.productsDatabase.findProductsById(idToEdit)

        if (!newProductsDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const products = new Products(
            newProductsDB.id,
            newProductsDB.name,
            newProductsDB.price,
            newProductsDB.category,
            newProductsDB.image
        )

        products.setPrice(price)

        const updatedProductDB = products.toDBModel()

        await this.productsDatabase.editProducts(updatedProductDB, idToEdit)
    }

    public deleteProducts = async (input: DeleteProductsInputDTO): Promise<boolean> => {
        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' é necessário")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Usuário' não está logado")
        }

        const postDBExists = await this.productsDatabase.findProductsById(idToDelete)

        if (!postDBExists) {
            throw new NotFoundError("'id' não existe")
        }

        await this.productsDatabase.deleteProducts(idToDelete)

        return true
    }
}