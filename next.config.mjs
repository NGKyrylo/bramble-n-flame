/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules.push({
            test: /\.mjs$/,
            type: "javascript/auto",
        });

        config.module.rules.push({
            test: /pdf\.worker\.min\.mjs$/,
            type: "asset/resource",
        });

        return config;
    },
};

export default nextConfig;
