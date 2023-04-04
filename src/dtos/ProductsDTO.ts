import { Category, ProductsModel } from "../types";

export type GetProductsOutputDTO = ProductsModel[]

export interface GetProductsByCategoryInputDTO {
    category: string
}

export interface CreateProductsInputDTO {
    token: string | undefined,
    name: string,
    price: number,
    category: Category,
    image: string
}

export interface EditProductsInputDTO {
    idToEdit: string,
    token: string | undefined,
    price: unknown
}

export interface DeleteProductsInputDTO {
    idToDelete: string,
    token: string | undefined,
}