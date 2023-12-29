import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    // Source of assets to be compiled by Vite
    root: resolve('./static'),
    // STATIC_URL
    base: '/static/',
    server: {
        // DJANGO_VITE_DEV_SERVER_HOST
        host: 'localhost',
        // DJANGO_VITE_DEV_SERVER_PORT
        port: 3000,
    },
    build: {
        manifest: true,
        // DJANGO_VITE_ASSETS_PATH
        outDir: resolve('./local/static_vite'),
        rollupOptions: {
            input: {
                // Root .js files referenced by {% vite_asset '__PATH__.js' %}
                code: resolve('./static/code/code.js'),
            },
        },
    },
    resolve: {
        alias: {
            // Enable absolute imports like:
            //     import { ... } from '@ts/app/foo.js';
            '@ts': resolve('./static'),
        },
    },
});
