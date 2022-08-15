import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from 'src/config/config.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from 'src/modules/config.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: Number(config.get('THROTTLE_TTL')),
        limit: Number(config.get('THROTTLE_LIMIT')),
        storage: new ThrottlerStorageRedisService(
          `${config.get('REDIS_CONNECTION')}`,
        ),
      }),
    }),
  ],
  controllers: [PublicController],
  providers: [
    PublicService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PublicService],
})
export class PublicModule {}
