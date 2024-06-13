import { Module } from '@nestjs/common';
import env from '@common/config/env';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@presentation/auth';
import { UserModule } from '@presentation/user';
import { GameModule } from '@presentation/game';
import { Database } from '@frameworks/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    GameModule,
  ],
})
export class AppModule {}
