import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed9686353049195 implements MigrationInterface {
    name = '9686353049195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "product" ("number", "name", "type", "height", "weight", "image", "price")
        VALUES 
          (1, 'Product A', 'Type A', '10cm', '200g', 'https://example.com/product_a.jpg', 9.99),
          (2, 'Product B', 'Type B', '15cm', '300g', 'https://example.com/product_b.jpg', 14.99),
          (3, 'Product C', 'Type A', '12cm', '250g', 'https://example.com/product_c.jpg', 12.99);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
