import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { ProjectCategory } from "./project-category.entity";
import { Task } from "./task.entity";
import { User } from "./user.entity";
import { Workspace } from "./workspace.entity";

@Entity('project')
export class Project extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column("longtext")
    url?: string;

    @Column("longtext")
    description?: string;

    @ManyToOne(() => ProjectCategory, projectCategory => projectCategory.projects)
    projectCategory: ProjectCategory;

    @ManyToMany(() => User)
    @JoinTable({name: 'project_members'})
    members?: User[];

    @ManyToOne(() => Workspace, workspace => workspace.projects)
    workspace: Workspace;

    @OneToMany(() => Task, task => task.project)
    tasks?: Task[];
}