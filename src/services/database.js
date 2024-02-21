import { Firestore } from '@google-cloud/firestore';
import { config } from '../config/index.js';

const db = new Firestore({
  databaseId: config.firestore.databaseId,
});

async function persistPrediction(prediction) {
  const predictionCollection = db.collection('prediction');
  await predictionCollection.doc(prediction.id).set(prediction);
}

async function getPredictions() {
  const predictionCollection = db.collection('prediction');
  const snapshot = await predictionCollection.get();

  if (snapshot.empty) {
    return [];
  }

  const predictions = [];

  snapshot.forEach((doc) => {
    const prediction = {
      id: doc.id,
      history: doc.data(),
    };

    predictions.push(prediction);
  });

  return predictions;
}

export { persistPrediction, getPredictions };
