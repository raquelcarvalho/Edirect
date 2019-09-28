import { ObjectType, Field } from "type-graphql";

export interface IProject {
    id: string;
    name?: string;
}

export interface IProjectUser {
    id: string;
    project_id: string;
    user_id: string;
}

export interface ITask {
    id: string;
    project_id: string;
    descricao: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

@ObjectType()
export class Project {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field(type => [Task], { nullable: true })
    tasks?: Task[];

    constructor(project: IProject) {
        this.id = project.id;
        this.name = project.name;
    }
}

@ObjectType()
export class Task {
    @Field()
    id: string;

    @Field()
    projectId: string;

    @Field()
    descricao: string;

    @Field()
    status: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    constructor(task: ITask) {
        this.id = task.id;
        this.projectId = task.project_id;
        this.descricao = task.descricao;
        this.createdAt = task.created_at;
        this.updatedAt = task.updated_at;
    }
}