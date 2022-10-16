import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GetCustomerUseCaseResponse, IGetCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/get-customer.usecase';


@Injectable()
export class GetCustomerUseCase implements IGetCustomerUseCase {
  constructor(
    private readonly cacheService: Cache,
  ) {}

  async execute(id: string): Promise<GetCustomerUseCaseResponse> {
    
    const customerCache = await this.cacheService.get<GetCustomerUseCaseResponse>(id);
    if(!customerCache){
        throw new NotFoundException();
    }
    return customerCache;
  }
}
