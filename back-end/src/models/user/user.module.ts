import { Module } from '@nestjs/common';
import { JwtAuthModule } from 'src/auth/jwt-auth/jwt-auth.module';
import { PrismaService } from 'src/prisma.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [StripeModule,JwtAuthModule],
  controllers: [UserController],
  providers: [UserService,PrismaService]
})
export class UserModule {}
