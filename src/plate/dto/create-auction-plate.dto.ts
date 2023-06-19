import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export default class CreateAuctionPlateDto {
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
  isReserve: boolean;
}
