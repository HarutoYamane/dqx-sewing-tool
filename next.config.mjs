/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'okkzsboopbngrdafnvhc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // systemAdminページとAPIをビルド対象外にする
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./src/app/workspace/systemAdmin/**/*', './src/app/api/systemAdmin/**/*'],
    },
  },
};

export default nextConfig;
