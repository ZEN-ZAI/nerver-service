import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity | any> {
    try {
      const userEntity: UserEntity = new UserEntity();
      userEntity.profile = createUserDto.profile;
      userEntity.username = createUserDto.username;
      userEntity.password = createUserDto.password;
      return await this.userRepository.save(userEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneByUserId(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_id: userId } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async remove(userId: string): Promise<DeleteResult> {
    return await this.userRepository.softDelete(userId);
  }

  async delete(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
}
