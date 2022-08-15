import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
