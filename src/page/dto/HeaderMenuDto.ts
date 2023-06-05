import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';
import { HeaderMenuButtonDto } from './HeaderMenuButtonDto';
import { HeaderMenuNavigationDto } from './HeaderMenuNavigationDto';

export class HeaderMenuDto {
  @Expose({ name: 'id' })
  @IsInt()
  menuId: number;

  @Expose()
  @IsArray()
  @Type(() => HeaderMenuNavigationDto)
  navigations: HeaderMenuNavigationDto[];

  @Expose()
  @IsArray()
  @Type(() => HeaderMenuButtonDto)
  buttons: HeaderMenuButtonDto[];
}
