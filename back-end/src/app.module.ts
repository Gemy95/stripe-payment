import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StripeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
