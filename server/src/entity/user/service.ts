import dbConn from "../../config/db";
import bcrypt from "bcrypt";
import { User } from "./model";

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const result: User | undefined = await dbConn
        .select()
        .from("users")
        .where({ email })
        .first();

    return result ? new User(result) : undefined;
}

export async function createUser(email: string, password: string): Promise<User | undefined> {
    const passwordHash = bcrypt.hashSync(password, 10);
    return await dbConn.from("users").insert({email, passwordHash});;
}
