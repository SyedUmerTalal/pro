import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class HeaderMenuNavigationDto {
  @Expose({ name: 'id' })
  @IsInt()
  navigationId: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  label: string;

  @Expose()
  @IsString()
  url: string;
}
