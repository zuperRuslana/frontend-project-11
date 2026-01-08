import { object, string } from 'yup'

export let userSchema = object({
  url: string().url(),
})
