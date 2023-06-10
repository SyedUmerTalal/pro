import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PlatePurpose, Prisma, Status } from '@prisma/client';
import CreateAuctionPlateInput from './inputs/create-auction-plate.input';
import CreateListingPlateInput from './inputs/create-listing-plate.input';
import UpdateStatusPlateInput from './inputs/update-status-plate.input';
import FilterPlateInput from './inputs/filter-plate.input';
import FindPlateInput from './inputs/find-plate.input';
import DeclinePlateInput from './inputs/decline-plate-input';
import ApproveListingPlate from './inputs/approve-listing-plate.input';
import ApproveAuctionPlateInput from './inputs/approve-auction_plate.input';

@Injectable()
export class PlateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createListingPlate(
    createListingPlateInput: CreateListingPlateInput,
    userId: number,
  ) {
    const plateInclude: Prisma.PlateInclude = {
      listingPlate: true,
      user: true,
    };

    const listingPlate: Prisma.PlateCreateWithoutAuctionPlateInput = {
      combination: createListingPlateInput.combination,
      askingPrice: createListingPlateInput.askingPrice,
      comments: createListingPlateInput.comments,
      purpose: PlatePurpose.LISTING,
      listingPlate: {
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
      auctionPlate: true,
      user: true,
    };

    const auctionPlate: Prisma.PlateCreateWithoutListingPlateInput = {
      combination: createAuctionPlateInput.combination,
      askingPrice: createAuctionPlateInput.askingPrice,
      comments: createAuctionPlateInput.comments,
      purpose: PlatePurpose.AUCTION,
      auctionPlate: {
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

  async findAll() {
    const plateInclude: Prisma.PlateInclude = {
      auctionPlate: true,
      listingPlate: true,
      user: true,
    };

    return this.prismaService.plate.findMany({
      include: plateInclude,
    });
  }

  findOne({ findPlateInput }: { findPlateInput: FindPlateInput }) {
    const plateInclude: Prisma.PlateInclude = {
      auctionPlate: true,
      listingPlate: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = findPlateInput;

    return this.prismaService.plate.findUnique({
      include: plateInclude,
      where: plateWhereUniqueInput,
    });
  }

  approveListing({
    approveListingPlateInput,
  }: {
    approveListingPlateInput: ApproveListingPlate;
  }) {
    const plateInclude: Prisma.PlateInclude = {
      listingPlate: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput =
      approveListingPlateInput;

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: Status.APPROVED,
    };

    return this.prismaService.plate.update({
      include: plateInclude,
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }

  decline({ declinePlateInput }: { declinePlateInput: DeclinePlateInput }) {
    const plateInclude: Prisma.PlateInclude = {
      auctionPlate: true,
      listingPlate: true,
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

  approveAuctionPlate({
    approveAuctionPlateInput,
  }: {
    approveAuctionPlateInput: ApproveAuctionPlateInput;
  }) {
    const plateInclude: Prisma.PlateInclude = {
      auctionPlate: true,
      user: true,
    };

    const plateWhereUniqueInput: Prisma.PlateWhereUniqueInput = {
      id: approveAuctionPlateInput.id,
    };

    const plateUpdateInput: Prisma.PlateUpdateInput = {
      status: Status.APPROVED,
      auctionPlate: {
        update: {
          Auction: {
            create: {
              startingPrice: approveAuctionPlateInput.startingPrice,
              endAt: approveAuctionPlateInput.endAt,
            },
          },
        },
      },
    };

    return this.prismaService.plate.update({
      include: plateInclude,
      where: plateWhereUniqueInput,
      data: plateUpdateInput,
    });
  }
}
