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
    this.logger.log(`Creating genplat assistant`);
    try {
      const payload = {
        instructions: instructions,
        name: name,
        tools: tools,
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
        `Error on trying to get genplat thread id`,
      );
    }
  }
}
