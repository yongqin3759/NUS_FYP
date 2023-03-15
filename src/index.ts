import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config'
import logger from './utils/logger'
import {schema} from './gql/schema'
import PersonalData from './models/PersonalData.model'

async function main() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      logger.info(`Connected to MongoDB @ ${MONGODB_URI}`)
      let listOfCollections = Object.keys(mongoose.connection.collections)
      logger.info('------------------------------------------')
      logger.info('List of Collections')
      logger.info(listOfCollections)
      logger.info('------------------------------------------')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })

  const personalData = new PersonalData({
    fullName: {
      value: 'yong Qin',
      expiry: new Date(),
    },
  })

  await personalData.save()

  const yoga = createYoga({
    schema,
  })

  const server = createServer(yoga)
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
}

main().catch(console.error)
