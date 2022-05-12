import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign,verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from '../../models/user/dtos/user.dto';

@Injectable()
export class JwtAuthService {

  private JWT_SECRET_KEY;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService
  ) {
    this.JWT_SECRET_KEY = this.configService.get<string>('JWT_SECRET');
  }


  async checkingUserExistsAndGetToken(userDto:UserDto): Promise<any> {
    try {

      const accessToken = sign(
        {
          user: userDto,
        },
          this.JWT_SECRET_KEY,
        // {
        //   expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
        // },
      );

      return { accessToken } ;

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  


}