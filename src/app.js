import express from 'express'
import routes from'./routes/index.js'
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(fileUpload());

app.use('/api', routes)


app.get('/', (req, res) => {
  res.send("API is running ...")
})


export default app