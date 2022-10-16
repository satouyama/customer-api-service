import { Cache} from 'cache-manager';
import { IUpdateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/update-customer.usecase.interface';
import { UpdateCustomerUseCase } from '../update-customer.usecase';

describe('app: use-cases : customer : update-customer', () => {
    let updateCustomerUseCase: IUpdateCustomerUseCase
    let updateCustomerUseCaseFailed: IUpdateCustomerUseCase

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
        updateCustomerUseCase = new UpdateCustomerUseCase(cache);
        updateCustomerUseCaseFailed = new UpdateCustomerUseCase(cacheWithoutGet);
    });

    it('Should return success on update customer', async () => {
        const response = await updateCustomerUseCase.execute(
            "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            {
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


    it('Should return not found on update customer', async () => {
        try {
            await updateCustomerUseCaseFailed.execute(
                "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
                {
                    "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
                    "document": 65158893055,
                    "name": "Fulano de tal"
                })
        } catch (error) {
            expect(error.message).toEqual("Not Found")
        }
    });
});