import { IsMACAddress, IsString, MinLength } from 'class-validator';

export class KeyDto {
  @IsString()
  @MinLength(10)
  apiKey: string = '';

  @IsString()
  @MinLength(10)
  secretKey: string = '';
}
