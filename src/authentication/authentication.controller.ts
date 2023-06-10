import { Controller, Get, Post, Body, Param, UseFilters, HttpCode, HttpException, Patch, ParseUUIDPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { HttpExceptionFilter } from '../middleware/http-exception.filter.ts';
import { JoiValidationPipe } from '../middleware/validation-pipe';
import { CreateUserValidator } from './validators/create-user';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/auth.guard';
import { RegisterUserDto } from './dto/register-user.model';
import TokenModel from './models/token.model';
import { LoginValidator } from './validators/login';
import { LoginDto } from './dto/login.model';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(201)
  @Post('/register')
  async RegisterUser(
    @Body(new JoiValidationPipe(CreateUserValidator)) registerUserDto: RegisterUserDto,
  ): Promise<TokenModel> {
    try {
      return await this.authenticationService.createUser(registerUserDto);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'User is exist'})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/is-user-exist/:username')
  async IsUserExistByUsername(
    @Param('username') username: string,
  ): Promise<boolean> {
    try {
      return await this.authenticationService.IsUserExistByUsername(username);
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

  @ApiResponse({ status: 200, description: 'Login Success'})
  @ApiResponse({ status: 400, description: 'Login Failed'})
  @ApiResponse({ status: 404, description: 'Username Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Post('/login')
  async Login(
    @Body(new JoiValidationPipe(LoginValidator)) loginDto: LoginDto,
  ): Promise<TokenModel> {
    try {
      return await this.authenticationService.login(loginDto);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }
}
