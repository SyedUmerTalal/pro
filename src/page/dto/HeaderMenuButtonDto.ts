import { Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class HeaderMenuButtonDto {
  @Expose({ name: 'id' })
  @IsInt()
  buttonId: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  text: string;

  @Expose()
  @IsString()
  url: string;

  @Expose()
  @IsBoolean()
  isEnable: boolean;
}
