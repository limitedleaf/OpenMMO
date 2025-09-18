import { Signal } from '@core/signal/Signal';
import { Socket } from 'net';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Logger } from '@core/logging/Logger';
import { join } from 'path';

const LOG_DIR = join(__dirname, '../../../../logs/http');

export class HttpServer {
   private server: Server;
   private name: string;

   public onError: Signal<[Error]>;
   public onClose: Signal<[]>;
   public onConnection: Signal<[Socket]>;
   public onRequest: Signal<[IncomingMessage, ServerResponse]>;
   public logger: Logger;

   constructor(name: string) {
      this.name = name;
      this.onError = new Signal();
      this.onClose = new Signal();
      this.onConnection = new Signal();
      this.onRequest = new Signal();

      this.logger = new Logger({ prefix: `[${name}]`, filepath: join(LOG_DIR, `${name}.log`) });

      this.server = createServer((req, res) => this.onRequest.fire(req, res));

      this.server.close(() => this.onClose.fire());

      this.server.on('connection', (socket) => this.onConnection.fire(socket));

      this.server.on('error', (err) => this.onError.fire(err));
   }

   public start() {
      this.server.listen(3000);
      this.logger.info(`${this.name} listening on http://localhost:3000`);
   }
}
