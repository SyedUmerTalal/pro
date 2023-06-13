import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CountryModule } from './country/country.module';
import { ApolloDriver } from '@nestjs/apollo';
import { PlateModule } from './plate/plate.module';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        noDuplicatedFields: true,
      },
    }),
    CountryModule,
    PlateModule,
    AuctionModule,
  ],
})
export class AppModule {}
