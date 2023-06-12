import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export default class City {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
