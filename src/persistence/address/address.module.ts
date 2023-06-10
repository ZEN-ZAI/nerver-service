import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}