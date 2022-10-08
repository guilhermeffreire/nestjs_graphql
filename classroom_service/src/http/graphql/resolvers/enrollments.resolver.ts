import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { EnrollmentsService } from '../../../services/enrollments/enrollments.service';
import { Enrollment } from '../models/enrollment';
import { CoursesService } from '../../../services/courses/courses.service';
import { StudentsService } from '../../../services/students/students.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
