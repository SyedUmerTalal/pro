import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { PlatePurpose, Prisma } from '@prisma/client';
import FilterPlateInput from '../inputs/filter-plate.input';
import FindPlateInput from '../inputs/find-plate.input';
import CreateAuctionPlateDto from '../dto/create-auction-plate.dto';
import CreateListingPlateDto from '../dto/create-listing-plate.dto';
import UpdatePlateInput from '../inputs/update-plate.input';

@Injectable()
export class PlateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createListingPlate(
    createListingPlateDto: CreateListingPlateDto,
    userId: number,
    numberPlate: string,
  ) {
    const plateInclude: Prisma.PlateInclude = {
      plateListing: true,
    };

    const listingPlate: Prisma.PlateCreateWithoutPlateAuctionInput = {
      combination: createListingPlateDto.combination,
      askingPrice: createListingPlateDto.askingPrice,
      comments: createListingPlateDto.comments,
      numberPlate: numberPlate,
      purpose: PlatePurpose.LISTING,
      plateListing: {
        create: {
          isOpenForPrice: createListingPlateDto.isOpenForPrice,
          settlePrice: createListingPlateDto.settlePrice,
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

  createAuctionPlate({
    createAuctionPlateDto,
    userId,
    numberPlate,
  }: {
    createAuctionPlateDto: CreateAuctionPlateDto;
    userId: number;
    numberPlate: string;
  }) {
    const plateInclude: Prisma.PlateInclude = {
      plateAuction: true,
    };

    const auctionPlate: Prisma.PlateCreateWithoutPlateListingInput = {
      combination: createAuctionPlateDto.combination,
      askingPrice: createAuctionPlateDto.askingPrice,
      comments: createAuctionPlateDto.comments,
      numberPlate: numberPlate,
      purpose: PlatePurpose.AUCTION,
      plateAuction: {
        create: {
          isReserve: createAuctionPlateDto.isReserve,
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
    const plates = await this.prismaService.plate.findMany({
      include: {
        user: true,
        plateListing: {
          include: {
            offers: true,
          },
        },
        plateAuction: {
          include: {
            auction: true,
          },
        },
      },
      where: {
        askingPrice: {
          gte: filterPlateInput.low,
          lte: filterPlateInput.high,
        },
        status: filterPlateInput.status,
        purpose: filterPlateInput.purpose,
        combination: {
          contains: filterPlateInput.term,
        },
      },
    });

    if (filterPlateInput?.characterCount) {
      return plates.filter(
        (plate) => plate.combination.length === filterPlateInput.characterCount,
      );
    }

    if (filterPlateInput?.pattern) {
      const regexComponents = {
        L: '[A-Za-z]',
        N: '[0-9]',
      };

      const regexPattern = `^${filterPlateInput?.pattern
        .split('')
        .map((char) => regexComponents[char] || '')
        .join('')}$`;

      const ppl = plates.filter((plate) =>
        plate.combination.match(regexPattern),
      );
      return ppl;
    }

    return plates;
  }

  findOne({ findPlateInput }: { findPlateInput: FindPlateInput }) {
    return this.prismaService.plate.findUnique({
      where: findPlateInput,
      include: { user: true },
    });
  }

  update(findPlateInput: FindPlateInput, updatePlateInput: UpdatePlateInput) {
    return this.prismaService.plate.update({
      where: findPlateInput,
      data: updatePlateInput,
    });
  }

  delete(findPlateInput: FindPlateInput) {
    return this.prismaService.plate.delete({
      where: { id: findPlateInput.id },
    });
  }
}
