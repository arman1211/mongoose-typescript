import app from './app'
import config from './app/config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      writeConcern: { w: 'majority' },
    })
    app.listen(config.port, () => {
      console.log(`xample app listening on port ${config.port}`)
    })
  } catch (err) {
    console.error(err)
  }
}
main()
