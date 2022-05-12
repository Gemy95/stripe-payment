import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { StripeService } from 'src/stripe/stripe.service';
import { CreateChargeDto } from './dtos/createChargeDto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from './user.service';

@ApiTags('User APIs')
@Controller()
export class UserController {

    constructor(private userService:UserService, private stripeService:StripeService){
      
    }

    @Post('/user/register')
    async registerUser(@Body(new ValidationPipe({ transform: true })) userObj:RegisterUserDto){
      const data= await this.userService.registerNewUser(userObj);
      return {user:{...data}};
    }


    @Post('/user/login')
    async loginUser(@Body(new ValidationPipe({ transform: true })) loginObj:LoginUserDto){
       const data= await this.userService.loginUser(loginObj);
       return {data,message:"data retrieved successfully"};
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/user/charge')
    async chargeUserOrder(@Body(new ValidationPipe({ transform: true })) charge: CreateChargeDto, @GetUser() user){
      const data= await this.stripeService.charge(charge.amount, charge.paymentMethodId, user.stripeCustomerId);
      return {data};
    }
}
