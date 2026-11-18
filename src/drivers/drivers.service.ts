import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    // const driver = await this.prisma.driver.findUnique({
    //   where: { licenseNumber: createDriverDto.licenseNumber },
    // });

    // if (driver) {
    //   throw new ConflictException(
    //     'Le conducteur avec ce numéro de permis existe déjà.',
    //   );
    // }
    try {
      return this.prisma.driver.create({ data: createDriverDto });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Le conducteur avec ce numéro de permis existe déjà.',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { cars: true },
    });

    if (!driver) {
      throw new NotFoundException(`Le conducteur non trouvé.`);
    }

    return driver;
  }

  async findCars(id: number) {
    // const driver = await this.findOne(id);
    // return driver.cars;
    await this.findOne(id);
    return this.prisma.car.findMany({ where: { driverId: id } });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    await this.findOne(id);

    try {
      const payload: any = {};
      if (updateDriverDto.licenseNumber !== undefined)
        payload.licenseNumber = updateDriverDto.licenseNumber;
      if (updateDriverDto.name !== undefined)
        payload.name = updateDriverDto.name;

      return this.prisma.driver.update({ where: { id }, data: payload });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Le conducteur avec ce numéro de permis existe déjà.',
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    const driver = await this.findOne(id);

    if (driver.cars.length > 0) {
      throw new BadRequestException(
        `Impossible de supprimer le conducteur qui a encore des voitures.`,
      );
    }

    return this.prisma.driver.delete({ where: { id } });
  }
}
