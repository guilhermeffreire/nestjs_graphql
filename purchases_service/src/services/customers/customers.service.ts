import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

interface ICreateCustomerParams {
  authUserId: string;
}
@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prismaService.customer.findUnique({
      where: { authUserId },
    });
  }

  createCustomer({ authUserId }: ICreateCustomerParams) {
    return this.prismaService.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
