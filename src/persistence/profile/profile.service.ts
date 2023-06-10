import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) { }

  async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity | any> {
    try {
      const profileEntity: ProfileEntity = new ProfileEntity();
      profileEntity.name = createProfileDto.name;
      profileEntity.image = createProfileDto.image;
      profileEntity.bio = createProfileDto.bio;
      return await this.profileRepository.save(profileEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<ProfileEntity[]> {
    return await this.profileRepository.find();
  }

  async findOneByProfileId(profileId: string): Promise<ProfileEntity> {
    return await this.profileRepository.findOne({ where: { profile_id: profileId } });
  }

  async update(profileId: string, updateProfileDto: UpdateProfileDto) {
    return await this.profileRepository.update(profileId, updateProfileDto);
  }

  async remove(profileId: string): Promise<DeleteResult> {
    return await this.profileRepository.softDelete(profileId);
  }

  async delete(profileId: string): Promise<DeleteResult> {
    return await this.profileRepository.delete(profileId);
  }
}
