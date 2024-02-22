import * as tf from '@tensorflow/tfjs-node';
import { config } from '../config/index.js';
import { PredictError, PreprocessingError } from '../exceptions/index.js';

function loadModel() {
  return tf.loadGraphModel(config.model.url);
}

function preProcessingImage(imageBuffer) {
  try {
    return tf.node
      .decodeJpeg(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims(0)
      .toFloat();
  } catch (error) {
    throw new PreprocessingError('Terjadi kesalahan dalam mengonversi gambar! Yakin input gambar?');
  }
}

async function predict(model, image) {
  try {
    const result = await model.predict(image).data();
    return Array.from(result);
  } catch (error) {
    throw new PredictError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

export { loadModel, preProcessingImage, predict };
