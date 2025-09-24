import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import bandsRouter from './routes/bands.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/public', express.static('../frontend/public'))
app.use('/scripts', express.static('../frontend/public/scripts'))
app.use(express.static('../frontend')) 

app.use('/bands', bandsRouter)

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../frontend/index.html"))
})

app.use((req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, "../frontend/public/404.html"))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})