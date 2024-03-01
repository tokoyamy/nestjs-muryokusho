import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GenplatClient } from './genplat.client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GenplatClient],
  exports: [GenplatClient],
})
export class GenplatModule {}
