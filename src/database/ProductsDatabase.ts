import { Category, ProductsDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class ProductsDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "products"

    public findProductsById = async (idParams: string): Promise<ProductsDB | undefined> => {
        const result: ProductsDB[] = await BaseDatabase
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .select()
            .where({ id: idParams })

        return result[0]
    }

    public findProductsByCategory = async (category: Category): Promise<ProductsDB[] | undefined> => {
        const result: ProductsDB[] = await BaseDatabase
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .select()
            .where({ category })

        return result
    }

    public insertProducts = async (productsDB: ProductsDB): Promise<void> => {
        await BaseDatabase
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .insert(productsDB)     
    }

    public editProducts = async (newProductDB: ProductsDB, idToEdit: string): Promise<void> => {
        await BaseDatabase
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .update(newProductDB)
            .where({ idToEdit })
    }

    public deleteProducts = async (idToDelete: string): Promise<void> => {
        await BaseDatabase
            .connection(ProductsDatabase.TABLE_PRODUCTS)
            .del()
            .where({ idToDelete })
    }
}