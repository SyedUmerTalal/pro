import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateIf,
} from 'class-validator';

@ObjectType()
export default class PlateListing {
  @Field({ nullable: true })
  @ValidateIf((dto) => typeof dto.settlePrice === 'undefined')
  @IsNotEmpty()
  @IsBoolean()
  isOpenForPrice?: boolean;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @ValidateIf((dto) => typeof dto.isOpenForPrice === 'undefined')
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  settlePrice?: number;
}
