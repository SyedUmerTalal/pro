import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export default class PlateListingService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.plateListing.findMany();
  }

  findOne(id: number) {
    return this.prismaService.plateListing.findUnique({ where: { id: id } });
  }
}
