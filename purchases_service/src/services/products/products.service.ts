import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../database/prisma/prisma.service';

interface ICreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  listAllProducts() {
    return this.prismaService.product.findMany();
  }

  getProductById(id: string) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async createProduct({ title }: ICreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prismaService.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists.  ');
    }

    return this.prismaService.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
