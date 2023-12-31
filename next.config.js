/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/neovim-typescript',
        destination: '/writing/neovim-typescript',
        permanent: true,
      },
      {
        source: '/blog/building-effective-remote-work-environments',
        destination: '/writing/building-effective-remote-work-environments',
        permanent: true,
      },
      {
        source: '/blog/echoing-statsd-metrics-locally',
        destination: '/writing/echoing-statsd-metrics-locally',
        permanent: true,
      },
      {
        source: '/blog/display-current-k8s-context-in-shell',
        destination: '/writing/display-current-k8s-context-in-shell',
        permanent: true,
      },
      {
        source: '/blog/managing-postgres-schema-changes-with-migra',
        destination: '/writing/managing-postgres-schema-changes-with-migra',
        permanent: true,
      },
      {
        source: '/blog/php-a-prettier-way-to-vardump',
        destination: '/writing/php-a-prettier-way-to-vardump',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
