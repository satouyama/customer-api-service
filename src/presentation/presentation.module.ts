import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FactoriesModule } from './factories/factories.module';
import { CustomerController } from './http/controllers/customers/customer.controller';

@Module({
  controllers: [CustomerController],
  imports: [FactoriesModule, HttpModule],
  providers: [],
})
export class PresentationModule {}
