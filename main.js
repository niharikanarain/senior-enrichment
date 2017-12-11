'use strict';

const db = require('./server/db/models/index').db
const app = require('./server')
const PORT = 1337;
const seed = require('./seed').seed

db.sync({ force: true }) // if you update your db schemas, make sure you drop the tables first and then recreate them
.then(() => {
  console.log('Seeding database...')
  return seed()
})
.then(() => {
  console.log('db synced')
  app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
})
.catch(err => console.error(err))
