import {
    Field,
    InputType,
    OmitType,
    PartialType,
    PickType,
  } from '@nestjs/graphql';
  import { IsNotEmpty, IsString } from 'class-validator';
  import { User } from '../model/user.model';
  import { Country } from 'src/country/model/country.model';
  
  @InputType()
  export class UpdateUserInput extends PartialType(
    PickType(
      User,
      ['firstName', 'lastName', 'streetAddress', 'postCode', 'state'] as const,
      InputType,
    ),
  ) {}
  