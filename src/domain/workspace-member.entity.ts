import { Column, Entity, JoinColumn, ManyToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { User } from "./user.entity";

@Entity('workspace_members')
export class WorkspaceMember extends BaseEntity {
    @Column({ unique: true })
    role: string;  // host, admin, member

    @Column('int', { name: 'user_id', unsigned: true })
    userId: number;

    @ManyToMany(() => User)
    @JoinColumn({name: 'user_id'})
    members?: User[];
}