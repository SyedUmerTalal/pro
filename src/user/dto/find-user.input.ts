import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Int } from 'type-graphql';

@InputType()
export default class FindUserInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string;
}
