/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Windows 上并发导出 /404 与 /404.html 会争抢同一文件导致 EPERM，限制为单 worker
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
