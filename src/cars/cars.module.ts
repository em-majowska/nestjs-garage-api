import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [DriversModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
