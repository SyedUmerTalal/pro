import { ObjectType, Field } from '@nestjs/graphql';
import { City } from './city.entity';

@ObjectType()
export class Country {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => [City])
  cities: City[];
}
