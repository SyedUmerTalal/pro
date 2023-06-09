import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/args/pagination.args';

@InputType()
export class CountryArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  countryCode?: string;
}
