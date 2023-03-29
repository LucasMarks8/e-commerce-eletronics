import { PurchaseDB, PurchaseModel } from "../services/types"

export class Purchase {
    constructor(
        private id: string,
        private productId: string,
        private userId: string,
        private quantity: number
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getProductId(): string {
        return this.productId
    }

    public setProductId(value: string): void {
        this.productId = value
    }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getQuantity(): number {
        return this.quantity
    }

    public setQuantity(value: number): void {
        this.quantity = value
    }

    public toDBModel(): PurchaseDB {
        return {
           id: this.id,
           product_id: this.productId,
           user_id: this.userId,
           quantity: this.quantity
        }
    }

    public toBusinessModel(): PurchaseModel {
        return {
            id: this.id,
            productId: this.productId,
            userId: this.userId,
            quantity: this.quantity
         }
    }
}