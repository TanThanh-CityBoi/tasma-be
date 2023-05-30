import { Workspace } from '../domain/workspace.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> {}
