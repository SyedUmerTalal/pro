import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export default class PlateAuctionService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(id: number) {
    return this.prismaService.plateAuction.findUnique({ where: { id: id } });
  }
}
