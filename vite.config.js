import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    // Source of assets to be compiled by Vite
    root: resolve('./static'),
    // STATIC_URL
    base: 'http://127.0.0.1:3000/static/',
    server: {
        // DJANGO_VITE_DEV_SERVER_HOST
        host: '127.0.0.1',
        // DJANGO_VITE_DEV_SERVER_PORT
        port: 3000,
        // Domain of generated asset URLs during development
        origin: 'http://127.0.0.1:3000',
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
            // Files referenced by any {% vite_asset '__PATH__' %}
            // or any {% vite_asset_url '__PATH__' %}
            // 
            // Keys do not matter, so long as they are unique.
            input: {
                code: resolve('./static/code/code.js'),
                boulderjoy: resolve('./static/code/imgs/boulderjoy.png'),
                skylarklogo: resolve('./static/code/imgs/skylark-logomark-color.svg'),
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
