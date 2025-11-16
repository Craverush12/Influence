import { createClient } from './client'

const BUCKET_NAME = 'creator-uploads'

export async function uploadImage(file: File, folder: string): Promise<string> {
  const supabase = createClient()
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`
  const path = `${folder}/${filename}`

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw new Error(error.message)

    const { data: publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path)

    console.log("[v0] Upload successful:", publicUrl.publicUrl)
    return publicUrl.publicUrl
  } catch (err) {
    console.log("[v0] Upload error:", err)
    throw err
  }
}

export async function deleteImage(path: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) throw new Error(error.message)
}
