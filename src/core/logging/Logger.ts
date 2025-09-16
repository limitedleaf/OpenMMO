import { LoggerMode } from './Mode';
import { DEFAULT_LOGGER_MODE_PREFIXES, LoggerModePrefixes } from './Prefixes';
import { DEFAULT_LOGGER_COLORS, LoggerColors } from './Colors';
import { Writer } from './Writer';
import { ColorCodes } from '@core/utils/enum/ColorCodes';
import { checkDestroy, Destroyable } from '@core/utils/lifecyles/Destroyable';

export interface LoggerInit {
   prefix: string;
   mode?: LoggerMode;
   filepath?: string;
   colors?: LoggerColors;
   modePrefixes?: LoggerModePrefixes;
}

export class Logger implements Destroyable {
   private prefix: string;
   private selectedMode: LoggerMode;
   private writer?: Writer;
   private modePrefixes: LoggerModePrefixes;
   private colors: LoggerColors;

   public isDestroyed = false;

   constructor(init: LoggerInit) {
      this.prefix = init.prefix;
      this.selectedMode = init.mode ?? LoggerMode.Info;
      this.colors = init.colors ?? DEFAULT_LOGGER_COLORS;
      this.modePrefixes = init.modePrefixes == null ? DEFAULT_LOGGER_MODE_PREFIXES : init.modePrefixes;
      if (init.filepath) {
         this.writer = new Writer(init.filepath);
      }
   }

   public destroy() {
      this.isDestroyed = true;
      if (this.writer) {
         this.writer.destroy();
      }
   }

   private log(mode: LoggerMode, ...msgs: any[]) {
      checkDestroy(this)
      if (mode < this.selectedMode) return;

      const timestamp = new Date().toISOString().slice(11, 19);
      const fileLine = `[${timestamp}]${this.prefix}${this.modePrefixes[mode]} ${msgs}`

      if (this.writer) {
         this.writer.append(fileLine + '\n');
      }

      const consoleLine = this.colors[mode] + fileLine + ColorCodes.Reset
      
      console.log(consoleLine);
   }

   public debug(...args: any[]) {
      this.log(LoggerMode.Debug, ...args);
   }

   public info(...args: any[]) {
      this.log(LoggerMode.Info, ...args);
   }

   public warn(...args: any[]) {
      this.log(LoggerMode.Warn, ...args);
   }

   public error(...args: any[]) {
      this.log(LoggerMode.Error, ...args);
   }
}
