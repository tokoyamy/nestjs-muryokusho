import { Logger, UnprocessableEntityException } from '@nestjs/common';

export class ThirdPartyUtils {
  static defaultErrorHandler(logger: Logger, error: any, message: string) {
    try {
      const statusCode = error.response ? error.response.status : '';
      const responseData = error.response && error.response.data ? JSON.stringify(error.response.data) : '';
      logger.error(error.stack)
      logger.error(`${message} - ${error.message} - ${statusCode} - ${responseData}`);
    } catch (error) {
      logger.error(message)
    } finally {
      throw new UnprocessableEntityException(message);
    }
  }
}
