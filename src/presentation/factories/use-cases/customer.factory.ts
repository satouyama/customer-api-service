import { GetCustomerUseCase } from "src/app/use-cases/customers/get-customer.usecase";
import { CustomerFactoryEnum } from "../enums/use-cases/customer.factory.enum";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/common";
import { CreateCustomerUseCase } from "src/app/use-cases/customers/create-customer.usecase";
import { UpdateCustomerUseCase } from "src/app/use-cases/customers/update-customer.usecase";

const getCustomerFactory = {
    inject: [CACHE_MANAGER],
    provide: CustomerFactoryEnum.GetCustomerUseCase,
    useFactory: (cacheService: Cache) => new GetCustomerUseCase(cacheService),
}

const createCustomerFactory = {
    inject: [CACHE_MANAGER],
    provide: CustomerFactoryEnum.CreateCustomerUseCase,
    useFactory: (cacheService: Cache) => new CreateCustomerUseCase(cacheService),
}

const updateCustomerFactory = {
    inject: [CACHE_MANAGER],
    provide: CustomerFactoryEnum.UpdateCustomerUseCase,
    useFactory: (cacheService: Cache) => new UpdateCustomerUseCase(cacheService),
}

export default [
    getCustomerFactory,
    createCustomerFactory,
    updateCustomerFactory
]