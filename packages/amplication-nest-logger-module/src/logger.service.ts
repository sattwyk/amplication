import { Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerOptions, Logger, LogLevel } from "@amplication/util/logging";

export const AMPLICATION_LOGGER_PROVIDER = "AmplicationLogger";

@Injectable()
export class AmplicationLogger implements LoggerService {
  public logger: Logger;

  constructor(private readonly configService: ConfigService) {
    const loggerOptions: LoggerOptions = {
      serviceName: configService.get<string>("SERVICE_NAME"),
      isProduction: configService.get<boolean>("NODE_ENV"),
      logLevel: configService.get<LogLevel>("LOG_LEVEL"),
    };

    this.logger = new Logger(loggerOptions);
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  public log(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }
}
