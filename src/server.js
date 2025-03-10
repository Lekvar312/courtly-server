import app from './app.js'
import dataBaseConnection from './config/db.js'
import dotenv from 'dotenv'

dotenv.config() 

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Serever sterted on port ${PORT}`)
})
dataBaseConnection()