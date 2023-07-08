import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
// import updateTemplate from './mail-template/updateTask.hbs';

@Injectable()
export class NotificationService {
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
            targetEmail: 'tanthanhe@gmail.com',
            sourceTemplate: updateTempalte,
            subject: 'Tasma: Task updated',
            body: {
                name: 'task number 1',
                updatedBy: 'tanthanh-cityboi',
            },
        });
    }

    assignedTask(data) {
        const template = path.join(__dirname, '..', 'mail-template/assignTask.hbs');
        this.sendMail({
            targetEmail: 'tanthanhe@gmail.com',
            sourceTemplate: template,
            subject: 'TASMA NOTIFICATION: ASSIGN TASK',
            body: {
                taskName: data.taskName,
                reqUser: data.reqUser,
                url: this.FE_URL + `/${data.projectId || 1}`,
            },
        });
    }
}
