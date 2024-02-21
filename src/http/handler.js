import * as crypto from 'crypto';
import { predict, preProcessingImage } from '../services/ml.js';
import { getPredictions, persistPrediction } from '../services/database.js';

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
  const processedImage = await preProcessingImage(image);
  const predictions = await predict(model, processedImage);

  const [score] = predictions;

  const prediction = {
    id: crypto.randomUUID(),
    result: score > 0.5 ? 'Cancer' : 'Non-cancer',
    suggestion: score > 0.5 ? 'Segera periksa ke dokter!' : 'Relax!',
    createdAt: new Date().toISOString(),
  };

  await persistPrediction(prediction);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data: prediction,
  });
  response.code(201);
  return response;
}

async function getPredictHistoriesHandler() {
  const predictions = await getPredictions();
  return {
    status: 'success',
    message: 'Prediction histories receives',
    data: predictions,
  };
}

export { postPredictHandler, getPredictHistoriesHandler };
