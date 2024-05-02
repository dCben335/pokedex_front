/** @type {import('next').NextConfig} */


const path = require('path');


const nextConfig = {
    basePath: '/pokedex_front',
    output: "export",
    reactStrictMode: true,
    
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "/src/app/_utils.scss";`
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};


module.exports = nextConfig;