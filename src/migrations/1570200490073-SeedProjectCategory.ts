import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class SeedProjectCategory1570200490073 implements MigrationInterface {

    categories = [
        { name: "Personal Project"},
        { name: "Group Project"},
        { name: "Business Project"},
    ]

  public async up(queryRunner: QueryRunner): Promise<any> {
        const categoryRepository = getRepository('project_category');
        await categoryRepository.save(this.categories);
    }

    // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
