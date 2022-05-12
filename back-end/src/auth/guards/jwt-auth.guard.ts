import {CanActivate,ExecutionContext, HttpException,HttpStatus,Inject,Injectable,UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { verify,decode } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const header = request.header('Authorization');
       
    console.log("request=",request)

    if (!header) {
      throw new HttpException(
        'Authorization: Bearer <token> header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Authorization: Bearer <token> header invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = parts[1];

    let jwtPayload = decode(token);

    if (!jwtPayload) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    if(jwtPayload['exp'] < Date.now()/1000){
        throw new UnauthorizedException('Expired Token');
    }


    try {
    
      jwtPayload = verify(
        token.toString(),
        this.configService.get<string>('JWT_SECRET')
      );

       if(jwtPayload['user']){
          request['user'] = jwtPayload['user'];
       }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
