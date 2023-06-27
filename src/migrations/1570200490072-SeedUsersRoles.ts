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
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user2: User = {
        login: 'user@gmail.com',
        password: '111111',
        firstName: 'Anonymous',
        lastName: 'User',
        email: 'user@gmail.com',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user3: User = {
        login: 'tanthanh@gmail.com',
        password: '111111',
        firstName: 'Thanh',
        lastName: 'Tan',
        email: 'tanthanh@gmail.com',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    // eslint-disable-next-lines
  public async up(queryRunner: QueryRunner): Promise<any> {
        const authorityRepository = getRepository('authority');

        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);

        const userRepository = getRepository('user');

        this.user1.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];

        await Promise.all([this.user1, this.user2, this.user3].map(u => transformPassword(u)));

        await userRepository.save([this.user1, this.user2, this.user3]);
    }

    // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
