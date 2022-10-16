import { IsCPF } from "brazilian-class-validator";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CustomerDto {
    @IsNotEmpty()
    @IsUUID(4)
    id: string
    
    @IsNotEmpty()
    @IsNumber() 
    @IsCPF()
    document: number

    @IsNotEmpty()
    @IsString() 
    name: string
}


export class UpdateCustomerDTO {
    @IsOptional()
    @IsUUID(4)
    id: string
    
    @IsOptional()
    @IsNumber() 
    @IsCPF()
    document: number
    
    @IsOptional()
    @IsString() 
    name: string
}