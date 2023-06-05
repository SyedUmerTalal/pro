import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class HeaderSiteIdentityDto {
  @Expose({ name: 'id' })
  @IsInt()
  siteIdentityId: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  tag: string;

  @Expose()
  @IsString()
  logo: string;

  @Expose()
  @IsString()
  icon: string;
}
