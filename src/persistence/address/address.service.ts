import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from './entity/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>
  ) { }

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity | any> {
    try {
      const addressEntity: AddressEntity = new AddressEntity();
      addressEntity.receiver = createAddressDto.receiver;
      addressEntity.building_number = createAddressDto.building_number;
      addressEntity.street = createAddressDto.street;
      addressEntity.subdistrict = createAddressDto.subdistrict;
      addressEntity.district = createAddressDto.district;
      addressEntity.province = createAddressDto.province;
      addressEntity.postal_code = createAddressDto.postal_code;
      return await this.addressRepository.save(addressEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }

  async findOneByAddressId(addressId: string): Promise<AddressEntity> {
    return await this.addressRepository.findOne({ where: { address_id: addressId } });
  }

  async update(addressId: string, updateAddressDto: UpdateAddressDto) {
    return await this.addressRepository.update(addressId, updateAddressDto);
  }

  async remove(addressId: string): Promise<DeleteResult> {
    return await this.addressRepository.softDelete(addressId);
  }

  async delete(addressId: string): Promise<DeleteResult> {
    return await this.addressRepository.delete(addressId);
  }
}
