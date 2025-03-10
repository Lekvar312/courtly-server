import express from 'express'
import routes from'./routes/index.js'
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

app.use(fileUpload());

app.use('/api', routes)


app.get('/', (req, res) => {
  res.send("API is running ...")
})


export default app