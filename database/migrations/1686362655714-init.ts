import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1686362655714 implements MigrationInterface {
    name = 'Init1686362655714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "receiver" character varying NOT NULL, "building_number" character varying NOT NULL, "street" character varying NOT NULL, "subdistrict" character varying NOT NULL, "district" character varying NOT NULL, "province" character varying NOT NULL, "postal_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("profile_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, "bio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_0046bf0859cceb5f1744df2a360" UNIQUE ("name"), CONSTRAINT "UQ_05f10d22d5b33b0d1bf139cde1a" UNIQUE ("image"), CONSTRAINT "UQ_6b88453a21720af07eb78e013d8" UNIQUE ("bio"), CONSTRAINT "PK_b0465dda30314a8786db3354a65" PRIMARY KEY ("profile_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "profile_id" uuid NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "height" character varying NOT NULL, "weight" character varying NOT NULL, "image" character varying NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_644591f7db58f35e1aeb481a30e" UNIQUE ("number"), CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "user_has_address" ("user_has_address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_4ed66c81a130996cc44d5f1588e" PRIMARY KEY ("user_has_address_id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("token_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE ("token"), CONSTRAINT "PK_cab3c454b0419a03584a3990ce0" PRIMARY KEY ("token_id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f07603e96b068aae820d4590270" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_address" ADD CONSTRAINT "FK_3398c4fb06cae7fc88aa39c7472" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_address" ADD CONSTRAINT "FK_704ac31d959a424b0efa542b69e" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "user_has_address" DROP CONSTRAINT "FK_704ac31d959a424b0efa542b69e"`);
        await queryRunner.query(`ALTER TABLE "user_has_address" DROP CONSTRAINT "FK_3398c4fb06cae7fc88aa39c7472"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f07603e96b068aae820d4590270"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_539ede39e518562dfdadfddb492"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "user_has_address"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
