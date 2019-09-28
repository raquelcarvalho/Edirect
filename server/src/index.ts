require("dotenv").config();
import Koa from "koa";
import "reflect-metadata";
const graphqlHTTP = require("koa-graphql");
import { buildSchema } from "type-graphql";
import { graphqlMW, koaMW } from "./middlewares";
import mount from "koa-mount";

const { PORT = 4444 } = process.env;

export async function main() {
    try {
        const server = new Koa();

        const schema = await buildSchema({
            resolvers: [__dirname + "/entity/**/resolvers.js"],
            globalMiddlewares: [graphqlMW.Auth.verifyProjectId]
        });

        server.use(koaMW.verifyJwt);

        server.use(
            mount(
                "/graphql",
                graphqlHTTP({
                    schema,
                    graphiql: true,
                }),
            ),
        );

        server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
    } catch (e) {
        console.log(e);
    }
}

main();
