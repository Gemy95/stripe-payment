//import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, Matches, IsEnum, IsOptional, IsDate} from 'class-validator';


export class UserDto {

    @ApiProperty({default:""})
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({default:""})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    // @ApiProperty({default:""})
    // @IsString()
    // @IsNotEmpty()
    // @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+|\?~=.-])(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+|\?~=.-]{8,}$/,
    //  { message: 'incorrect new password' })
    // password:string;

    @ApiProperty({default:""})
    @IsString()
    @IsNotEmpty()
    stripeCustomerId:string;

}
