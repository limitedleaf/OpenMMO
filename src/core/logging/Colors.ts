import { ColorCodes } from "@core/utils/enum/ColorCodes"
import { LoggerMode } from "./Mode"

export type LoggerColors = Record<LoggerMode, ColorCodes>

export const DEFAULT_LOGGER_COLORS = {
   [LoggerMode.Debug]: ColorCodes.Blue,
   [LoggerMode.Info]: ColorCodes.Green,
   [LoggerMode.Warn]: ColorCodes.Yellow,
   [LoggerMode.Error]: ColorCodes.Red,
}