import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { Project } from "./model";
import { getProjects } from "./service";
import { Context } from "koa";

@Resolver(Project)
export class ProjectResolver {
    @Query(returns => [Project])
    async projects(@Ctx() ctx: Context): Promise<Project[] | null> {
        const { user } = ctx.state;
        if (!user) {
            return null;
        }

        return getProjects(user.id);
    }
}
