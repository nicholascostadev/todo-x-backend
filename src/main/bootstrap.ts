import Fastify from 'fastify'
import { userRoutes } from './routes/user/userRoutes'

const PORT = 4000

const app = Fastify({
  logger: true
})

app.register(userRoutes, { prefix: '/user' })

app.post('/', async (req, res) => {
  await res.status(201).send(req.body)
})

app.listen({
  port: PORT
}, (err) => {
  if (err != null) {
    app.log.error(err)
  }
  console.log(`Server is listening on port ${PORT}`)
})
