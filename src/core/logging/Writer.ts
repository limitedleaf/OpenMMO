import { Destroyable, checkDestroy } from "@core/utils/lifecyles/Destroyable";
import { WriteStream, createWriteStream } from "fs";

export class Writer implements Destroyable {
   private stream: WriteStream;

   public isDestroyed = false;

   constructor(filepath: string) {
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
