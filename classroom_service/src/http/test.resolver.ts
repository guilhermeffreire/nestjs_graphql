import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Int } from '@nestjs/graphql';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
export class TestResolver {
  @Query(() => Boolean)
  @UseGuards(AuthorizationGuard)
  hello() {
    return true;
  }
}
