import { CustomerController } from '../customer.controller';
import { ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';
import { IGetCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/get-customer.usecase';
import { IUpdateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/update-customer.usecase.interface';
describe('presentation: http : controllers : customer: customer-controller', () => {
    let customerController: CustomerController
    let mockCustomer = {
        "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
        "document": 65158893055,
        "name": "Fulano de tal"
    }
    let createCustomerUseCase: ICreateCustomerUseCase = {
        execute: jest.fn().mockResolvedValue(mockCustomer)
    }

    let getCustomerUseCase: IGetCustomerUseCase = {
        execute: jest.fn().mockResolvedValue(mockCustomer)
    }

    let updateCustomerUseCase: IUpdateCustomerUseCase = {
        execute: jest.fn().mockResolvedValue(mockCustomer)
    }

    const result = {
        data: 'Components',
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

    beforeEach(async () => {
        customerController = new CustomerController(createCustomerUseCase, getCustomerUseCase, updateCustomerUseCase);
    })
   
    it('Should return sucess on create customer', async () => {
        const response = await customerController.createCustomer({
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

    it('Should return sucess on get customer', async () => {
        const response = await customerController.getCustomer("bec5160e-5b14-4cc8-93ac-eaadedaec04c")
        expect(response).toEqual({
            "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            "document": 65158893055,
            "name": "Fulano de tal"
        })
    });

    it('Should return sucess on get customer', async () => {
        const response = await customerController.updateCustomer({
            "id": "bec5160e-5b14-4cc8-93ac-eaadedaec04c",
            "document": 65158893055,
            "name": "Fulanos"
        },
        'bec5160e-5b14-4cc8-93ac-eaadedaec04c'
        )
        expect(response).toHaveProperty("id")
    });
});