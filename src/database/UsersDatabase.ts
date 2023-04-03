import { UsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findUsersByEmail = async (email: string): Promise<UsersDB | undefined> => {
        const result: UsersDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return result[0]
    }

    public findUsersById = async (id: string): Promise<UsersDB | undefined> => {
        const result: UsersDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()
            .where({ id })

        return result[0]
    }

    public findUsers = async (): Promise<UsersDB[]> => {
        const result: UsersDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()

        return result
    }

    public insertUsers = async (usersDB: UsersDB): Promise<void> => {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(usersDB)
    }

    public editUsers = async (newUserDB: UsersDB, idToEdit: string): Promise<void> => {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .update(newUserDB)
            .where({ idToEdit })
    }

    public deleteUsers = async (idToDelete: string): Promise<void> => {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .del()
            .where({ idToDelete })
    }
}

