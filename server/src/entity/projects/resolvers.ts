import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Project } from "./model";
import {
    getProjects,
    createProject,
    editProject,
    deleteProject,
    createTask,
    deleteTask,
    editTask,
    editStatusTask
} from "./service";
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

    @Mutation(returns => Project)
    async createProject(@Arg("nameProject") name: string, @Ctx() ctx: Context) {
        const { user } = ctx.state;

        if (!user) {
            return null;
        }

        const id: any = await createProject(name, user.id);
        return { id: id[0] };
    }

    @Mutation(returns => Project)
    async editProject(@Arg("id") id: string, @Arg("nameProject") name: string) {
        await editProject(id, name);
        return { id };
    }

    @Mutation(returns => Project)
    async deleteProject(@Arg("id") id: string) {
        await deleteProject(id);
        return { id };
    }

    @Mutation(returns => Project)
    async createTask(@Arg("id") project_id: string, @Arg("valueTask") taskName: string) {
        const id: any = await createTask(project_id, taskName);
        return { id: id[0] };
    }

    @Mutation(returns => Project)
    async deleteTask(@Arg("id") id: string) {
        await deleteTask(id);
        return { id };
    }

    @Mutation(returns => Project)
    async editTask(@Arg("id") id: string, @Arg("nameTask") descricao: string) {
        await editTask(id, descricao);
        return { id };
    }

    @Mutation(returns => Project)
    async editStatusTask(@Arg("id") id: string) {
        await editStatusTask(id);
        return { id };
    }
}
