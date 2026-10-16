'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

type DonationSubmissionState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fileName?: string
  proofUrl?: string
}

export async function submitDonation(
  _previousState: DonationSubmissionState,
  formData: FormData
): Promise<DonationSubmissionState> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { status: 'error', message: 'Please log in before submitting payment proof.' }
    }

    const amount = formData.get('amount') as string
    const file = formData.get('screenshot') as File
    const message = formData.get('message') as string

    if (!file || file.size === 0 || !amount) {
      return { status: 'error', message: 'Amount and screenshot are required.' }
    }

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return { status: 'error', message: 'Enter a valid donation amount greater than zero.' }
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      return { status: 'error', message: 'File size exceeds the 5MB limit. Please compress your screenshot.' }
    }
    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isImage && !isPdf) {
      return { status: 'error', message: 'Invalid file format. Please upload an image or PDF.' }
    }

    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file)

    if (uploadError) {
      return { status: 'error', message: 'Failed to upload payment proof: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(filePath)

    const { error: dbError } = await supabase
      .from('donations')
      .insert({
        user_id: user.id,
        amount: parsedAmount,
        screenshot_url: publicUrlData.publicUrl,
        status: 'pending',
        message: message ? message.trim() : null
      })

    if (dbError) {
      return { status: 'error', message: 'The proof uploaded, but the donation record could not be saved. Please contact support before trying again.' }
    }

    revalidatePath('/dashboard')
    return {
      status: 'success',
      message: 'Your payment proof has been uploaded successfully and submitted for verification. We’ll review it and update your donation status.',
      fileName: file.name,
      proofUrl: publicUrlData.publicUrl
    }
  } catch {
    return { status: 'error', message: 'Something went wrong while submitting your payment proof. Please try again.' }
  }
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

  const updatePayload: any = { name, bio, github_url, portfolio_url };
  if (avatar_url) updatePayload.avatar_url = avatar_url;

  const { error: dbError } = await supabase
    .from('profiles')
    .update(updatePayload)
    .eq('id', user.id);

  if (dbError) throw new Error("Failed to update profile: " + dbError.message);

  revalidatePath('/dashboard');
}