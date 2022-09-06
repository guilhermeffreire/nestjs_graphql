import { Resolver, Query, Int } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  @Query(() => Boolean)
  hello() {
    return true;
  }
}
