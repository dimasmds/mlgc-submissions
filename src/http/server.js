import Hapi from '@hapi/hapi';
import { loadModel } from '../services/ml.js';
import { config } from '../config/index.js';
import { ClientError } from '../exceptions/index.js';
import { routes } from './routes.js';

async function createServer() {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: process.env.NODE_ENV === 'local' ? {
      request: ['error'],
    } : {},
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
        data: {},
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  const model = await loadModel();

  server.app = { model };

  server.route(routes);

  return server;
}

export { createServer };