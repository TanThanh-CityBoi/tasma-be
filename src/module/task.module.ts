import { Module } from '@nestjs/common';
import { ManagementController } from '../web/rest/management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '../repository/task.repository';
import { TaskController } from '../web/rest/task.controller';
import { TaskService } from '../service/task.service';
import { CommentModule } from './comment.module';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository]), CommentModule, UserModule],
    controllers: [TaskController, ManagementController],
    providers: [TaskService, NotificationService],
    exports: [TaskService],
})
export class TaskModule {}
