/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com//:path*',
      },
    ]
  },
};

export default nextConfig;
