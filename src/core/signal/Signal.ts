import { checkDestroy, defaultDestroy, Destroyable } from '@core/utils/lifecyles/Destroyable';
import { Connection } from './Connection';
import { Logger } from '@core/logging/Logger';

const logger = new Logger({ prefix: '[SIGNAL]' });

export type Callback<Args extends any[], R = any> = (...args: Args) => R;

export class Signal<Args extends any[]> implements Destroyable {
   public next?: Connection<Args>;
   public prev?: Connection<Args>;
   public isDestroyed = false;
   public destroy;

   constructor() {
      this.destroy = defaultDestroy(this);
   }

   private createConnection(): Connection<Args> {
      const tail = this.prev;
      let connection: Connection<Args>;
      if (tail) {
         connection = new Connection<Args>(tail);
         tail.next = connection;
      } else {
         connection = new Connection<Args>(this);
         this.next = connection;
      }
      this.prev = connection;
      return connection;
   }

   public connect(callback: Callback<Args>): Connection<Args> {
      checkDestroy(this);
      const connection = this.createConnection();
      connection.callback = callback;
      return connection;
   }

   public once(callback: Callback<Args>): Connection<Args> {
      checkDestroy(this);
      const connection = this.createConnection();
      connection.callback = callback;
      connection.once = true;
      return connection;
   }

   public wait(): Promise<Args> {
      checkDestroy(this);
      return new Promise((resolve, _) => {
         const connection = this.createConnection();
         connection.callback = (...args: Args) => resolve(args);
         connection.once = true;
      });
   }

   public fire(...args: Args) {
      checkDestroy(this);
      let curr = this.next;
      while (curr) {
         if (curr.callback) {
            try {
               curr.callback(...args);
            } catch (err) {
               logger.error("Callback failed to execute, err:", err)
            }
         }
         const next = curr.next as Connection<Args>;
         if (curr.once) {
            curr.disconnect();
         }
         curr = next;
      }
   }
}
