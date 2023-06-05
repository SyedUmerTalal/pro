import { PartialType } from '@nestjs/swagger';
import { HeaderDto } from './header.dto';

export class UpdateHeaderDto extends PartialType(HeaderDto) {}
