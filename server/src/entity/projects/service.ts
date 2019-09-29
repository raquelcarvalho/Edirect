import { Project, Task } from "./model";
import dbConn from "../../config/db";

export async function getProjects(user_id: string): Promise<Project[] | null> {
    const projectsId: any = await dbConn
        .select("project_id")
        .from("projects_users")
        .where({ user_id });

    if (!projectsId) {
        return null;
    }

    const projects: any = await dbConn
        .select(
            "p.id",
            "p.name AS product",
            "t.id AS taskId",
            "t.descricao AS task",
            "t.status AS status",
            "t.updated_at AS taskUpdated_at",
            "t.created_at AS taskCreated_at",
        )
        .from("projects AS p")
        .leftJoin("tasks as t", "t.project_id", "p.id")
        .whereIn("p.id", projectsId.map((i: any) => i.project_id));

    let result = projects
        .map((item: any) => item)
        .filter((item: any, i: any, ar: any) => ar.map((i: any) => i.id).indexOf(item.id) === i)
        .sort((a: any, b: any) => a.id - b.id)
        .map((item: any) => {
            let new_list: Task = projects
                .filter((itm: any) => itm.id == item.id)
                .map((itm: any) => {
                    if(!itm.taskId) return 
                    return { id: itm.taskId, descricao: itm.task, updatedAt: itm.taskUpdated_at, createdAt: itm.taskCreated_at, status: itm.status };
                })
                .filter((i: any) => i);

            return { id: item.id, name: item.product, tasks: new_list };
        });

    // fazer front end
    // fazer crud
    // conectar tudo

    return result;
}

export async function createProject(name: string, user_id: string) {
    const projectId = await dbConn.from("projects").insert({name});
    await dbConn.from("projects_users").insert({project_id: projectId[0], user_id})

    return projectId;
}

export async function editProject(id: string, name: string) {
    return await dbConn.from("projects").update({name}).where({id});
}

export async function deleteProject(id: string) {
    await dbConn.del().from("projects_users").where({project_id: id});
    return await dbConn.del().from("projects").where({id});
}

export async function createTask(project_id: string, taskName: string) {
    return await dbConn.from("tasks").insert({
        project_id,
        descricao: taskName,
        created_at: new Date(),
        updated_at: new Date()
    });
}

export async function deleteTask(id: string) {
    return await dbConn.del().from("tasks").where({id});
}

export async function editTask(id: string, descricao: string) {
    return await dbConn.from("tasks").update({descricao}).where({id});
}

export async function editStatusTask(id: string) {
    return await dbConn.from("tasks").update({
        status: 1,
        updated_at: new Date()
    }).where({id});
}