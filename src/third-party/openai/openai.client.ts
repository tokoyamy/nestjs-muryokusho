import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ThirdPartyUtils } from '../utils/third-party-utils';

@Injectable()
export class OpenaiClient {
  private logger: Logger;
  private baseUrl: string;
  private token: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.logger = new Logger(this.constructor.name);
    this.baseUrl = this.configService.get('OPENAI_URL');
    this.token = this.configService.get('REQUESTER_TOKEN');
  }

  private buildHeader() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      'OpenAI-Beta': 'assistants=v1',
    };
  }
  async listModels(): Promise<any> {
    this.logger.log(`Listing available models`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/models`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to list models`,
      );
    }
  }

  async legacyCompletions(contentUser: string, modelGpt: string): Promise<any> {
    this.logger.log(`user question to gpt`);
    try {
      const payload = JSON.stringify({
        model: modelGpt,
        messages: [
          {
            role: 'user',
            content: contentUser,
          },
        ],
        temperature: 0.7,
      });
      const result = await this.httpService
        .post(
          `${this.baseUrl}/api/v1/proxy/openai/v1/chat/completions`,
          payload,
          {
            headers: this.buildHeader(),
          },
        )
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying getting response user`,
      );
    }
  }

  async createAssistant(
    instructions: string,
    name: string,
    tools: string[],
    modelGpt: string,
  ): Promise<any> {
    this.logger.log(`Creating assistant`);
    try {
      const payload = {
        instructions: instructions,
        name: name,
        tools: tools.map((tool) => ({ type: tool })),
        model: modelGpt,
      };
      const result = await this.httpService
        .post(`${this.baseUrl}/v1/assistants`, payload, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to create ${name} assistant`,
      );
    }
  }
  async listAssistants(
    order: string = 'desc',
    limit: number = 20,
  ): Promise<any> {
    this.logger.log(`Listing assistants`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/assistants?order=${order}&limit=${limit}`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to list assistants`,
      );
    }
  }
  async getAssistantDetails(assistantId: string): Promise<any> {
    this.logger.log(`Getting details for assistant: ${assistantId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/assistants/${assistantId}`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get details for assistant ${assistantId}`,
      );
    }
  }

  async updateAssistant(
    assistantId: string,
    instructions: string,
    tools: string[],
    modelGpt: string,
    fileIds: string[],
  ): Promise<any> {
    this.logger.log(`Updating assistant: ${assistantId}`);
    try {
      const payload = {
        instructions: instructions,
        tools: tools.map((tool) => ({ type: tool })),
        model: modelGpt,
        file_ids: fileIds,
      };
      const result = await this.httpService
        .post(`${this.baseUrl}/v1/assistants/${assistantId}`, payload, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to update assistant ${assistantId}`,
      );
    }
  }
  async deleteAssistant(assistantId: string): Promise<any> {
    this.logger.log(`Deleting assistant: ${assistantId}`);
    try {
      const result = await this.httpService
        .delete(`${this.baseUrl}/v1/assistants/${assistantId}`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to delete assistant ${assistantId}`,
      );
    }
  }
  async createThread(): Promise<any> {
    this.logger.log(`Creating a new thread`);
    try {
      const result = await this.httpService
        .post(
          `${this.baseUrl}/v1/threads`,
          {},
          {
            headers: this.buildHeader(),
          },
        )
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to create a new thread`,
      );
    }
  }
  async getThreadDetails(threadId: string): Promise<any> {
    this.logger.log(`Getting details for thread: ${threadId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/threads/${threadId}`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get details for thread ${threadId}`,
      );
    }
  }
  async postMessageToThread(
    threadId: string,
    role: string,
    content: string,
  ): Promise<any> {
    this.logger.log(`Posting message to thread: ${threadId}`);
    try {
      const payload = {
        role: role,
        content: content,
      };
      const result = await this.httpService
        .post(`${this.baseUrl}/v1/threads/${threadId}/messages`, payload, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to post message to thread ${threadId}`,
      );
    }
  }
  async getMessagesFromThread(threadId: string): Promise<any> {
    this.logger.log(`Getting messages from thread: ${threadId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/threads/${threadId}/messages`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get messages from thread ${threadId}`,
      );
    }
  }
  async createRunInThread(threadId: string, assistantId: string): Promise<any> {
    this.logger.log(`Creating run in thread: ${threadId}`);
    try {
      const payload = {
        assistant_id: assistantId,
      };
      const result = await this.httpService
        .post(`${this.baseUrl}/v1/threads/${threadId}/runs`, payload, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to create run in thread ${threadId}`,
      );
    }
  }
  async createRunWithMessages(
    assistantId: string,
    messages: { role: string; content: string }[],
  ): Promise<any> {
    this.logger.log(
      `Creating run with messages using assistant: ${assistantId}`,
    );
    try {
      const payload = {
        assistant_id: assistantId,
        thread: {
          messages: messages,
        },
      };
      const result = await this.httpService
        .post(`${this.baseUrl}/v1/threads/runs`, payload, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to create run with messages`,
      );
    }
  }
  async getRunsFromThread(threadId: string): Promise<any> {
    this.logger.log(`Getting runs from thread: ${threadId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/threads/${threadId}/runs`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get runs from thread ${threadId}`,
      );
    }
  }
  async getStepsFromRun(threadId: string, runId: string): Promise<any> {
    this.logger.log(`Getting steps from run: ${runId} in thread: ${threadId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/threads/${threadId}/runs/${runId}/steps`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get steps from run ${runId} in thread ${threadId}`,
      );
    }
  }
  async getRunDetails(threadId: string, runId: string): Promise<any> {
    this.logger.log(`Getting details of run: ${runId} in thread: ${threadId}`);
    try {
      const result = await this.httpService
        .get(`${this.baseUrl}/v1/threads/${threadId}/runs/${runId}`, {
          headers: this.buildHeader(),
        })
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get details of run ${runId} in thread ${threadId}`,
      );
    }
  }
  async getStepDetails(
    threadId: string,
    runId: string,
    stepId: string,
  ): Promise<any> {
    this.logger.log(
      `Getting details of step: ${stepId} in run: ${runId} of thread: ${threadId}`,
    );
    try {
      const result = await this.httpService
        .get(
          `${this.baseUrl}/v1/threads/${threadId}/runs/${runId}/steps/${stepId}`,
          {
            headers: this.buildHeader(),
          },
        )
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to get details of step ${stepId} in run ${runId} of thread ${threadId}`,
      );
    }
  }
  async submitToolOutputs(
    threadId: string,
    runId: string,
    toolOutputs: { tool_call_id: string; output: string }[],
  ): Promise<any> {
    this.logger.log(
      `Submitting tool outputs for run: ${runId} in thread: ${threadId}`,
    );
    try {
      const payload = {
        tool_outputs: toolOutputs,
      };
      const result = await this.httpService
        .post(
          `${this.baseUrl}/v1/threads/${threadId}/runs/${runId}/submit_tool_outputs`,
          payload,
          {
            headers: this.buildHeader(),
          },
        )
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to submit tool outputs for run ${runId} in thread ${threadId}`,
      );
    }
  }
  async cancelRun(threadId: string, runId: string): Promise<any> {
    this.logger.log(`Cancelling run: ${runId} in thread: ${threadId}`);
    try {
      const result = await this.httpService
        .post(
          `${this.baseUrl}/v1/threads/${threadId}/runs/${runId}/cancel`,
          {},
          {
            headers: this.buildHeader(),
          },
        )
        .toPromise();
      return result.data;
    } catch (error) {
      ThirdPartyUtils.defaultErrorHandler(
        this.logger,
        error,
        `Error on trying to cancel run ${runId} in thread ${threadId}`,
      );
    }
  }
}
