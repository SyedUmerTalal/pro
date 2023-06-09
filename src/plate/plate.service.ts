import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PlatePurpose, Prisma } from '@prisma/client';
import CreateAuctionPlateInput from './inputs/create-auction-plate.input';
import CreateListingPlateInput from './inputs/create-listing-plate.input';
import UpdateStatusPlateInput from './inputs/update-status-plate.input';
import FilterPlateInput from './inputs/filter-plate.input';

@Injectable()
export class PlateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createListingPlate(
    createListingPlateInput: CreateListingPlateInput,
    userId: number,
  ) {
    const plateInclude: Prisma.PlateInclude = {
      ListingPlate: true,
    };

    const listingPlate: Prisma.PlateCreateWithoutAuctionPlateInput = {
      combination: createListingPlateInput.combination,
      askingPrice: createListingPlateInput.askingPrice,
      comments: createListingPlateInput.comments,
      purpose: PlatePurpose.LISTING,
      ListingPlate: {
        create: {
          isOpenForPrice: createListingPlateInput.isOpenForPrice,
          settlePrice: createListingPlateInput.settlePrice,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.prismaService.plate.create({
      include: plateInclude,
      data: listingPlate,
    });
  }

  createAuctionPlate(
    createAuctionPlateInput: CreateAuctionPlateInput,
    userId: number,
  ) {
    const plateInclude: Prisma.PlateInclude = {
      AuctionPlate: true,
    };

    const auctionPlate: Prisma.PlateCreateWithoutListingPlateInput = {
      combination: createAuctionPlateInput.combination,
      askingPrice: createAuctionPlateInput.askingPrice,
      comments: createAuctionPlateInput.comments,
      purpose: PlatePurpose.AUCTION,
      AuctionPlate: {
        create: {
          isReserve: createAuctionPlateInput.isReserve,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.prismaService.plate.create({
      include: plateInclude,
      data: auctionPlate,
    });
  }

  findAll(filterPlateInput: FilterPlateInput) {
    const plateInclude: Prisma.PlateInclude = {
      AuctionPlate: true,
      ListingPlate: true,
      user: true,
    };

    const plateWhereInput: Prisma.PlateWhereInput = {
      status: filterPlateInput.status,
    };

    return this.prismaService.plate.findMany({
      include: plateInclude,
      where: plateWhereInput,
    });
  }

  findOne(id: number) {
    const plateInclude: Prisma.PlateInclude = {
      AuctionPlate: true,
      ListingPlate: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = {
      id: id,
    };

    return this.prismaService.plate.findUnique({
      include: plateInclude,
      where: plateWhereUniqueInput,
    });
  }

  updateStatus(updateStatusPlateInput: UpdateStatusPlateInput) {
    const plateInclude: Prisma.PlateInclude = {
      AuctionPlate: true,
      ListingPlate: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = {
      id: updateStatusPlateInput.id,
    };

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: updateStatusPlateInput.status,
    };

    return this.prismaService.plate.update({
      include: plateInclude,
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }
}
