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
        // Don't open browser on server start
        open: false,
    },
    build: {
        // DJANGO_VITE_ASSETS_PATH
        outDir: resolve('./local/static_vite'),
        // Delete old files from output directory
        emptyOutDir: true,
        // Generate .vite/manifest.json file, needed by django-vite
        manifest: true,
        rollupOptions: {
            // Root .js files referenced by {% vite_asset '__PATH__.js' %}
            input: {
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
