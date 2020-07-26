import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  port: process.env.PORT || 3000,

  databaseURL: process.env.MONGODB_URI || "",

  jwtSecret: process.env.JWT_SECRET || "",

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  api: {
    prefix: '/api',
  }
};