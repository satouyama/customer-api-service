import { CACHE_MANAGER, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateCustomerUseCaseRequest, CreateCustomerUseCaseResponse, ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';

@Injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(customer: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerCache = await this.cacheService.get(customer.id); 

    if(customerCache){
      throw new ConflictException();
    }
     const customerSaved = await this.cacheService.set(customer.id, customer, { ttl: 0 });
     return customerSaved;
  }
}
