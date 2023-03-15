import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
let mongoUri: string


switch(process.env.NODE_ENV){
  case 'test':
    mongoUri = process.env.TEST_MONGODB_URI!
    break
  case 'dev':
    mongoUri = process.env.DEV_MONGODB_URI!
    break
  case 'uat':
    mongoUri = process.env.UAT_MONGODB_URI!
    break
  case 'prod':
    mongoUri = process.env.PROD_MONGODB_URI!
    break
  default:
    mongoUri = ''
}

export const MONGODB_URI = mongoUri
