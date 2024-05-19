import express from 'express'
import fs from 'fs/promises'
import path from 'path'

import {fileURLToPath} from 'url'

import {SERVER_PORT, uuidv4} from './utils/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.post('/application', async (req, res) => {
  const body = JSON.stringify(req.body, null, 4)
  const fileName = `${uuidv4()}.json`
  const filePath = path.resolve(__dirname, 'applications', fileName)
  await fs.writeFile(fileName, body)
  res.json({response: 'ok'})
})

app.listen(3000, () => {
  console.log(`Server started on port ${SERVER_PORT}`)
})
