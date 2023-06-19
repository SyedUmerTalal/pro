import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBooleanString } from 'class-validator';
import Auction from 'src/auction/model/auction.model';

@ObjectType()
export default class PlateAuction {
  @Field(() => Int)
  id: number;

  @Field()
  @IsBooleanString()
  isReserve: boolean;

  @Field(() => Auction, { nullable: true })
  auction?: Auction;
}
