import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserHasAddressDto } from './dto/create-user_has_address.dto';
import { UpdateUserHasAddressDto } from './dto/update-user_has_address.dto';
import { UserHasAddressEntity } from './entity/user_has_address.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class UserHasAddressService {
  constructor(
    @InjectRepository(UserHasAddressEntity)
    private readonly userHasAddressRepository: Repository<UserHasAddressEntity>
  ) { }

  async create(createUserHasAddressDto: CreateUserHasAddressDto): Promise<UserHasAddressEntity | any> {
    try {
      const userHasAddressEntity: UserHasAddressEntity = new UserHasAddressEntity();
      userHasAddressEntity.user = createUserHasAddressDto.user;
      userHasAddressEntity.address = createUserHasAddressDto.address;
      return await this.userHasAddressRepository.save(userHasAddressEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<UserHasAddressEntity[]> {
    return await this.userHasAddressRepository.find();
  }

  async findAllByUserId(userId: string): Promise<UserHasAddressEntity[]> {
    return await this.userHasAddressRepository.find({ where: { user: { user_id: userId } } });
  }

  async findOneByUserHasAddressId(userHasAddressId: string): Promise<UserHasAddressEntity> {
    return await this.userHasAddressRepository.findOne({ where: { user_has_address_id: userHasAddressId } });
  }

  async update(userHasAddressId: string, updateUserHasAddressDto: UpdateUserHasAddressDto) {
    return await this.userHasAddressRepository.update(userHasAddressId, updateUserHasAddressDto);
  }

  async remove(userHasAddressId: string): Promise<DeleteResult> {
    return await this.userHasAddressRepository.softDelete(userHasAddressId);
  }

  async delete(userHasAddressId: string): Promise<DeleteResult> {
    return await this.userHasAddressRepository.delete(userHasAddressId);
  }
}
