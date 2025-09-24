import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import bands from '../data/bands.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bandsRouter = express.Router()

bandsRouter.get('/', (req, res) => {
    res.status(200).json(bands)
})

bandsRouter.get('/:bandId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../frontend/public/band.html"))
})

export default bandsRouter