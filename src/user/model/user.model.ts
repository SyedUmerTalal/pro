import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { City, Status } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Country } from 'src/country/entities/country.entity';

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
  cityName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  countryName: string;

  @Field(() => Status)
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @HideField()
  country: Country;

  @HideField()
  city: City;
}

registerEnumType(Status, {
  name: 'Status',
});
