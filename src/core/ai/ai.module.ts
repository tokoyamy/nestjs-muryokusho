import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OpenaiModule } from '../../third-party/openai/openai.module';

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [OpenaiModule],
  exports: [AiService],
})
export class AiModule {}
