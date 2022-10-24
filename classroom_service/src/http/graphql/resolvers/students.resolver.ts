import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { StudentsService } from '../../../services/students/students.service';
import { EnrollmentsService } from '../../../services/enrollments/enrollments.service';
import { Student } from '../models/student';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentsService.getStudentByAuthUserId(user.sub);
  // }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listAllEnrollmentsByStudentId(student.id);
  }
}
