import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import Plate from 'src/plate/models/plate.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  postCode: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PK')
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  country: string;

  @Field(() => UserStatus)
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus;

  @HideField()
  cityCode: string;

  @HideField()
  countryCode: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  drivingLicense?: string;

  @Field(() => [Plate], { nullable: true })
  @IsArray()
  @IsOptional()
  plates: Plate[];
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
