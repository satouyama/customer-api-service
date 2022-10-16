import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ICreateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/create-customer.usecase.interface';
import { GetCustomerUseCaseResponse, IGetCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/get-customer.usecase';
import { IUpdateCustomerUseCase } from 'src/domain/interfaces/use-cases/customers/update-customer.usecase.interface';
import { AuthGuard } from '../../../../frameworks/guards/auth.guard';
import { CustomerFactoryEnum } from '../../../factories/enums/use-cases/customer.factory.enum';
import { CustomerDto, UpdateCustomerDTO } from '../../dtos/customer.dto';


@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CustomerFactoryEnum.CreateCustomerUseCase)
    private readonly createCustomerUseCase: ICreateCustomerUseCase,
    @Inject(CustomerFactoryEnum.GetCustomerUseCase)
    private readonly getCustomerUseCase: IGetCustomerUseCase,
    @Inject(CustomerFactoryEnum.UpdateCustomerUseCase)
    private readonly updateCustomerUseCase: IUpdateCustomerUseCase
  ) { }
  
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getCustomer(@Param('id') id: string): Promise<GetCustomerUseCaseResponse> {
    return await this.getCustomerUseCase.execute(id)
  }
  
  @UseGuards(AuthGuard)
  @Post('/')
  async createCustomer(@Body() body: CustomerDto): Promise<GetCustomerUseCaseResponse> {
    return await this.createCustomerUseCase.execute(body);
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateCustomer(@Body() body: UpdateCustomerDTO, @Param('id') id: string): Promise<GetCustomerUseCaseResponse> {
    return await this.updateCustomerUseCase.execute(id, body);
  }
}
