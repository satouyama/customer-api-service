
import { BadGatewayException, CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IUpdateCustomerUseCase, UpdateCustomerUseCaseRequest, UpdateCustomerUseCaseResponse } from 'src/domain/interfaces/use-cases/customers/update-customer.usecase.interface';
import { setCachePrefix } from '../../../utils/cache';
import { CacheKeyPrefixEnum } from '../../../utils/cache-key-prefix.enum';

@Injectable()
export class UpdateCustomerUseCase implements IUpdateCustomerUseCase {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) { }

  async execute(id: string, customer: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {
    try {
      const customerCache = await this.cacheService.get<UpdateCustomerUseCaseResponse>(setCachePrefix(id, CacheKeyPrefixEnum.CUSTOMER));
      if (!customerCache) {
        throw new NotFoundException();
      }
      return await this.cacheService.set<UpdateCustomerUseCaseResponse>(
        setCachePrefix(id, CacheKeyPrefixEnum.CUSTOMER),
        {
          ...customerCache,
          ...customer
        });
    } catch (error) {
      if (error.name) throw error;
      throw new BadGatewayException();
    }
  }
}
