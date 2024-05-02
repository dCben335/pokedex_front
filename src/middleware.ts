"use server"

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserInfoFromToken } from './libs/routes/entities/user'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
 
const entryRoutes = ['/login', '/register']

export const middleware = async(request: NextRequest) => {
  const cookies = request.cookies.getAll()
  const token  = cookies.find(cookie => cookie.name === 'token')
  
  if (request.nextUrl.pathname.startsWith('/admin')) {  
    return handleAdminRoutes(request, token)
  }
 
  if (entryRoutes.includes(request.nextUrl.pathname)) {
    return handleEntryRoutes(request, token)
  }
}

const handleAdminRoutes = async(request: NextRequest, token: RequestCookie | undefined) => {
  if (!token || !token?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = await getUserInfoFromToken(token.value)
    if (!user?.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
}

const handleEntryRoutes = async(request: NextRequest, token: RequestCookie | undefined) => {
  if (token && token?.value) {
    const user = await getUserInfoFromToken(token.value)
    if (user.login) {
      return NextResponse.redirect(new URL(`/trainers/${user.login}`, request.url))
    }
  }
}