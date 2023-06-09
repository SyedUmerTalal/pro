import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { CountryArgs } from './args/country.args';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [Country], { name: 'countries' })
  findAll(
    @Args('countryArgs', { type: () => CountryArgs, nullable: true })
    countryArgs: CountryArgs,
  ) {
    return this.countryService.findAll(countryArgs);
  }
}
