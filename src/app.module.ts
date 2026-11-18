import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DriversModule } from './drivers/drivers.module';
import { CarsModule } from './cars/cars.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [PrismaModule, DriversModule, CarsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
