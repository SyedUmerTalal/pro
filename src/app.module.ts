import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [UserModule, AuthModule, PageModule],
})
export class AppModule {}
