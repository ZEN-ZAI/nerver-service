import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers['authorization'];
      const accessToken = authHeader.split(' ')[1];
      
      const token: any = this.jwtService.verify(accessToken);
      const expirationTimestamp = token.exp * 1000; 
      return Date.now() <= expirationTimestamp ? true: false;
    } catch (error) {
      throw new UnauthorizedException({message: 'Authorization Required' });
    }
  }
}