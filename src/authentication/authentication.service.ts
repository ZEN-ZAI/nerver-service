import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../persistence/user/user.service';
import { TokenService } from '../persistence/token/token.service';
import { UserEntity } from '../persistence/user/entity/user.entity';
import { CreateUserDto } from '../persistence/user/dto/create-user.dto';
import TokenModel from './models/token.model';
import { CreateProfileDto } from '../persistence/profile/dto/create-profile.dto';
import { ProfileService } from '../persistence/profile/profile.service';
import { ProfileEntity } from '../persistence/profile/entity/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from '../persistence/token/dto/create-token.dto';
import { TokenEntity } from '../persistence/token/entity/token.entity';
import { RegisterUserDto } from './dto/register-user.model';
import { LoginDto } from './dto/login.model';
import { hashPassword } from '../../utils/hash';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) { }

  async IsUserExistByUsername(username: string): Promise<boolean> {
    const userEntity: UserEntity = await this.userService.findOneByUsername(username);

    if (!userEntity) {
      throw new NotFoundException('user not found');
    }

    return true;
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<TokenModel> {
    const createProfileDto: CreateProfileDto = new CreateProfileDto();
    createProfileDto.name = registerUserDto.username;
    createProfileDto.bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    createProfileDto.image = '';

    const profileEntity: ProfileEntity = await this.profileService.create(createProfileDto);
    
    const createUserDto: CreateUserDto = new CreateUserDto();
    createUserDto.profile = profileEntity;
    createUserDto.username = registerUserDto.username;
    createUserDto.password = hashPassword(registerUserDto.password);

    const userEntity: UserEntity = await this.userService.create(createUserDto);

    return await this.createToken(userEntity);
  }

  async login(loginDto: LoginDto): Promise<TokenModel> {
    const userEntity: UserEntity = await this.userService.findOneByUsername(loginDto.username);

    if (!userEntity) {
      throw new NotFoundException('Username Not Found');
    }

    if (userEntity.password === hashPassword(loginDto.password)) {
      return await this.createToken(userEntity);
    } else {
      throw new BadRequestException('Login Failed');
    }

  }

  async createToken(userEntity: UserEntity): Promise<TokenModel> {
    const payload = {  user_id: userEntity.user_id, username: userEntity.username };
    const accessToken: string = await this.jwtService.signAsync(payload);
    
    const createTokenDto: CreateTokenDto = new CreateTokenDto();
    createTokenDto.user = userEntity;
    createTokenDto.token = accessToken;
    createTokenDto.expire_at = new Date(this.getExpirationDate(accessToken) * 1000);

    const tokenEntity: TokenEntity = await this.tokenService.create(createTokenDto);

    return new TokenModel({
      access_token: tokenEntity.token,
    })
  }

  getExpirationDate(token: string): number | null {
    const decodedToken: any = this.jwtService.decode(token);
    if (decodedToken && decodedToken.exp) {
      return Number(decodedToken.exp);
    }
    return null;
  }
}
