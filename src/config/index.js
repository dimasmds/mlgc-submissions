import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  model: {
    url: process.env.MODEL_URL,
  },
  firestore: {
    databaseId: process.env.DATABASE_ID,
  },
};

export { config };
