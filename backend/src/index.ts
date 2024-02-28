import express, { Request, Response }  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/userRouter'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tsthewavedb'
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI)
.then (() => {
  console.log('Connected to MongoDB')
})
.catch(() => {
  console.log('Could not connect to MongoDB')
})

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)


app.use(express.static(path.join(__dirname, '../../frontend/.dist')))
app.get('*', (req: Request, res: Response) =>
res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
