import { MigrationInterface, QueryRunner } from "typeorm";

export class uuid1671536213194 implements MigrationInterface {
    name = 'uuid1671536213194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
    }

}
