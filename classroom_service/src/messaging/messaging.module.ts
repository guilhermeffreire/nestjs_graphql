import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses/courses.service';
import { EnrollmentsService } from '../services/enrollments/enrollments.service';
import { StudentsService } from '../services/students/students.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [CoursesService, EnrollmentsService, StudentsService],
})
export class MessagingModule {}
