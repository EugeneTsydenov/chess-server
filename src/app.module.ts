import { Module } from '@nestjs/common';
import env from '@common/config/env';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@src/auth';
import { UserModule } from '@src/user';
import { GameModule } from '@src/game';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    GameModule,
    CacheModule.register(),
  ],
})
export class AppModule {}
