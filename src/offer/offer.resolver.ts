import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OfferService } from './offer.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import CreateOfferInput from './inputs/create-offer.input';
import Offer from './object/offer.object';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import UpdateOfferInput from './inputs/update-offer.input';
import FindOfferInput from './inputs/find-offer.input';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(
    private readonly offerService: OfferService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Offer)
  createOffer(
    @Args('data') createOfferInput: CreateOfferInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.offerService.create(createOfferInput, userId);
  }

  @Mutation(() => Offer)
  updateOffer(
    @Args('where') findOfferInput: FindOfferInput,
    @Args('data') updateOfferInput: UpdateOfferInput,
  ) {
    return this.offerService.update(findOfferInput, updateOfferInput);
  }

  @ResolveField()
  currentOffer(@Parent() offer: Offer) {
    return this.offerService.max({ plateListingId: offer.plateListingId });
  }

  @ResolveField()
  user(@Parent() offer: Offer) {
    return this.userService.findOne({ id: offer.userId });
  }
}
