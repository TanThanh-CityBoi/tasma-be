import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity('workspace')
export class Workspace extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User)
    @JoinTable({name: 'workspace_members'})
    members?: User[];

    @OneToMany(() => Project, project => project.workspace)
    @JoinTable({name: 'workspace_projects'})
    projects?: Project[];
}