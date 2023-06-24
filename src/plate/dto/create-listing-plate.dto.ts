import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export default class CreateListingPlateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  combination: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  askingPrice: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isOpenForPrice: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  settlePrice: number;
}
