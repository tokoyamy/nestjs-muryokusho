import { Injectable, Logger } from '@nestjs/common';
import { OpenaiClient } from 'src/third-party/openai/openai.client';

@Injectable()
export class AiService {
  private logger: Logger;

  constructor(private openaiClient: OpenaiClient) {
    this.logger = new Logger(this.constructor.name);
  }

  async listModels(): Promise<any> {
    this.logger.log('Listing models in AiService');
    try {
      return await this.openaiClient.listModels();
    } catch (error) {
      this.logger.error('Error while listing models', error);
      throw error;
    }
  }

  async createAssistant(
    instructions: string,
    name: string,
    tools: string[],
    modelGpt: string,
  ): Promise<any> {
    this.logger.log(`Creating assistant: ${name} in AiService`);
    try {
      return await this.openaiClient.createAssistant(
        instructions,
        name,
        tools,
        modelGpt,
      );
    } catch (error) {
      this.logger.error(`Error while creating assistant: ${name}`, error);
      throw error;
    }
  }

  async getAssistantDetails(assistantId: string): Promise<any> {
    this.logger.log(
      `Getting details for assistant: ${assistantId} in AiService`,
    );
    try {
      return await this.openaiClient.getAssistantDetails(assistantId);
    } catch (error) {
      this.logger.error(
        `Error while getting details for assistant: ${assistantId}`,
        error,
      );
      throw error;
    }
  }

  async listAssistants(
    order: string = 'desc',
    limit: number = 20,
  ): Promise<any> {
    this.logger.log('Listing assistants in AiService');
    try {
      return await this.openaiClient.listAssistants(order, limit);
    } catch (error) {
      this.logger.error('Error while listing assistants', error);
      throw error;
    }
  }

  async updateAssistant(
    assistantId: string,
    instructions: string,
    tools: string[],
    modelGpt: string,
    fileIds: string[],
  ): Promise<any> {
    this.logger.log(`Updating assistant: ${assistantId} in AiService`);
    try {
      return await this.openaiClient.updateAssistant(
        assistantId,
        instructions,
        tools,
        modelGpt,
        fileIds,
      );
    } catch (error) {
      this.logger.error(
        `Error while updating assistant: ${assistantId}`,
        error,
      );
      throw error;
    }
  }

  async deleteAssistant(assistantId: string): Promise<any> {
    this.logger.log(`Deleting assistant: ${assistantId} in AiService`);
    try {
      return await this.openaiClient.deleteAssistant(assistantId);
    } catch (error) {
      this.logger.error(
        `Error while deleting assistant: ${assistantId}`,
        error,
      );
      throw error;
    }
  }

  async createThread(): Promise<any> {
    this.logger.log('Creating a new thread in AiService');
    try {
      return await this.openaiClient.createThread();
    } catch (error) {
      this.logger.error('Error while creating a new thread', error);
      throw error;
    }
  }

  async getThreadDetails(threadId: string): Promise<any> {
    this.logger.log(`Getting details for thread: ${threadId} in AiService`);
    try {
      return await this.openaiClient.getThreadDetails(threadId);
    } catch (error) {
      this.logger.error(
        `Error while getting details for thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async postMessageToThread(
    threadId: string,
    role: string,
    content: string,
  ): Promise<any> {
    this.logger.log(`Posting message to thread: ${threadId} in AiService`);
    try {
      return await this.openaiClient.postMessageToThread(
        threadId,
        role,
        content,
      );
    } catch (error) {
      this.logger.error(
        `Error while posting message to thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async getMessagesFromThread(threadId: string): Promise<any> {
    this.logger.log(`Getting messages from thread: ${threadId} in AiService`);
    try {
      return await this.openaiClient.getMessagesFromThread(threadId);
    } catch (error) {
      this.logger.error(
        `Error while getting messages from thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }
  async createRunInThread(threadId: string, assistantId: string): Promise<any> {
    this.logger.log(`Creating run in thread: ${threadId} in AiService`);
    try {
      return await this.openaiClient.createRunInThread(threadId, assistantId);
    } catch (error) {
      this.logger.error(
        `Error while creating run in thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async createRunWithMessages(
    assistantId: string,
    messages: { role: string; content: string }[],
  ): Promise<any> {
    this.logger.log(
      `Creating run with messages using assistant: ${assistantId} in AiService`,
    );
    try {
      return await this.openaiClient.createRunWithMessages(
        assistantId,
        messages,
      );
    } catch (error) {
      this.logger.error(
        `Error while creating run with messages using assistant: ${assistantId}`,
        error,
      );
      throw error;
    }
  }

  async getRunsFromThread(threadId: string): Promise<any> {
    this.logger.log(`Getting runs from thread: ${threadId} in AiService`);
    try {
      return await this.openaiClient.getRunsFromThread(threadId);
    } catch (error) {
      this.logger.error(
        `Error while getting runs from thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async getRunDetails(threadId: string, runId: string): Promise<any> {
    this.logger.log(
      `Getting details of run: ${runId} in thread: ${threadId} in AiService`,
    );
    try {
      return await this.openaiClient.getRunDetails(threadId, runId);
    } catch (error) {
      this.logger.error(
        `Error while getting details of run: ${runId} in thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async submitToolOutputs(
    threadId: string,
    runId: string,
    toolOutputs: { tool_call_id: string; output: string }[],
  ): Promise<any> {
    this.logger.log(
      `Submitting tool outputs for run: ${runId} in thread: ${threadId} in AiService`,
    );
    try {
      return await this.openaiClient.submitToolOutputs(
        threadId,
        runId,
        toolOutputs,
      );
    } catch (error) {
      this.logger.error(
        `Error while submitting tool outputs for run: ${runId} in thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }

  async cancelRun(threadId: string, runId: string): Promise<any> {
    this.logger.log(
      `Cancelling run: ${runId} in thread: ${threadId} in AiService`,
    );
    try {
      return await this.openaiClient.cancelRun(threadId, runId);
    } catch (error) {
      this.logger.error(
        `Error while cancelling run: ${runId} in thread: ${threadId}`,
        error,
      );
      throw error;
    }
  }
}
