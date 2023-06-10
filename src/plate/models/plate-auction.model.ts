import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class PlateAuction {
  @Field(() => Int)
  id: number;

  @Field()
  isReserve: boolean;
}
