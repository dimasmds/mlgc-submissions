import { createServer } from './http/server.js';

const server = await createServer();
await server.start();

console.log(`server run at ${server.info.uri}`);
