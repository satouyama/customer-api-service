import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PresentationModule } from './presentation/presentation.module';
import { FactoriesModule } from './presentation/factories/factories.module';
dotenv.config();
console.log(process.env.REDIS_PASSWORD)
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
      ttl: Number(process.env.REDIS_TTL),
    }),
    PresentationModule,
    FactoriesModule,
  ],
})
export class AppModule {}
