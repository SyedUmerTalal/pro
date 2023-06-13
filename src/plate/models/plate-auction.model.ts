import { Field, Int, ObjectType } from '@nestjs/graphql';
import Auction from 'src/auction/model/auction.model';

@ObjectType()
export default class PlateAuction {
  @Field(() => Int)
  id: number;

  @Field()
  isReserve: boolean;

  @Field(() => Auction, { nullable: true })
  auction?: Auction;
}
