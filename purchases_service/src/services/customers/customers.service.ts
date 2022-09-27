import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prismaService.customer.findUnique({
      where: { id: authUserId },
    });
  }
}
