import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { DriversService } from '../drivers/drivers.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(
    private readonly driversService: DriversService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createCarDto: CreateCarDto) {
    await this.driversService.findOne(createCarDto.driverId);

    return this.prisma.car.create({
      data: createCarDto,
      include: { driver: { select: { id: true, name: true } } },
    });
  }

  findAll(brand?: string) {
    return this.prisma.car.findMany({
      where: brand
        ? { brand: { contains: brand, mode: 'insensitive' } }
        : undefined,
      include: { driver: { select: { id: true, name: true } } },
    });
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: { driver: true },
    });

    if (!car) {
      throw new NotFoundException(`Voiture non trouvée.`);
    }

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    await this.findOne(id);

    const payload: any = {};

    if (updateCarDto.brand !== undefined) payload.brand = updateCarDto.brand;
    if (updateCarDto.mileage !== undefined)
      payload.mileage = updateCarDto.mileage;
    if (updateCarDto.model !== undefined) payload.model = updateCarDto.model;
    if (updateCarDto.year !== undefined) payload.year = updateCarDto.year;

    return this.prisma.car.update({
      where: { id },
      data: payload,
      include: { driver: { select: { id: true, name: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.car.delete({ where: { id } });
  }
}
