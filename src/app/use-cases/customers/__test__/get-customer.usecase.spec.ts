import { Cache } from 'cache-manager';
import { IGetCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/get-customer.usecase';
import { GetCustomerUseCase } from '../get-customer.usecase';

describe('app: use-cases : customer : get-customer', () => {
    let getCustomerUseCase: IGetCustomerUseCase
    let getCustomerUseCaseFailed: IGetCustomerUseCase
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
        getCustomerUseCase = new GetCustomerUseCase(cache);
        getCustomerUseCaseFailed = new GetCustomerUseCase(cacheWithoutGet);
    });

    it('Should return success on get customer', async () => {
        const response = await getCustomerUseCase.execute('bec5160e-5b14-4cc8-93ac-eaadedaec04c')

        expect(response).toEqual({
            "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            "document": 65158893055,
            "name": "Fulano de tal"
        })
    });


    it('Should return not found on get customer', async () => {
        try {
            await getCustomerUseCaseFailed.execute('bec5160e-5b14-4cc8-93ac-eaadedaec04c')
        } catch (error) {
            expect(error.message).toEqual("Not Found")
        }
    });
});