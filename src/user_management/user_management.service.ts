import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../persistence/user/user.service';
import { TokenService } from '../persistence/token/token.service';
import { UserEntity } from '../persistence/user/entity/user.entity';
import { CreateUserDto } from '../persistence/user/dto/create-user.dto';
import TokenModel from './models/profile.model';
import { CreateProfileDto } from '../persistence/profile/dto/create-profile.dto';
import { ProfileService } from '../persistence/profile/profile.service';
import { ProfileEntity } from '../persistence/profile/entity/profile.entity';
import ProfileModel from './models/profile.model';
import { UserCreateAddressDto } from './dto/user-create-address.model';
import { AddressService } from '../persistence/address/address.service';
import { UserHasAddressService } from '../persistence/user_has_address/user_has_address.service';
import { CreateAddressDto } from '../persistence/address/dto/create-address.dto';
import { AddressEntity } from '../persistence/address/entity/address.entity';
import { CreateUserHasAddressDto } from '../persistence/user_has_address/dto/create-user_has_address.dto';
import AddressModel from '../order_management/models/address.model';
import { UserHasAddressEntity } from '../persistence/user_has_address/entity/user_has_address.entity';

@Injectable()
export class UserManagementService {
  constructor(
    private addressService: AddressService,
    private userHasAddressService: UserHasAddressService,
    private userService: UserService,
    private profileService: ProfileService,
  ) { }

  async getMyProfile(user_id: string): Promise<ProfileModel> {
    const userEntity: UserEntity = await this.userService.findOneByUserId(user_id);

    if (!userEntity) {
      throw new NotFoundException('user not found');
    }

    const profileEntity: ProfileEntity = await this.profileService.findOneByProfileId(userEntity.profile.profile_id);

    return new ProfileModel({
      name: profileEntity.name,
      image: profileEntity.image,
      bio: profileEntity.bio,
    });
  }

  async createAddress(userCreateAddressDto: UserCreateAddressDto): Promise<AddressModel> {
    const createAddressDto: CreateAddressDto = new CreateAddressDto();
    createAddressDto.building_number = userCreateAddressDto.address.building_number;
    createAddressDto.district = userCreateAddressDto.address.district;
    createAddressDto.postal_code = userCreateAddressDto.address.postal_code;
    createAddressDto.province = userCreateAddressDto.address.province;
    createAddressDto.receiver = userCreateAddressDto.address.receiver;
    createAddressDto.street = userCreateAddressDto.address.street;
    createAddressDto.subdistrict = userCreateAddressDto.address.subdistrict;
    
    const addressEntity: AddressEntity = await this.addressService.create(createAddressDto);

    const createUserHasAddressDto: CreateUserHasAddressDto = new CreateUserHasAddressDto();
    createUserHasAddressDto.user = await this.userService.findOneByUserId(userCreateAddressDto.user_id);
    createUserHasAddressDto.address = addressEntity;

    const userHasAddressEntity: UserHasAddressEntity = await this.userHasAddressService.create(createUserHasAddressDto);

    return AddressModel.fromAddressEntity(userHasAddressEntity.address);
  }

  async getAddressByUserId(user_id: string): Promise<AddressModel[]> {
    const userHasAddressEntitire: UserHasAddressEntity[] = await this.userHasAddressService.findAllByUserId(user_id);

    return AddressModel.fromAddressEntities(userHasAddressEntitire.map(e => e.address));
  }
}
