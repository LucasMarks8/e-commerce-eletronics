import { Category, ProductsModel } from "../types";

export type GetProductsOutputDTO = ProductsModel[]

export interface CreateProductsInputDTO {
    token: string | undefined,
    id: string,
    name: string,
    price: number,
    category: Category,
    image: string
}

export interface EditProductsInputDTO {
    idToEdit: String,
    token: string | undefined,
}

export interface DeleteProductsInputDTO {
    idToDelete: string,
    token: string | undefined,
}