export type CreateCustomerUseCaseRequest = {
    id: string;
    document: number;
    name: string;
}

export type CreateCustomerUseCaseResponse = {
    id: string;
    document: number;
    name: string;
}

export interface ICreateCustomerUseCase {
    execute(customer: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse>;
}