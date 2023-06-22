import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateOfferInput from './inputs/create-offer.input';
import FilterOfferInput from './inputs/filter-offer.input';
import UpdateOfferInput from './inputs/update-offer.input';
import FindOfferInput from './inputs/find-offer.input';
import { off } from 'process';

@Injectable()
export class OfferService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOfferInput: CreateOfferInput, userId: number) {
    return this.prismaService.offer.create({
      data: {
        price: createOfferInput.price,
        plateListingId: createOfferInput.plateListingId,
        userId: userId,
      },
    });
  }

  async findAll(filterOfferInput: FilterOfferInput) {
    const offers = await this.prismaService.offer.findMany({
      where: filterOfferInput,
    });
    return offers;
  }

  async max(filterOfferInput: FilterOfferInput) {
    const offers = await this.prismaService.offer.aggregate({
      _max: {
        price: true,
      },
      where: filterOfferInput,
    });

    return offers._max.price;
  }

  update(findOfferInput: FindOfferInput, updateOfferInput: UpdateOfferInput) {
    return this.prismaService.offer.update({
      where: findOfferInput,
      data: updateOfferInput,
    });
  }
}
