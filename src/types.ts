export enum Category {
    uPhone = "uPhone",
    uPad = "uPad",
    uMac = "uMac"
}

export enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export interface TokenPayload {
    id: string,
    email: string,
    role: Role
}

export interface UsersDB {
    id: string,
    email: string,
    password: string, 
    role: Role
}

export interface UsersModel {
    id: string,
    email: string,
    password: string,
    role: Role
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

export interface ProductsDB {
    id: string,
    name: string,
    price: number,
    category: Category,
    image: string
}

export interface ProductsModel {
    id: string,
    name: string,
    price: number,
    category: Category,
    image: string
}

