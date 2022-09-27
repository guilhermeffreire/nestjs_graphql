import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

interface ICreatePurchaseService {
  productId: string;
  customerId: string;
}
@Injectable()
export class PurchasesService {
  constructor(private prismaService: PrismaService) {}

  listAllPurchases() {
    return this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ productId, customerId }: ICreatePurchaseService) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    return await this.prismaService.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
