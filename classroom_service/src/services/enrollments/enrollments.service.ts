import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

interface IGetEnrollmentsByStudentIdAndCourseId {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getEnrollmentsByStudentIdAndCourseId({
    courseId,
    studentId,
  }: IGetEnrollmentsByStudentIdAndCourseId) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, canceledAt: null },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  listAllEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
