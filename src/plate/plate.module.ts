import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateResolver } from './plate.resolver';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  providers: [PlateResolver, PlateService, PrismaService],
})
export class PlateModule {}
