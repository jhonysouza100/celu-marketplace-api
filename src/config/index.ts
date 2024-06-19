import 'dotenv/config'

const index = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD:process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  BREVO_API_KEY: process.env.BREVO_API_KEY
}

export default index;