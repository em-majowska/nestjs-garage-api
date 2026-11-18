import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  model?: string;

  @IsInt()
  @Min(1900)
  @Max(2026)
  @IsOptional()
  year?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  mileage?: number;

  @IsInt()
  @IsOptional()
  driverId?: number;
}
