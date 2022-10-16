import { BadGatewayException, CACHE_MANAGER, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateCustomerUseCaseRequest, CreateCustomerUseCaseResponse, ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';
import { setCachePrefix } from '../../../utils/cache';
import { CacheKeyPrefixEnum } from '../../../utils/cache-key-prefix.enum';

@Injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(customer: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    try {
      const customerCache = await this.cacheService.get(customer.id); 

    if(customerCache){
      throw new ConflictException();
    }
     const customerSaved = await this.cacheService.set<CreateCustomerUseCaseResponse>(setCachePrefix(customer.id, CacheKeyPrefixEnum.CUSTOMER), customer);
     return customerSaved;
    } catch (error) {
      if(error.name) throw error;
      throw new BadGatewayException();
    }
  }
}
