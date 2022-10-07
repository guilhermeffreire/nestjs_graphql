import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  studentId: Student;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Course)
  course: Course;
  courseId: string;
}
