import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class City {
  @Field()
  code: string;

  @Field()
  name: string;
}
