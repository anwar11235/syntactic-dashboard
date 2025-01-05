'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase, type Profile } from '@/lib/supabase'
import { toast } from 'sonner'

interface ProfileData {
  fullName: string
  email: string
  company: string
  gender: string
  age: string
  purpose: string
  phoneNumber: string
  timezone: string
}

interface ProfileContextType {
  profileData: ProfileData | null
  isProfileComplete: boolean
  updateProfile: (data: ProfileData) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const isProfileComplete = Boolean(
    profileData?.fullName &&
    profileData?.email &&
    profileData?.company &&
    profileData?.gender &&
    profileData?.purpose
  )

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error

      if (profile) {
        setProfileData({
          fullName: profile.full_name || '',
          email: user?.email || '',
          company: profile.company || '',
          gender: profile.gender || '',
          age: profile.age?.toString() || '',
          purpose: profile.purpose || '',
          phoneNumber: profile.phone_number || '',
          timezone: profile.timezone || '',
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error('Failed to load profile')
    }
  }

  const updateProfile = async (data: ProfileData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: data.fullName,
          company: data.company,
          gender: data.gender,
          age: data.age ? parseInt(data.age) : null,
          purpose: data.purpose,
          phone_number: data.phoneNumber,
          timezone: data.timezone,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setProfileData(data)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw new Error('Failed to update profile')
    }
  }

  return (
    <ProfileContext.Provider value={{ profileData, isProfileComplete, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 