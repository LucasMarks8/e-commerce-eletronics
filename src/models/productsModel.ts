import { Category, ProductsDB, ProductsModel } from "../services/types"

export class Products {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private category: Category
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getPrice(): number {
        return this.price
    }

    public setPrice(value: number): void {
        this.price = value
    }

    public getCategory(): Category {
        return this.category
    }

    public setCategory(value: Category): void {
        this.category = value
    }

    public toDBModel(): ProductsDB {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            category: this.category
        }
    }

    public toBusinessModel(): ProductsModel {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            category: this.category
        }
    }
}