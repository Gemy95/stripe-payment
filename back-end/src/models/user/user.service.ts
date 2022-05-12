import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtAuthService } from 'src/auth/jwt-auth/jwt-auth.service';

@Injectable()
export class UserService {

    constructor(
        private prismaService: PrismaService,
        private stripeService: StripeService,
        private jwtAuthService: JwtAuthService
      ) {}

      
    async registerNewUser (userData: RegisterUserDto) {
        
      const stripeCustomer = await this.stripeService.createCustomer(userData.name, userData.email);
     
      const hashed_password = await bcrypt.hash(userData.new_password, 10);
      userData['new_password']= hashed_password;

        const newUser = await this.prismaService.user.create({data:{
          name: userData.name,
          email: userData.email,
          password: userData.new_password,
          stripeCustomerId:stripeCustomer.id}});
        
        return newUser;
      }


   
      async loginUser(loginObj:LoginUserDto){

        const checkUserExists = await this.prismaService.user.findFirst({where:{email:loginObj.email}});

       if(!checkUserExists){
            throw new HttpException ("email not exists",HttpStatus.BAD_REQUEST);
       }

       const verfiy_password = await bcrypt.compare(loginObj.password,checkUserExists.password);

       if(!verfiy_password){
            throw new HttpException ("wrong password",HttpStatus.BAD_REQUEST);
       }
       
        delete checkUserExists.password;

        const token= await this.jwtAuthService.checkingUserExistsAndGetToken(checkUserExists);
        
        return {...token, user:checkUserExists};

    }    

}
