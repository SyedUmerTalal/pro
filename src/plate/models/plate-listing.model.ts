import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import Plate from './plate.model';
import {
  ValidateIf,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { User } from 'src/user/model/user.model';
import { Status } from '@prisma/client';

@ObjectType({
  implements: () => [Plate],
})
export default class PlateListing implements Plate {
  status: Status;
  user: User;
  combination: string;
  askingPrice: number;
  comments: string;

  @Field(() => Int)
  readonly id: number;

  @Field(() => Boolean, { nullable: true })
  @ValidateIf((dto) => typeof dto.settlePrice === 'undefined')
  @IsNotEmpty()
  @IsBoolean()
  readonly isOpenForPrice?: boolean | null;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @ValidateIf((dto) => typeof dto.isOpenForPrice === 'undefined')
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  settlePrice?: number;
}
