const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://blog-website-peach-theta.vercel.app/'
  }
  return 'http://localhost:3000'
}

export const config = {
  baseUrl: getBaseUrl()
} 
export default config;