//import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, Matches, IsEnum, IsOptional, IsDate} from 'class-validator';
import { Match } from 'src/decorators/match';


export class RegisterUserDto {

    @ApiProperty({default:""})
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({default:""})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({default:""})
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+|\?~=.-])(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+|\?~=.-]{8,}$/,
     { message: 'incorrect new password' })
    new_password:string;

    
    @ApiProperty({default:""})
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+|\?~=.-])(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+|\?~=.-]{8,}$/,
     { message: 'incorrect confirm password' })
    @Match('new_password',{"message":"new passwords don't match"})
    confirm_password:string;

    
    //@ApiProperty({default:""})
    // @IsString()
    // @IsOptional()
    // stripeCustomerId?:string;

}
