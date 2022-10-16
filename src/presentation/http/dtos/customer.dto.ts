import { IsCPF } from "brazilian-class-validator";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CustomerDto {
    @IsUUID(4)
    id: string

    @IsNumber() 
    @IsCPF()
    document: number

    @IsString() 
    name: string
}