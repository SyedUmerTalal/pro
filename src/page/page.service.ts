import { Injectable } from '@nestjs/common';
import { TransformPlainToInstance } from 'class-transformer';
import { PrismaService } from 'src/common/prisma.service';
import { HeaderDto } from './dto/header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Injectable()
export class PageService {
  constructor(private readonly prismaService: PrismaService) {}

  @TransformPlainToInstance(HeaderDto, { excludeExtraneousValues: true })
  async getHeader() {
    return this.prismaService.header.findFirst({
      include: {
        headerSiteIdentity: true,
        headerMenu: {
          include: {
            navigations: true,
            buttons: true,
          },
        },
      },
    });
  }

  async updateHeaderMenu(id: number, updateHeaderDto: UpdateHeaderDto) {
    return this.prismaService.header.findFirst();
  }
}
