
export type GetCustomerUseCaseResponse = {
    id: string;
    document: number;
    name: string;
}

export interface IGetCustomerUseCase {
    execute(id: string): Promise<GetCustomerUseCaseResponse>;
}