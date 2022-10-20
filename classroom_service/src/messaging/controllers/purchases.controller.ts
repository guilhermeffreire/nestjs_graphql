import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses/courses.service';
import { EnrollmentsService } from '../../services/enrollments/enrollments.service';
import { StudentsService } from '../../services/students/students.service';

interface ICustomer {
  authUserId: string;
}

interface IProduct {
  id: string;
  title: string;
  slug: string;
}

interface IPurchaseCreatedPayload {
  customer: ICustomer;
  product: IProduct;
}
@Controller()
export class PurchasesController {
  constructor(
    private courseService: CoursesService,
    private enrollmentService: EnrollmentsService,
    private studentsService: StudentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: IPurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.courseService.getCourseBySlug(payload.product.slug);

    if (!course) {
      course = await this.courseService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
