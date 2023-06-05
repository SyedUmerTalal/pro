import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { HeaderSiteIdentityDto } from './HeaderSiteIdentityDto';
import { HeaderMenuDto } from './HeaderMenuDto';

export class HeaderDto {
  @Expose({ name: 'id' })
  @IsInt()
  headerId: number;

  @Expose({ name: 'headerSiteIdentity' })
  @Type(() => HeaderSiteIdentityDto)
  siteIdentity: HeaderSiteIdentityDto;

  @Expose({ name: 'headerMenu' })
  @Type(() => HeaderMenuDto)
  menu: HeaderMenuDto;
}
