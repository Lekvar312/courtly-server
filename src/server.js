import app from './app.js'
import dataBaseConnection from './config/db.js'
import dotenv from 'dotenv'

dotenv.config() 

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Serever sterted on port ${PORT}`)
})
dataBaseConnection()