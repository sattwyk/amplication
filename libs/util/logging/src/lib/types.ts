import { Format } from "logform";

export enum LogLevel {
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error",
}

export interface LoggerOptions {
  serviceName: string;
  logLevel: LogLevel;
  isProduction: boolean;
  metadata?: Record<string, unknown>;
  additionalFormats?: Format[];
  additionalDevelopmentFormats?: Format[];
}
