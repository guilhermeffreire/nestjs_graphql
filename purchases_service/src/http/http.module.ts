import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../services/purchases/purchases.service';
import { CustomersService } from '../services/customers/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Resolvers
    ProductsResolver,
    PurchasesResolver,

    //Services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
