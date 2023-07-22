import { Module, forwardRef } from '@nestjs/common';
import { ManagementController } from '../web/rest/management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from '../repository/project.repository';
import { ProjectController } from '../web/rest/project.controller';
import { ProjectService } from '../service/project.service';
import { NotificationService } from '../service/notification.service';
import { UserModule } from './user.module';
import { TaskRepository } from '../repository/task.repository';
import { TaskModule } from './task.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectRepository]), UserModule, forwardRef(() => TaskModule)],
    controllers: [ProjectController, ManagementController],
    providers: [ProjectService, NotificationService, TaskRepository],
    exports: [ProjectService],
})
export class ProjectModule {}
