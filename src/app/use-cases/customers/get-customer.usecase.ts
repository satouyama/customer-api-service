import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GetCustomerUseCaseResponse, IGetCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/get-customer.usecase';
import { setCachePrefix } from '../../../utils/cache';
import { CacheKeyPrefixEnum } from '../../../utils/cache-key-prefix.enum';


@Injectable()
export class GetCustomerUseCase implements IGetCustomerUseCase {
  constructor(
    private readonly cacheService: Cache,
  ) {}

  async execute(id: string): Promise<GetCustomerUseCaseResponse> {
    
    try {
    const customerCache = await this.cacheService.get<GetCustomerUseCaseResponse>(setCachePrefix(id, CacheKeyPrefixEnum.CUSTOMER));
    if(!customerCache){
        throw new NotFoundException();
    }
    return customerCache;
    } catch (error) {
      if(error.name) throw error;
      throw new BadGatewayException();
    }
  }
}
