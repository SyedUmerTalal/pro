import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { PlatePurpose, Prisma, Status } from '@prisma/client';
import CreateAuctionPlateInput from './inputs/create-auction-plate.input';
import CreateListingPlateInput from './inputs/create-listing-plate.input';
import FindPlateInput from './inputs/find-plate.input';
import DeclinePlateInput from './inputs/decline-plate-input';
import ApproveListingPlate from './inputs/approve-listing-plate.input';
import ApproveAuctionPlateInput from './inputs/approve-auction_plate.input';
import FilterPlateInput from './inputs/filter-plate.input';
import CreateAuctionInput from './inputs/create-auction.input';

@Injectable()
export class PlateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createListingPlate(
    createListingPlateInput: CreateListingPlateInput,
    userId: number,
  ) {
    const plateInclude: Prisma.PlateInclude = {
      plateListing: true,
      user: true,
    };

    const listingPlate: Prisma.PlateCreateWithoutPlateAuctionInput = {
      combination: createListingPlateInput.combination,
      askingPrice: createListingPlateInput.askingPrice,
      comments: createListingPlateInput.comments,
      purpose: PlatePurpose.LISTING,
      plateListing: {
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
      plateAuction: true,
      user: true,
    };

    const auctionPlate: Prisma.PlateCreateWithoutPlateListingInput = {
      combination: createAuctionPlateInput.combination,
      askingPrice: createAuctionPlateInput.askingPrice,
      comments: createAuctionPlateInput.comments,
      purpose: PlatePurpose.AUCTION,
      plateAuction: {
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

  async findAll(filterPlateInput: FilterPlateInput) {
    return this.prismaService.plate.findMany({ where: filterPlateInput });
  }

  findOne({ findPlateInput }: { findPlateInput: FindPlateInput }) {
    return this.prismaService.plate.findUnique({
      where: findPlateInput,
    });
  }

  approveListing(findPlateInput: FindPlateInput) {
    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = findPlateInput;

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: Status.APPROVED,
    };

    return this.prismaService.plate.update({
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }

  decline({ declinePlateInput }: { declinePlateInput: DeclinePlateInput }) {
    const plateInclude: Prisma.PlateInclude = {
      plateAuction: true,
      plateListing: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput =
      declinePlateInput;

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: Status.DECLINE,
    };

    return this.prismaService.plate.update({
      include: plateInclude,
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }

  approveAuctionPlate(
    findPlateInput: FindPlateInput,
    createAuctionInput: CreateAuctionInput,
  ) {
    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = findPlateInput;

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: Status.APPROVED,
      plateAuction: {
        update: {
          Auction: {
            create: createAuctionInput,
          },
        },
      },
    };

    return this.prismaService.plate.update({
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }
}
