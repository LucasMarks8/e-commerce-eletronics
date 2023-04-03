import { Role, UsersDB, UsersModel } from "../types"


export class Users {
    constructor(
        private id: string,
        private email: string,
        private password: string,
        private role: Role
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): Role {
        return this.role
    }

    public setRole(value: Role): void {
        this.role = value
    }

    public toDBModel(): UsersDB {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }

    public toBusinessModel(): UsersModel {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}