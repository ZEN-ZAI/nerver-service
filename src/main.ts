import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OrderModule } from './persistence/order/order.module';
import { ProductModule } from './persistence/product/product.module';
import { UserModule } from './persistence/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Never Service OpenAPI')
    .setDescription('Never Service API description')
    .setVersion('3.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('User Management')
    .addTag('Order Management')
    .addTag('Product Management')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, AuthenticationModule, UserModule, OrderModule, ProductModule],
  });

  SwaggerModule.setup('open-api', app, document);

  await app.listen(3000);
}
bootstrap();
