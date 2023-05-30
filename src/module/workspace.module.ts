import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceRepository } from '../repository/workspace.repository';
import { WorkspaceService } from '../service/workspace.service';
import { WorkspaceController } from '../web/rest/workspace.controller';
import { ManagementController } from '../web/rest/management.controller';


@Module({
    imports: [TypeOrmModule.forFeature([WorkspaceRepository])],
    controllers: [WorkspaceController, ManagementController],
    providers: [WorkspaceService],
    exports: [WorkspaceService],
})
export class WorkspaceModule {}
