import { Controller, Get, Post, Body, Param, UseFilters, HttpCode, HttpException, Patch, ParseUUIDPipe, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { HttpExceptionFilter } from '../middleware/http-exception.filter.ts';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/auth.guard';
import ProfileModel from './models/profile.model';
import { JwtService } from '@nestjs/jwt';
import { UserCreateAddressDto } from './dto/user-create-address.model';
import AddressModel from '../order_management/models/address.model';
import { JoiValidationPipe } from '../middleware/validation-pipe';
import { CreateAddressValidator } from './validators/create-address';
import { CreateAddressDto } from './dto/create-address.model';

@ApiBearerAuth()
@ApiTags('User Management')
@Controller('user-management')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private jwtService: JwtService,
  ) { }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Profile', type: ProfileModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/profile')
  async getProfile(@Req() request: any): Promise<ProfileModel> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      return await this.userManagementService.getMyProfile(decodedToken.user_id);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.error,
          message: error.message,
        },
        error.status,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Address', type: AddressModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Post('/address')
  async createUserAddress(
    @Req() request: any,
    @Body(new JoiValidationPipe(CreateAddressValidator)) createAddressDto: CreateAddressDto,
    ): Promise<AddressModel> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      const userCreateAddressDto: UserCreateAddressDto = new UserCreateAddressDto();
      userCreateAddressDto.user_id = decodedToken.user_id;
      userCreateAddressDto.address = createAddressDto;
      return await this.userManagementService.createAddress(userCreateAddressDto);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.error,
          message: error.message,
        },
        error.status,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Address', type: AddressModel, isArray: true})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/address')
  async getUserAddress(
    @Req() request: any,
    ): Promise<AddressModel[]> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      return await this.userManagementService.getAddressByUserId(decodedToken.user_id);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.error,
          message: error.message,
        },
        error.status,
      );
    }
  }
}
