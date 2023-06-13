import { InputType, PartialType, PickType } from '@nestjs/graphql';
import CreateOfferInput from './create-offer.input';

@InputType()
export default class FilterOfferInput extends PartialType(
  PickType(CreateOfferInput, ['plateListingId'] as const),
) {}
