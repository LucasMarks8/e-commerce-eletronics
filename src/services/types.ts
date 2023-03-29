export interface tokenPayload {
    id: string
}

export interface UsersDB {
    id: string,
    email: string,
    password: string
}

export interface UsersModel {
    id: string,
    email: string,
    password: string
}

export interface PurchaseDB {
    id: string,
    product_id: string,
    user_id: string,
    quantity: number
}

export interface PurchaseModel {
    id: string,
    productId: string,
    userId: string,
    quantity: number
}

export enum Category {
    uPhone = "uPhone",
    uPad = "uPad",
    uMac = "uMac"
}

export interface ProductsDB {
    id: string,
    name: string,
    price: number,
    category: Category
}

export interface ProductsModel {
    id: string,
    name: string,
    price: number,
    category: Category
}

