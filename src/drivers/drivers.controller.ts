import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.findOne(id);
  }

  @Get(':id/cars')
  findCars(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.findCars(id);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.remove(id);
  }
}
