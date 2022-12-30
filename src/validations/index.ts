import { z } from 'zod'

export const idSchema = z.object({
  id: z.string({
    invalid_type_error: '`id` has to be of type `string`',
    required_error: '`id` is required'
  }).min(1, '`id` is required').cuid('`id` is invalid')
})

export const createUserSchema = z.object({
  name: z.string({
    invalid_type_error: '`name` has to be of type `string`',
    required_error: '`name` is required'
  }).min(1, '`name` is required'),
  username: z.string({
    invalid_type_error: '`username` has to be of type `string`',
    required_error: '`username` is required'
  }).min(3, '`username` has to have at least 3 characters'),
  email: z.string({
    invalid_type_error: '`email` has to be of type `string`',
    required_error: '`email` is required'
  }).min(1, '`email` is required').email('`email` is invalid'),
  password: z.string({
    invalid_type_error: '`password` has to be of type `string`',
    required_error: '`password` is required'
  }).min(1, '`password` is required')
})

export const updateUserSchema = z.object({
  name: z.string({
    invalid_type_error: '`name` has to be of type `string`',
    required_error: '`name` is required'
  }).min(1, '`name` is required'),
  username: z.string({
    invalid_type_error: '`username` has to be of type `string`',
    required_error: '`username` is required'
  }).min(3, '`username` has to have at least 3 characters'),

  email: z.string({
    invalid_type_error: '`email` has to be of type `string`',
    required_error: '`email` is required'
  }).min(1, '`email` is required').email('`email` is invalid')
}).partial().refine(({ name, username, email }) => (name !== undefined || username !== undefined || email !== undefined), { message: '`name`, `username` or `email` is needed at least' })
