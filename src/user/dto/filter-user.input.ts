import { Field, InputType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

@InputType()
export default class FilterUserInput {
  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
