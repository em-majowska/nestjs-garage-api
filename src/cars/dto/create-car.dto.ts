import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(2026)
  year: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  mileage?: number;

  @IsInt()
  driverId: number;
}
