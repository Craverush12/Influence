import bcrypt from 'bcryptjs'
import { createClient } from './supabase/client'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function signUp(email: string, password: string, username: string, displayName: string) {
  const supabase = createClient()
  const passwordHash = await hashPassword(password)

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        password_hash: passwordHash,
        username,
        display_name: displayName,
      },
    ])
    .select()

  if (error) throw new Error(error.message)
  return data?.[0] || null
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !users) throw new Error('User not found')

  const passwordMatch = await verifyPassword(password, users.password_hash)
  if (!passwordMatch) throw new Error('Invalid password')

  return users
}
