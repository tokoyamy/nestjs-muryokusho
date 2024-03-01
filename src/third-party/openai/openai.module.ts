import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OpenaiClient } from './openai.client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OpenaiClient],
  exports: [OpenaiClient],
})
export class OpenaiModule {}
