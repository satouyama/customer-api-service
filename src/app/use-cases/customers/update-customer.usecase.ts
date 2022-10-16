
import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateCustomerUseCaseRequest, CreateCustomerUseCaseResponse, ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';
import { IUpdateCustomerUseCase, UpdateCustomerUseCaseRequest, UpdateCustomerUseCaseResponse } from 'src/domain/interfaces/use-cases/customers/update-customer.usecase.interface';

@Injectable()
export class UpdateCustomerUseCase implements IUpdateCustomerUseCase {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(id: string, customer: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {
    const customerCache = await this.cacheService.get<UpdateCustomerUseCaseResponse>(id);
    if(!customerCache){
      throw new NotFoundException();
    }
    return await this.cacheService.set<UpdateCustomerUseCaseResponse>(id, customer);
  }
}
