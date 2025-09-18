import { HttpServer } from './networking/http/HttpServer';
import { RequestHandler } from './networking/http/RequestHandler';

const httpServer = new HttpServer('MAIN-HTTP');
const handler = new RequestHandler(httpServer);
const logger = httpServer.logger;

handler.onGet.connect(() => {
   logger.info('Request');
});

httpServer.start();
