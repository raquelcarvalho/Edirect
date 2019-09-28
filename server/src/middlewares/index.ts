import verifyJwt from "./verifyJwt";
import { Context } from "koa";
import { AuthChecker } from "type-graphql";
import * as Auth from "./auth";

export const koaMW = {
    verifyJwt,
};
export const graphqlMW = {
    Auth,
};

export const customAuthChecker: AuthChecker<Context> = ({ args, context }, roles) => {
    return false;
};