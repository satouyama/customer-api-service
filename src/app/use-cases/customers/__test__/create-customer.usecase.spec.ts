import { ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';
import { CreateCustomerUseCase } from '../create-customer.usecase';
import { Cache } from 'cache-manager';

describe('app: use-cases : customer : create-customer', () => {
    let createCustomeUseCase: ICreateCustomerUseCase
    let createCustomeUseCaseFailed: ICreateCustomerUseCase
    let mockCustomer = {
        "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
        "document": 65158893055,
        "name": "Fulano de tal"
    }
    const cache: Cache = {
        del: jest.fn().mockResolvedValue({}),
        get: jest.fn().mockResolvedValue(mockCustomer),
        set: jest.fn().mockResolvedValue(mockCustomer),
        wrap: jest.fn().mockResolvedValue({}),
        reset: jest.fn().mockResolvedValue({}),
        store: undefined
    }

    const cacheWithoutGet: Cache = {
        del: jest.fn().mockResolvedValue({}),
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue(mockCustomer),
        wrap: jest.fn().mockResolvedValue({}),
        reset: jest.fn().mockResolvedValue({}),
        store: undefined
    }


    beforeEach(async () => {
        createCustomeUseCase = new CreateCustomerUseCase(cache);
        createCustomeUseCaseFailed = new CreateCustomerUseCase(cacheWithoutGet);
    });

    it('Should return success on create customer', async () => {
        const response = await createCustomeUseCaseFailed.execute({
            "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            "document": 65158893055,
            "name": "Fulano de tal"
        })

        expect(response).toEqual({
            "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            "document": 65158893055,
            "name": "Fulano de tal"
        })
    });


    it('Should return ConflictException on create customer', async () => {
        try {
            await createCustomeUseCase.execute({
                "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
                "document": 65158893055,
                "name": "Fulano de tal"
            })
        } catch (error) {
            expect(error.message).toEqual("Conflict")
        }
    });
});