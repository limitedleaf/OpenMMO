export interface Destroyable {
   isDestroyed: boolean,
   destroy: () => void,
}

export function defaultDestroy(obj: Destroyable): () => void {
   return () => {
      obj.isDestroyed = true
   }
}

export function checkDestroy(obj: Destroyable) {
   if (obj.isDestroyed) {
      throw new Error("This object has been destroyed you cannot access its methods!")
   }
}