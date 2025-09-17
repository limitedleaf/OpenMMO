import { Logger } from '@core/logging/Logger';
import { LoggerMode } from '@core/logging/Mode';
import { readFile } from 'fs';
import { createServer, ServerResponse } from 'http';
import { extname, join, resolve } from 'path';
import { promisify } from 'util';

const logger = new Logger({
   prefix: '[MAIN]',
   mode: LoggerMode.Debug,
   filepath: resolve(__dirname, '../../logs/main.log')
})

const asyncReadFile = promisify(readFile);

const PORT = 30007;

const publicDir = join(__dirname, '../../public');
const htmlDir = join(publicDir, 'assets/index.html');

const contentTypes: Record<string, string> = {
   '.js': 'application/javascript',
   '.html': 'text/html',
   '.ico': 'image/x-icon',
};

async function serveIndex(res: ServerResponse) {
   res.writeHead(200, { 'content-type': 'text/html' });
   const htmlData = await asyncReadFile(htmlDir);
   res.end(htmlData);
}

const server = createServer(async (req, res) => {
   logger.debug('Request Received');

   if (!req.method || req.method != 'GET') {
      logger.debug('Unsupported method, returning index.html');
      await serveIndex(res);
      return;
   }

   if (!req.url || req.url == '/' || req.url == '') {
      logger.debug('No url or home url, returning index.html');
      await serveIndex(res);
      return;
   }

   const url = new URL(req.url, 'http://localhost:3000');
   const path = join(publicDir, url.pathname);

   logger.debug('Requested path: ', path);

   if (!path.startsWith(publicDir)) {
      logger.debug('Path outside public dir: aborting response with 403');
      res.writeHead(403).end();
      return;
   }

   try {
      const ext = extname(path);
      const contentType = contentTypes[ext];
      if (!contentType) {
         logger.debug('Unsupported content-type, aborting with 404, ext:', ext);
         res.writeHead(404).end();
         return;
      }
      const data = await asyncReadFile(path);
      res.writeHead(200, { 'content-type': contentType });
      res.end(data);
      logger.debug('Successfully processed request');
   } catch (err) {
      logger.debug('Error occurred while reading file, err:', err);
      res.writeHead(404).end();
   }
});

server.listen(3000);
logger.info('Server running in http://localhost:3000');
