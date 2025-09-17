import { checkDestroy, Destroyable } from '@core/utils/lifecyles/Destroyable';
import { Callback, Signal } from './Signal';

export class Connection<Args extends any[]> implements Destroyable {
   public callback?: Callback<Args>;
   public next?: Connection<Args>;
   public prev: Connection<Args> | Signal<Args>;
   public once?: boolean;
   public isDestroyed = false;

   constructor(prev: Connection<Args> | Signal<Args>) {
      this.prev = prev;
   }

   // Destroy doesn't set flag because disconnect does it ( A Connection can only be disconnect once )
   public destroy() {
      if (this.isDestroyed) return;
      this.disconnect();
   }

   public disconnect() {
      checkDestroy(this);
      const next = this.next;
      const prev = this.prev;

      if (next) {
         next.prev = prev;
         prev.next = next;
      } else {
         prev.next = undefined;
         if (prev instanceof Signal) {
            prev.prev = undefined;
         }
      }

      this.isDestroyed = true;
   }
}

   