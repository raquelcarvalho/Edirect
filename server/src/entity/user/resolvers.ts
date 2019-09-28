import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "./model";
import { getUserByEmail, createUser } from "./service";
import { ApolloError } from "apollo-server-koa";
import bcrypt from "bcrypt";
import { Context } from "koa";
import jwt from "jsonwebtoken";

@Resolver(User)
export class UserResolver {
    @Mutation(returns => User)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context,
    ) {

        const user = await getUserByEmail(email);
        
        if (!user) {
            throw new ApolloError("No user found!");
        }

        const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
        if (!passwordIsValid) {
            throw new ApolloError("Password is invalid!");
        }
        
        const stringifiedUser = JSON.stringify({
            id: user.id,
            email: user.email
        });

        const token = await jwt.sign(stringifiedUser, "superSecretPassword123");
        ctx.cookies.set("x-session", token, { httpOnly: false });

        return user;
    }

    @Mutation(returns => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context,
    ) {

        const user = await getUserByEmail(email);
        
        if (user) {
            throw new ApolloError("Already registered user!");
        }

        const id: any = await createUser(email, password)

        return {id: id[0], email}
    }
}
