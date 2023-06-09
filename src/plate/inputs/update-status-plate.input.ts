import { Field, InputType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Int } from 'type-graphql';

@InputType()
export default class UpdateStatusPlateInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;

  @Field(() => Status)
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
