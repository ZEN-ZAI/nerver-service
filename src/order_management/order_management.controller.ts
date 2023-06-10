import { Controller, Get, Post, Body, Param, UseFilters, HttpCode, HttpException, Patch, ParseUUIDPipe, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { OrderManagementService } from './order_management.service';
import { HttpExceptionFilter } from '../middleware/http-exception.filter.ts';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/auth.guard';
import { JoiValidationPipe } from '../middleware/validation-pipe';
import { CreateOrderValidator } from './validators/create-user';
import { UserCreateOrderDto } from './dto/user-create-order.model';
import OrderModel from './models/order.model';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@ApiTags('Order Management')
@Controller('order-management')
export class OrderManagementController {
  constructor(
    private readonly orderManagementService: OrderManagementService,
    private jwtService: JwtService,
  ) { }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Order', type: OrderModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Post('/order')
  async createOrder(
    @Req() request: any,
    @Body(new JoiValidationPipe(CreateOrderValidator)) userCreateOrderDto: UserCreateOrderDto,
  ): Promise<OrderModel> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      userCreateOrderDto.user_id = decodedToken.user_id;
      return await this.orderManagementService.createOrder(userCreateOrderDto);
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
  @ApiResponse({ status: 200, description: 'Order', type: OrderModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/cancel/:orderId')
  async cancelOrder(
    @Req() request: any,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<OrderModel> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      return await this.orderManagementService.cancelOrderByUserIdAndOrderId(decodedToken.user_id, orderId);
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
  @ApiResponse({ status: 200, description: 'Order', type: OrderModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/detial/:orderId')
  async getOrderDetial(
    @Req() request: any,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    ): Promise<OrderModel> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      return await this.orderManagementService.getOrderByUserIdAndOrderId(decodedToken.user_id, orderId);
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
  @ApiResponse({ status: 200, description: 'Order', type: OrderModel, isArray: true})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/history')
  async getUserHistory(
    @Req() request: any,
    ): Promise<OrderModel[]> {
    try {
      const token: string = request.headers.authorization.split(' ')[1];
      const decodedToken: any = this.jwtService.decode(token);
      return await this.orderManagementService.getAllOrderByUser(decodedToken.user_id);
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
