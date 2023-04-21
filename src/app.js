import express from 'express'
import bodyParser from 'body-parser'
import multer, { diskStorage } from 'multer'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  express.static(path.join(new URL('./public', import.meta.url).pathname))
)
app.use(bodyParser.json())
app.use(cors())

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('photo'), (req, res) => {
  // save filename nya ke database

  // return url ke user

  const finalImageURL =
    req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename

  res.json({ image: finalImageURL })
})

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  console.log('Listening server')
  debugger
  res.send('hello world')
})

app.listen(port, (e) => {
  if (e) throw e
  console.log(`Server is running on http://localhost:${port}`)
})
