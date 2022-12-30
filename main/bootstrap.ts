import Fastify from 'fastify'

const PORT = 4000

const app = Fastify({
  logger: true
})

app.listen({
  port: PORT
}, (err) => {
  if (err != null) {
    app.log.error(err)
  }
  console.log(`Server is listening on port ${PORT}`)
})
