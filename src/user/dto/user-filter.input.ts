import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateIf,
} from 'class-validator';

@InputType()
export class UserFilterInput {
  @Field(() => Int, { nullable: true })
  @ValidateIf((dto) => typeof dto.status === 'undefined')
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id?: number;

  @Field(() => Status, { nullable: true })
  @ValidateIf((dto) => typeof dto.id === 'undefined')
  @IsNotEmpty()
  @IsEnum(Status)
  status?: Status;
}
