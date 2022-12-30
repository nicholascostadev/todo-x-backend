import { controllers } from '../../../infra/controllers'

export const userRoutes = async (app: any, options: any): Promise<void> => {
  app.post('/', controllers.user.create)

  app.get('/', controllers.user.get)

  app.get('/:id', controllers.user.getById)

  app.put('/:id', controllers.user.update)

  app.delete('/', controllers.user.delete)
}
