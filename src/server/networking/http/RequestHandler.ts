import { Signal } from '@core/signal/Signal';
import { HttpServer } from './HttpServer';

export interface RequestContext {}

export interface ResponseContext {}

type Package<Req = RequestContext, Res = ResponseContext> = [Req, Res];

export class RequestHandler {
   private server: HttpServer;

   public onGet: Signal<Package>;
   public onPost: Signal<Package>;
   public onNoMethod: Signal<Package>;

   constructor(server: HttpServer) {
      this.server = server;

      this.onNoMethod = new Signal();
      this.onGet = new Signal();
      this.onPost = new Signal();

      server.onRequest.connect((req, res) => {
         const method = req.method;

         if (!method) {
            this.onNoMethod.fire(req, res);
            return;
         }

         switch (method) {
            case 'GET': {
               this.onGet.fire(req, res);
               break;
            }
            case 'POST': {
               this.onPost.fire(req, res);
               break;
            }
         }
      });
   }
}
