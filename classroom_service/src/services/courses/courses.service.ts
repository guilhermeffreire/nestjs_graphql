import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import slugify from 'slugify';

interface ICreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async createCourse({ title }: ICreateCourseParams) {
    const slugTitle = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug: slugTitle },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists.');
    }

    return this.prisma.course.create({ data: { title, slug: slugTitle } });
  }
}
