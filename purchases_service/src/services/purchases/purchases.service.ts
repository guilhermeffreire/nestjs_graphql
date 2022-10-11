import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { KafkaService } from '../../messaging/kafka.service';

interface ICreatePurchaseService {
  productId: string;
  customerId: string;
}
@Injectable()
export class PurchasesService {
  constructor(
    private prismaService: PrismaService,
    private kafka: KafkaService,
  ) {}

  listAllPurchases() {
    return this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromCustomer(customerId: string) {
    return this.prismaService.purchase.findMany({
      where: {
        customerId,
      },
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

    const purchases = await this.prismaService.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prismaService.customer.findUnique({
      where: { id: customerId },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchases;
  }
}
