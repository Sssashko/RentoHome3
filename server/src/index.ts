import { CLIENT_URL, PORT } from 'config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'
import { passport } from 'middleware'
import { join } from 'path'
import { authRouter, homesRouter, healthRouter, usersRouter, emailRouter, commentRouter } from 'routes'


const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

app.use(passport.initialize())

app.use('/images', express.static(join(__dirname, '..', 'images')))

app.use('/health', healthRouter)
app.use('/homes', homesRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/email', emailRouter);
app.use('/comments', commentRouter);


app.use('*', (req, res) => {
	res.status(404).json({ message: 'Not found' });
  });  

  app.use('/', (req, res) => {
	res.send('<h1>Hello, world!</h1>');
  });

app.listen(PORT, () => {
	console.log('Server is working!')
})
