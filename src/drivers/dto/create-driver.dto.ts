import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;
}
