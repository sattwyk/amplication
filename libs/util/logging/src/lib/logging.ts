import {
  createLogger,
  format,
  Logger as WindstonLogger,
  transports,
} from "winston";
import { LoggerOptions, LogLevel } from "./types";
import { Format } from "logform";

const logTransports = [new transports.Console()];

export class Logger {
  private logger: WindstonLogger;
  public level: LogLevel;

  constructor(private readonly options: LoggerOptions) {
    this.level = options.logLevel;

    const format = this.getLoggerFormat();
    this.logger = createLogger({
      defaultMeta: {
        component: options.serviceName,
        ...options.metadata,
      },
      level: this.level,
      format,
      transports: logTransports,
      handleExceptions: true,
      exitOnError: true,
      exceptionHandlers: logTransports,
      rejectionHandlers: logTransports,
    });
  }

  public getLoggerFormat(): Format {
    const developmentFormats: Format[] = [
      format.errors({ stack: true }),
      format.timestamp(),
      format.colorize(),
      format.simple(),
    ];
    if (this.options.additionalDevelopmentFormats) {
      developmentFormats.push(...this.options.additionalDevelopmentFormats);
    }
    if (this.options.additionalFormats) {
      developmentFormats.push(...this.options.additionalFormats);
    }

    const productionFormats: Format[] = [
      format.errors({ stack: true }),
      format.timestamp(),
      format.json(),
    ];
    if (this.options.additionalFormats) {
      productionFormats.push(...this.options.additionalFormats);
    }

    return this.options.isProduction
      ? format.combine(...productionFormats)
      : format.combine(...developmentFormats);
  }

  debug(message: string, params?: Record<string, unknown>): void {
    this.logger.debug(message, params);
  }

  info(message: string, params?: Record<string, unknown>): void {
    this.logger.info(message, params);
  }

  warn(message: string, params?: unknown, err?: Error): void {
    this.logger.warn(message, params, err);
  }

  error(message: string, params?: Record<string, unknown>, err?: Error): void {
    this.logger.error(message, params, err);
  }
}
