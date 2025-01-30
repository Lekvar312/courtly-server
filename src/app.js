import express from 'express'
import routes from'./routes/index.js'
import fileUpload from 'express-fileupload';


const app = express()

app.use(express.json())

app.use(fileUpload());

app.use('/api', routes)


app.get('/', (req, res) => {
  res.send("API is running ...")
})


export default app