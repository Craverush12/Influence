import 'server-only'
import bcrypt from 'bcryptjs'
import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SALT_ROUNDS = 10
const SESSION_DURATION = 60 * 60 * 24 * 7 // 1 week

export async function hashPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000)
    const cookieStore = await cookies()

    // In a real production app, you might want to sign this ID or use a JWT
    // For now, we'll store the user ID in a secure, HTTP-only cookie
    cookieStore.set('session', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (!session) return null
    return session
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function getCurrentUser() {
    const userId = await getSession()
    if (!userId) return null

    const supabase = await createClient()
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    return user
}
