import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@InputType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 25 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;
}
