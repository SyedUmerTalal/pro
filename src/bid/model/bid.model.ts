import { Field, Float, HideField, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { User } from 'src/user/model/user.model';

@ObjectType()
export default class Bid {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Float, { defaultValue: 0, nullable: true })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  currentBid: number;

  @HideField()
  userId: number;

  @HideField()
  auctionId: number;

  @Field(() => User)
  @IsNotEmpty()
  user: User;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
