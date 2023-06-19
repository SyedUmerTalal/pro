import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import CreateAuctionPlateDto from './dto/create-auction-plate.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PlateService } from './services/plate.service';
import CreateListingPlateDto from './dto/create-listing-plate.dto';

@Controller('plates')
export class PlateController {
  constructor(private readonly plateService: PlateService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auction-plate')
  @UseInterceptors(
    FileInterceptor('numberPlate', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (_req, file, cb) {
          cb(
            null,
            file.fieldname + '-' + Date.now() + extname(file.originalname),
          );
        },
      }),
    }),
  )
  createPlateAuction(
    @Body() createAuctionPlateDto: CreateAuctionPlateDto,
    @CurrentUser('userId') userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 25 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    numberPlate: Express.Multer.File,
  ) {
    return this.plateService.createAuctionPlate({
      createAuctionPlateDto: createAuctionPlateDto,
      numberPlate: numberPlate.filename,
      userId: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('listing-plate')
  @UseInterceptors(
    FileInterceptor('numberPlate', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (_req, file, cb) {
          cb(
            null,
            file.fieldname + '-' + Date.now() + extname(file.originalname),
          );
        },
      }),
    }),
  )
  createPlateListing(
    @Body() createListingPlateDto: CreateListingPlateDto,
    @CurrentUser('userId') userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 25 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    numberPlate: Express.Multer.File,
  ) {
    return this.plateService.createListingPlate(
      createListingPlateDto,
      userId,
      numberPlate.filename,
    );
  }
}
