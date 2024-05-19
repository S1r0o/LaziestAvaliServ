import express from 'express'
import fs from 'fs/promises'
import fsSync from 'fs'
import cors from 'cors'
import path from 'path'

import {fileURLToPath} from 'url'

import {SERVER_PORT, uuidv4} from './utils/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())

app.post('/application', async (req, res) => {
  try {
    const body = JSON.stringify(req.body, null, 4)
    const fileName = `${uuidv4()}.json`
    const dirPath = path.resolve(__dirname, 'applications')
    if (!fsSync.existsSync(dirPath)) {
      await fs.mkdir(dirPath)
    }
    const filePath = path.resolve(dirPath, fileName)
    await fs.writeFile(filePath, body)
    res.json({response: 'ok'})
  } catch (err) {
    res.status(500).json({response: err.message})
  }
})

app.listen(3000, () => {
  console.log(`Server started on port ${SERVER_PORT}`)
})
