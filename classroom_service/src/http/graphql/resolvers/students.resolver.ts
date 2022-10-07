import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { StudentsService } from '../../../services/students/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }
}
