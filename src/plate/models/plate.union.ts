import { createUnionType } from '@nestjs/graphql';
import PlateListing from './plate-listing.model';
import PlateAuction from './plate-auction.model';
import { isDefined } from 'class-validator';

export const PlateUnion = createUnionType({
  name: 'PlateUnion',
  types: () => [PlateListing, PlateAuction] as const,
  resolveType(value) {
    if (isDefined(value.isOpenForPrice)) {
      return 'PlateListing';
    }

    if (isDefined(value.isReserve)) {
      return 'PlateAuction';
    }

    return null;
  },
});
