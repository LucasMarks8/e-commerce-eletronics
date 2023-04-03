import { PurchaseModel } from "../types"

export interface GetPurchaseByUserIdInputDTO {
    token: string | undefined,
    id: string
}

export type GetPurchaseByUserIdOutputDTO = PurchaseModel[]