import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PageService } from './page.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateHeaderDto } from './dto/update-header.dto';

@Controller('pages')
@ApiTags('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('header')
  async header() {
    return this.pageService.getHeader();
  }

  @Patch('header/:id')
  @ApiBody({ type: UpdateHeaderDto })
  @ApiParam({ name: 'id', required: true })
  updateHeader(
    @Param('id') id: number,
    @Body() updateHeaderDto: UpdateHeaderDto,
  ) {
    return this.pageService.updateHeaderMenu(id, updateHeaderDto);
  }
}
