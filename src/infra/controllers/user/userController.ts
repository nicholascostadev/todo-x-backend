import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../../entities/userEntity'
import { prisma } from '../../../../prisma/prismaClient'
import { idSchema, updateUserSchema, createUserSchema } from '../../../validations'
import { ZodError } from 'zod'

export class UserController {
  async create(req: FastifyRequest, res: FastifyReply): Promise<User> {
    try {
      const { email, username, name, password } = createUserSchema.parse(req.body)

      const data = await prisma.user.create({
        data: {
          email,
          username,
          name,
          password
        }
      })

      return await res.status(201).send({
        message: 'Success',
        data
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return await res.status(400).send({
          message: 'Validation Error',
          error: JSON.parse(error.message)
        })
      }

      return await res.status(400).send({
        message: 'Error',
        error
      })
    }
  }

  async get(req: FastifyRequest, res: FastifyReply): Promise<User[]> {
    try {
      const data = await prisma.user.findMany()

      return await res.status(200).send({
        message: 'Success',
        data
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return await res.status(400).send({
          message: 'Validation Error',
          error: JSON.parse(error.message)
        })
      }

      return await res.status(400).send({
        message: 'Error',
        error
      })
    }
  }

  async getById(req: FastifyRequest, res: FastifyReply): Promise<User> {
    try {
      const { id } = idSchema.parse(req.params)

      const data = await prisma.user.findUnique({
        where: {
          id
        }
      })

      return await res.status(200).send({
        message: 'Success',
        data
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return await res.status(400).send({
          message: 'Validation Error',
          error: JSON.parse(error.message)
        })
      }

      return await res.status(400).send({
        message: 'Error',
        error
      })
    }
  }

  async update(req: FastifyRequest, res: FastifyReply): Promise<User> {
    try {
      const { id } = idSchema.parse(req.params)
      const { email, name, username } = updateUserSchema.parse(req.body)

      const data = await prisma.user.update({
        where: {
          id
        },
        data: {
          email,
          name,
          username
        }
      })

      return await res.status(200).send({
        message: 'Success',
        data
      })
    } catch (error) {
      return await res.status(400).send({
        message: 'Error',
        error
      })
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const { id } = idSchema.parse(req.body)

      await prisma.user.delete({
        where: {
          id
        }
      })

      return await res.status(200).send({
        message: 'Success'
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return await res.status(400).send({
          message: 'Validation Error',
          error: JSON.parse(error.message)
        })
      }

      return await res.status(400).send({
        message: 'Error',
        error
      })
    }
  }
}
