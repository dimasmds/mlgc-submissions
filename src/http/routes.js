import { getPredictHistoriesHandler, postPredictHandler } from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/predict',
    handler: (request, h) => postPredictHandler(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: () => getPredictHistoriesHandler(),
  },
];

export { routes };
