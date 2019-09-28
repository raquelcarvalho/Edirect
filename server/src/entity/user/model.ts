import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    email: string;

    passwordHash: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.passwordHash = user.passwordHash;
    }

    ToString(): string {
        return JSON.stringify({ id: this.id, email: this.email });
    }
}
