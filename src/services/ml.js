import * as tf from '@tensorflow/tfjs-node';
import { config } from '../config/index.js';
import { PredictError } from '../exceptions/index.js';

function loadModel() {
  return tf.loadGraphModel(config.model.url);
}

function preProcessingImage(imageBuffer) {
  return tf.node
    .decodeImage(imageBuffer, 3)
    .resizeNearestNeighbor([224, 224])
    .expandDims(0)
    .toFloat();
}

async function predict(model, image) {
  try {
    const result = await model.predict(image).data();
    return Array.from(result);
  } catch (error) {
    throw new PredictError(error.message);
  }
}

export { loadModel, preProcessingImage, predict };
