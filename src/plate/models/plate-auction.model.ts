import { Field, Int, ObjectType } from '@nestjs/graphql';
import Plate from './plate.model';
import { User } from 'src/user/model/user.model';
import { Status } from '@prisma/client';

@ObjectType({
  implements: () => [Plate],
})
export default class PlateAuction implements Plate {
  status: Status;
  user: User;
  combination: string;
  askingPrice: number;
  comments: string;

  @Field(() => Int)
  id: number;

  @Field(() => Boolean, { nullable: true })
  isReserve?: boolean;
}
