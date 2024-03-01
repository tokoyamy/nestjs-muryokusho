import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('/api/v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('models')
  async listModels() {
    return this.aiService.listModels();
  }

  @Post('assistants')
  async createAssistant(@Body() createAssistantDto: any) {
    const { instructions, name, tools, modelGpt } = createAssistantDto;
    return this.aiService.createAssistant(instructions, name, tools, modelGpt);
  }

  @Get('assistants')
  async listAssistants(
    @Query('order') order: string,
    @Query('limit') limit: number,
  ) {
    return this.aiService.listAssistants(order, limit);
  }

  @Get('assistants/:assistantId')
  async getAssistantDetails(@Param('assistantId') assistantId: string) {
    return this.aiService.getAssistantDetails(assistantId);
  }

  @Delete('assistants/:assistantId')
  async deleteAssistant(@Param('assistantId') assistantId: string) {
    return this.aiService.deleteAssistant(assistantId);
  }

  @Post('threads')
  async createThread() {
    return this.aiService.createThread();
  }

  @Get('threads/:threadId')
  async getThreadDetails(@Param('threadId') threadId: string) {
    return this.aiService.getThreadDetails(threadId);
  }

  @Post('threads/:threadId/messages')
  async postMessageToThread(
    @Param('threadId') threadId: string,
    @Body() postMessageDto: any,
  ) {
    const { role, content } = postMessageDto;
    return this.aiService.postMessageToThread(threadId, role, content);
  }

  @Get('threads/:threadId/messages')
  async getMessagesFromThread(@Param('threadId') threadId: string) {
    return this.aiService.getMessagesFromThread(threadId);
  }

  @Post('threads/:threadId/runs')
  async createRunInThread(
    @Param('threadId') threadId: string,
    @Body('assistantId') assistantId: string,
  ) {
    return this.aiService.createRunInThread(threadId, assistantId);
  }

  @Post('threads/runs')
  async createRunWithMessages(@Body() createRunDto: any) {
    const { assistantId, messages } = createRunDto;
    return this.aiService.createRunWithMessages(assistantId, messages);
  }

  @Get('threads/:threadId/runs')
  async getRunsFromThread(@Param('threadId') threadId: string) {
    return this.aiService.getRunsFromThread(threadId);
  }

  @Get('threads/:threadId/runs/:runId')
  async getRunDetails(
    @Param('threadId') threadId: string,
    @Param('runId') runId: string,
  ) {
    return this.aiService.getRunDetails(threadId, runId);
  }

  @Post('threads/:threadId/runs/:runId/submit_tool_outputs')
  async submitToolOutputs(
    @Param('threadId') threadId: string,
    @Param('runId') runId: string,
    @Body() submitToolOutputsDto: any,
  ) {
    const { toolOutputs } = submitToolOutputsDto;
    return this.aiService.submitToolOutputs(threadId, runId, toolOutputs);
  }

  @Post('threads/:threadId/runs/:runId/cancel')
  async cancelRun(
    @Param('threadId') threadId: string,
    @Param('runId') runId: string,
  ) {
    return this.aiService.cancelRun(threadId, runId);
  }
}
