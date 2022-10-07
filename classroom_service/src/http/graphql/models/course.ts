import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  title: string;
}
