import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  listAllProducts() {
    return this.prismaService.product.findMany();
  }

  async createProduct({ title }: CreateProductParams) {
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
