import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  symbol: string ='';

  @IsIn(['BUY', 'SELL'])
  side: 'BUY' | 'SELL' = 'BUY';

  @IsIn(['MARKET', 'LIMIT'])
  type: 'MARKET' | 'LIMIT' = "MARKET";

  @IsNumberString()
  quantity: string ='';

  @IsOptional()
  @IsNumberString()
  price?: string = '';

  @IsOptional()
  @IsString()
  timeInForce?: string;
}
