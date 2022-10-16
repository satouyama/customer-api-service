import { Module } from "@nestjs/common";
import customerFactory from '../factories/use-cases/customer.factory';
@Module({
    controllers: [],
    exports: [...customerFactory],
    providers: [...customerFactory]
})


export class FactoriesModule {}