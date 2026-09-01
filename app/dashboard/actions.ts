'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitDonation(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const amount = formData.get('amount') as string
  const file = formData.get('screenshot') as File

  if (!file || file.size === 0 || !amount) {
    throw new Error("Amount and screenshot are required.")
  }

  // 1. SECURITY CHECKS: Limit to 5MB and ensure it is an image
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 5MB limit. Please compress your screenshot.");
  }
  if (!file.type.startsWith('image/')) {
    throw new Error("Invalid file format. Only images are allowed.");
  }

  // 2. Generate a unique file path
  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${Date.now()}.${fileExt}`
  
  // 3. Upload the file to the Supabase Storage Bucket
  const { error: uploadError } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file)

  if (uploadError) throw new Error("Failed to upload screenshot: " + uploadError.message)

  // 4. Get the public URL for the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from('payment-proofs')
    .getPublicUrl(filePath)

  // 5. Insert the pending donation into the database
  const { error: dbError } = await supabase
    .from('donations')
    .insert({
      user_id: user.id,
      amount: parseFloat(amount),
      screenshot_url: publicUrlData.publicUrl,
      status: 'pending'
    })

  if (dbError) throw new Error("Failed to record donation: " + dbError.message)

  revalidatePath('/dashboard')
}