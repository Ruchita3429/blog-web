import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/signup' || path === '/signin'
  
  const isAuthenticated = request.cookies.get('token')?.value || ''

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [ '/profile/:path*','/blog', '/signup', '/signin'],
}
