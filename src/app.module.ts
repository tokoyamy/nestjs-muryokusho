import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { AiModule } from './core/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.local'],
    }),
    AuthModule,
    UserModule,
    AiModule,
  ],
})
export class AppModule {}
