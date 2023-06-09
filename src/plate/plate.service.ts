import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import ListingPlateCreateInput from './inputs/listing-plate-create.input';
import { PlatePurpose } from '@prisma/client';

@Injectable()
export class PlateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createListingPlate(
    listingPlateCreateInput: ListingPlateCreateInput,
    userId: number,
  ) {
    const plate = await this.prismaService.plate.create({
      include: {
        ListingPlate: true,
      },
      data: {
        combination: listingPlateCreateInput.combination,
        askingPrice: listingPlateCreateInput.askingPrice,
        comments: listingPlateCreateInput.comments,
        purpose: PlatePurpose.LISTING,
        ListingPlate: {
          create: {
            isOpenForPrice: listingPlateCreateInput.isOpenForPrice,
            settlePrice: listingPlateCreateInput.settlePrice,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return plate;
  }
}
