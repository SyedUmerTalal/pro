import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../model/user.model';

@InputType()
export class RegisterUserInput extends OmitType(
  User,
  ['city', 'country', 'id', 'status'] as const,
  InputType,
) {
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  cityCode: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  countryCode: string;
}
