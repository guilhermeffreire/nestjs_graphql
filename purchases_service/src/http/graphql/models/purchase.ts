import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchasesStatus {
  PENDING = 'PENDING',
  APPROVED = 'APRROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchasesStatus, {
  name: 'PurchasesStatus',
  description: 'Available purchases status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchasesStatus)
  status: PurchasesStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
