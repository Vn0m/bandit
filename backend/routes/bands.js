import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import BandsController from '../controllers/bands.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bandsRouter = express.Router()

bandsRouter.get('/', BandsController.getBands)

bandsRouter.get('/:bandId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../frontend/public/band.html"))
})

export default bandsRouter