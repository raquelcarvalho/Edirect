import { MiddlewareFn } from "type-graphql";

export const verifyProjectId: MiddlewareFn = async ({ root, args, context, info }, next) => {
    // const { user } = context.state;
    // const { projectId } = args;
    // if (projectId && !user) {
    //     return;
    // } else if (projectId && user.projects) {
    //     return user.projects.includes(args.projectId) ? next() : undefined;
    // }
    return next();
};
