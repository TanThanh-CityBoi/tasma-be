import { TaskRepository } from '../repository/task.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    FE_URL = process.env.FE_URL || 'http://localhost:3000/project/board';

    sendMail(data: any) {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || 'smtp.gmail.com',
            service: process.env.SERVICE || 'Gmail',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: Boolean(process.env.SECURE) || true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        });
        const templateSource = fs.readFileSync(data.sourceTemplate);
        const template = Handlebars.compile(templateSource.toString());
        const content = template(data.body);

        transporter.sendMail(
            {
                from: process.env.USER_EMAIL,
                to: data.targetEmail,
                subject: data.subject,
                template: content,
                context: {
                    name: 'Anonymous Coder',
                },
                html: content,
            },
            () => {
                console.log('Email sent');
            },
        );
    }

    updateTaskNotify(data: any) {
        const updateTempalte = path.join(__dirname, '..', 'mail-template/updateTask.hbs');
        this.sendMail({
            targetEmail: data?.targetEmail,
            sourceTemplate: updateTempalte,
            subject: 'Tasma: Task updated',
            body: {
                taskName: data?.taskName,
                reqUser: data?.reqUser,
                url: this.FE_URL + `/${data.projectId || 1}`,
                updateInfo: data?.updateInfo,
            },
        });
    }

    assignedTask(data) {
        const template = path.join(__dirname, '..', 'mail-template/assignTask.hbs');
        this.sendMail({
            targetEmail: data?.targetEmail,
            sourceTemplate: template,
            subject: 'TASMA NOTIFICATION: ASSIGN TASK',
            body: {
                taskName: data.taskName,
                reqUser: data.reqUser,
                url: this.FE_URL + `/${data.projectId || 1}`,
            },
        });
    }

    reporterTask(data) {
        const template = path.join(__dirname, '..', 'mail-template/reporterTask.hbs');
        this.sendMail({
            targetEmail: data?.targetEmail,
            sourceTemplate: template,
            subject: 'TASMA NOTIFICATION: REPORTER TASK',
            body: {
                taskName: data.taskName,
                reqUser: data.reqUser,
                url: this.FE_URL + `/${data.projectId || 1}`,
            },
        });
    }

    inviteProject(data) {
        const template = path.join(__dirname, '..', 'mail-template/inviteProject.hbs');
        this.sendMail({
            targetEmail: data?.targetEmail,
            sourceTemplate: template,
            subject: 'TASMA NOTIFICATION: INVITE TO PROJECT',
            body: {
                projectName: data.projectName,
                reqUser: data.reqUser,
                url: this.FE_URL + `/${data.projectId || 1}`,
            },
        });
    }

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    async expiredTaskNotify() {
        let startDate = new Date();
        startDate.setUTCHours(0, 0, 0, 0);

        let endDate = new Date();
        endDate.setUTCHours(23, 59, 59, 999);

        const taskList: any = await this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('task.usersAssign', 'usersAssign')
            .where('task.dueDate BETWEEN :startDate AND :endDate AND task.status <> :status', {
                startDate,
                endDate,
                status: 'DONE',
            })
            .getMany();

        if (taskList?.length > 0) {
            taskList.forEach(task => {
                task?.usersAssign.forEach(user => {
                    const template = path.join(__dirname, '..', 'mail-template/expiredTask.hbs');
                    this.sendMail({
                        targetEmail: user?.email,
                        sourceTemplate: template,
                        subject: 'TASMA NOTIFICATION: EXPIRED TASK',
                        body: {
                            taskName: task?.name,
                            dueDate: format(new Date(task?.dueDate), 'dd-MM-yyyy / HH:mm'),
                            url: this.FE_URL + `/${task?.project?.id}`,
                        },
                    });
                });
            });
        }
    }
}
