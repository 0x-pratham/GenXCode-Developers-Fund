'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitDonation(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const amount = formData.get('amount') as string
  const file = formData.get('screenshot') as File
  const message = formData.get('message') as string // Captured from the new UI

  if (!file || file.size === 0 || !amount) {
    throw new Error("Amount and screenshot are required.")
  }

  // SECURITY CHECKS: Limit to 5MB and ensure it is an image
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 5MB limit. Please compress your screenshot.");
  }
  if (!file.type.startsWith('image/')) {
    throw new Error("Invalid file format. Only images are allowed.");
  }

  // Generate a unique file path
  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${Date.now()}.${fileExt}`
  
  // Upload the file to the Supabase Storage Bucket
  const { error: uploadError } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file)

  if (uploadError) throw new Error("Failed to upload screenshot: " + uploadError.message)

  // Get the public URL for the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from('payment-proofs')
    .getPublicUrl(filePath)

  // Insert the pending donation into the database
  const { error: dbError } = await supabase
    .from('donations')
    .insert({
      user_id: user.id,
      amount: parseFloat(amount),
      screenshot_url: publicUrlData.publicUrl,
      status: 'pending',
      message: message ? message.trim() : null // Injects the message safely
    })

  if (dbError) throw new Error("Failed to record donation: " + dbError.message)

  revalidatePath('/dashboard')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const name = formData.get('name') as string
  const bio = formData.get('bio') as string
  const github_url = formData.get('github_url') as string
  const portfolio_url = formData.get('portfolio_url') as string
  const avatarFile = formData.get('avatar_file') as File | null

  let avatar_url = undefined;

  // Process Avatar Upload if a new file was selected
  if (avatarFile && avatarFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
    if (avatarFile.size > MAX_FILE_SIZE) throw new Error("Avatar exceeds 5MB limit.");
    if (!avatarFile.type.startsWith('image/')) throw new Error("Avatar must be an image.");

    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) throw new Error("Failed to upload avatar: " + uploadError.message);

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
      
    avatar_url = publicUrlData.publicUrl;
  }

  // Construct the update payload dynamically
  const updatePayload: any = { name, bio, github_url, portfolio_url };
  if (avatar_url) updatePayload.avatar_url = avatar_url;

  const { error: dbError } = await supabase
    .from('profiles')
    .update(updatePayload)
    .eq('id', user.id);

  if (dbError) throw new Error("Failed to update profile: " + dbError.message);

  revalidatePath('/dashboard');
}