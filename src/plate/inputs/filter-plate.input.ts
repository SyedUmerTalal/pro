import { Field, InputType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export default class FilterPlateInput {
  @Field(() => Status)
  @IsEnum(Status)
  @IsNotEmpty()
  readonly status: Status;
}
