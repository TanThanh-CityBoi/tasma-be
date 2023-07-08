import { Module } from '@nestjs/common';
import { ManagementController } from '../web/rest/management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '../repository/task.repository';
import { TaskController } from '../web/rest/task.controller';
import { TaskService } from '../service/task.service';
import { CommentModule } from './comment.module';
import { NotificationService } from '../service/notification.service';
import { UserModule } from './user.module';
import { ProjectModule } from './project.module';
import { ProjectService } from '../service/project.service';
import { ProjectRepository } from '../repository/project.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository]), CommentModule, UserModule, ProjectModule],
    controllers: [TaskController, ManagementController],
    providers: [TaskService, NotificationService],
    exports: [TaskService],
})
export class TaskModule {}
