import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
 
export class CreateChargeDto {
    
  @ApiProperty({default:""})
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
 
  @ApiProperty({default:100})
  @IsNumber()
  amount: number;
}
 