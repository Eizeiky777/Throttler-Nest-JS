import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
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
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
