import jwt from "jsonwebtoken";
import { Context } from "koa";

function verifyJwt(ctx: Context, next: Function) {
  const sessionCookie = ctx.cookies.get("x-session");
  if (sessionCookie) {
    ctx.state.user = jwt.verify(sessionCookie, "superSecretPassword123");
  }
  return next();
}

export default verifyJwt;
