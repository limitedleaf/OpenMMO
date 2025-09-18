import { Destroyable, checkDestroy } from "@core/utils/lifecyles/Destroyable";
import { WriteStream, createWriteStream, mkdirSync } from "fs";
import { dirname } from "path";

export class Writer implements Destroyable {
   private stream: WriteStream;

   public isDestroyed = false;

   constructor(filepath: string) {
      mkdirSync(dirname(filepath), { recursive: true });
      this.stream = createWriteStream(filepath, {'emitClose': true, 'flags': 'w'});
   }

   public destroy() {
      this.isDestroyed = true;
      this.stream.close()
   }

   public append(line: string) {
      checkDestroy(this)
      this.stream.write(line)
   }
}
