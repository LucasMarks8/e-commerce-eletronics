import { PurchaseModel } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PurchaseDatabase extends BaseDatabase {
    public static TABLE_PURCHASE = "purchase"

    public findPurchaseByUserId = async (userId: string): Promise<PurchaseModel[]> => {
        const result: PurchaseModel[] = await BaseDatabase
            .connection(PurchaseDatabase.TABLE_PURCHASE)
            .select(
                "purchase.id",
                "purchase.product_id",
                "purchase.user_id",
                "purchase.quantity",
                "users.email AS buyer"
            )
            .join("users", "purchase.user_id", "=", "users_id")
            .where("purchase.user_id", userId)

        return result
    }
}