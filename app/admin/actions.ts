'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Existing status update
export async function updateDonationStatus(id: string, status: 'approved' | 'rejected') {
  const supabase = await createClient()
  const { error } = await supabase
    .from('donations')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error("Failed to update status")
  revalidatePath('/admin')
}

// NEW: Message Moderation
export async function updateDonationMessage(id: string, new_message: string | null) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('donations')
    .update({ message: new_message })
    .eq('id', id)

  if (error) throw new Error("Failed to update message")
  revalidatePath('/admin')
}

// NEW: Global User Ban
export async function banUser(userId: string, donationId: string) {
  const supabase = await createClient()
  
  // 1. Mark user as banned in profiles
  const { error: banError } = await supabase
    .from('profiles')
    .update({ is_banned: true })
    .eq('id', userId)

  if (banError) throw new Error("Failed to ban user")

  // 2. Reject their current pending donation immediately
  await supabase
    .from('donations')
    .update({ status: 'rejected' })
    .eq('id', donationId)

  revalidatePath('/admin')
}