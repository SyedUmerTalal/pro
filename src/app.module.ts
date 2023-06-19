import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CountryModule } from './country/country.module';
import { ApolloDriver } from '@nestjs/apollo';
import { PlateModule } from './plate/plate.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { OfferModule } from './offer/offer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinnerModule } from './winner/winner.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
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
    BidModule,
    OfferModule,
    WinnerModule,
  ],
})
export class AppModule {}
