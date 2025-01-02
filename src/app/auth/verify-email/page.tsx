'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <p className="text-muted-foreground">
            We've sent you a verification link to your email address.
            Please click the link to verify your account.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Didn't receive the email? Check your spam folder or try signing in again.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">
              Return to login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 