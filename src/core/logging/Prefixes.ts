import { LoggerMode } from "./Mode";

export type LoggerModePrefixes = Record<LoggerMode, string>

export const DEFAULT_LOGGER_MODE_PREFIXES: LoggerModePrefixes = {
   [LoggerMode.Debug]: '[DEBUG]',
   [LoggerMode.Info]: '[INFO]',
   [LoggerMode.Warn]: '[WARN]',
   [LoggerMode.Error]: '[ERROR]',
};