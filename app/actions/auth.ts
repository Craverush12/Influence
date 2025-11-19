'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hashPassword, verifyPassword, createSession, deleteSession } from '@/lib/auth-service'
import { z } from 'zod'

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    displayName: z.string().min(2, 'Display name must be at least 2 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
})

export type AuthState = {
    error?: string
    success?: boolean
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const validatedFields = signupSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        username: formData.get('username'),
        displayName: formData.get('displayName'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        return {
            error: errors.password?.[0] || errors.confirmPassword?.[0] || 'Invalid input',
        }
    }

    const { email, password, username, displayName } = validatedFields.data
    const supabase = await createClient()

    // Check if user exists
    const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .or(`email.eq.${email},username.eq.${username}`)
        .single()

    if (existingUser) {
        return { error: 'User with this email or username already exists' }
    }

    const passwordHash = await hashPassword(password)

    const { data: newUser, error } = await supabase
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
        .single()

    if (error) {
        return { error: error.message }
    }

    await createSession(newUser.id)
    redirect('/profile/setup')
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return { error: 'Invalid input' }
    }

    const { email, password } = validatedFields.data
    const supabase = await createClient()

    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (!user) {
        return { error: 'Invalid credentials' }
    }

    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
        return { error: 'Invalid credentials' }
    }

    await createSession(user.id)
    redirect('/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/auth/login')
}
