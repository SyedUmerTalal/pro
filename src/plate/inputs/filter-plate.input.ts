import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { PlatePurpose, PlateStatus } from '@prisma/client';

@InputType()
export default class FilterPlateInput {
  @Field(() => PlateStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PlateStatus)
  readonly status?: PlateStatus;

  @Field(() => PlatePurpose, { nullable: true })
  @IsOptional()
  @IsEnum(PlatePurpose)
  readonly purpose?: PlatePurpose;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly low?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly high?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly characterCount: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly term: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly pattern: string;
}
