import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('drivingLicense', {
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
  register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 25000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    drivingLicense: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, drivingLicense.filename);
  }
}
