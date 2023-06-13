import { Field, InputType } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

@InputType()
export default class FilterUserInput {
  @Field(() => UserStatus, { nullable: true })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
