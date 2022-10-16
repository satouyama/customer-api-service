
export type UpdateCustomerUseCaseRequest = {
    id: string;
    document: number;
    name: string;
}

export type UpdateCustomerUseCaseResponse = {
    id: string;
    document: number;
    name: string;
}

export interface IUpdateCustomerUseCase {
    execute(id: string, customer: UpdateCustomerUseCaseRequest ): Promise<UpdateCustomerUseCaseResponse>;
}