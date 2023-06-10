import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './persistence/token/token.module';
import { AuthGuard } from './middleware/auth.guard';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './persistence/profile/profile.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { UserManagementController } from './user_management/user_management.controller';
import { OrderManagementController } from './order_management/order_management.controller';
import { ProductManagementController } from './product_management/product_management.controller';
import { OrderManagementModule } from './order_management/order_management.module';
import { ProductManagementModule } from './product_management/product_management.module';
import { UserManagementModule } from './user_management/user_management.module';
import { UserModule } from './persistence/user/user.module';
import { AddressModule } from './persistence/address/address.module';
import { OrderModule } from './persistence/order/order.module';
import { ProductModule } from './persistence/product/product.module';
import { UserHasAddressModule } from './persistence/user_has_address/user_has_address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      migrationsRun: false,
    }),
    AuthenticationModule,
    UserManagementModule,
    ProductManagementModule,
    OrderManagementModule,
    AddressModule,
    OrderModule,
    ProductModule,
    ProfileModule,
    TokenModule,
    UserModule,
    UserHasAddressModule,
  ],
  controllers: [AppController, AuthenticationController, UserManagementController, ProductManagementController, OrderManagementController],
  providers: [AppService,  AuthGuard],
})
export class AppModule { }