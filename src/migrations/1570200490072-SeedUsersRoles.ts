import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { transformPassword } from '../security';
import { Authority } from '../domain/authority.entity';

export class SeedUsersRoles1570200490072 implements MigrationInterface {
    role1: Authority = { name: 'ROLE_ADMIN' };

    role2: Authority = { name: 'ROLE_USER' };

    user1: User = {
        login: 'tasma@gmail.com',
        password: '111111',
        firstName: 'Tasma',
        lastName: 'Admin',
        email: 'tasma@gmail.com',
        imageUrl: '/avatars/avatar-1.jpg',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user2: User = {
        login: 'tanthanhe@gmail.com',
        password: '111111',
        firstName: 'Tan Thanh E',
        lastName: 'Nguyen',
        email: 'tanthanhe@gmail.com',
        imageUrl: '/avatars/avatar-2.jpg',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user3: User = {
        login: '19522239@gm.uit.edu.vn',
        password: '111111',
        firstName: 'Tan Thanh',
        lastName: 'Nguyen',
        email: '19522239@gm.uit.edu.vn',
        imageUrl: '/avatars/avatar-3.jpg',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    // eslint-disable-next-lines
    public async up(queryRunner: QueryRunner): Promise<any> {
        // user role
        const authorityRepository = getRepository('authority');

        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);

        // user info
        const userRepository = getRepository('user');

        this.user1.authorities = [adminRole, userRole];
        this.user2.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];

        await Promise.all([this.user1, this.user2, this.user3].map(u => transformPassword(u)));

        await userRepository.save([this.user1, this.user2, this.user3]);
    }

    // eslint-disable-next-line
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
