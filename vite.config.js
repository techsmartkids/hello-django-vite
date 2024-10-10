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
                boulder: resolve('./static/code/imgs/boulder.jpg'),
                logomark: resolve('./static/code/imgs/logomark.svg'),
            },
        },
    },
    css: {
        // Enable development CSS source maps,
        // so that each inserted <style> block is associated with a .css file
        devSourcemap: true,
    },
    resolve: {
        alias: {
            // Enable absolute imports like:
            //     import { ... } from '@ts/app/foo.js';
            '@ts': resolve('./static'),
            
            // Libraries
            'jquery': resolve('./node_modules/jquery/dist/jquery.js'),
            'mdl': resolve('./node_modules/material-design-lite/dist/material.js'),
            'mdl-css': resolve('./node_modules/material-design-lite/dist/material.css'),
            'vue': resolve('./node_modules/vue/dist/vue.esm-browser.js'),
            'backbone': resolve('./node_modules/backbone/backbone.js'),
            'underscore': resolve('./node_modules/underscore/underscore.js'),
        },
    },
});
