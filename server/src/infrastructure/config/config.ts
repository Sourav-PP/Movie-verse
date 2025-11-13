import dotenv from 'dotenv';
dotenv.config();


function required(name: string, value?: string): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}


export const appConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
    frontendUrl: process.env.FRONTEND_URL
  },

  omdb: {
    apiKey: required('OMDB_API_KEY', process.env.OMDB_API_KEY)
  }
}