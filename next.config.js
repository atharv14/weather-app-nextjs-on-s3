module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
    unoptimized: true,
  },
  output: 'export',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production'
      ? 'http://ec2-35-173-133-111.compute-1.amazonaws.com'
      : 'http://localhost:8000',
  },
}