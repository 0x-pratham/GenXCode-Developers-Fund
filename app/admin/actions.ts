'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateDonationStatus(donationId: string, newStatus: 'approved' | 'rejected') {
  const supabase = await createClient()

  // The RLS policy we created in step 1 ensures only admins can perform this update
  const { error } = await supabase
    .from('donations')
    .update({ status: newStatus })
    .eq('id', donationId)

  if (error) {
    throw new Error("Failed to update donation: " + error.message)
  }

  // Refresh the admin page and the Hall of Fame page so the new totals show up immediately
  revalidatePath('/admin')
  revalidatePath('/hall-of-fame')
}