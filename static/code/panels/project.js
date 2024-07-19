// Panels and components can import/inject their own CSS directly.
// 
// However if an error occurs in the imported/injected CSS, Dev Tools
// cannot show the line number where the error occurred in the original CSS file.
import '@ts/code/panels/project.css';

// URLs for assets (like images) can be imported in JS directly.
import boulderImageUrl from '@ts/code/imgs/boulder.jpg';
import logomarkImageUrl from '@ts/code/imgs/logomark.svg';

// Import libraries
import $ from 'jquery';
import 'mdl';
//import 'mdl-css';  // overrides regular styles like h1
import * as Vue from 'vue';
import moment from 'moment';
import Backbone from 'backbone';
import _ from 'underscore';

export function setupProjectPanel() {
    console.log('setupProjectPanel called');
    
    const imageDom1 = document.createElement('img');
    imageDom1.src = boulderImageUrl;
    document.querySelector('#ts-png-js-image').appendChild(imageDom1);
    
    const imageDom2 = document.createElement('img');
    imageDom2.src = logomarkImageUrl;
    document.querySelector('#ts-svg-js-image').appendChild(imageDom2);
    
    // Ensure libraries work
    {
        // Ensure $ works
        if ($) {
            $('#ts-libref-jquery__status').text('OK');
        }
        
        // Ensure MDL works
        const mdlOk = !!(componentHandler && componentHandler.upgradeElement);
        document.querySelector('#ts-libref-mdl__status').textContent =
            (mdlOk) ? 'OK' : 'Not Found';
        
        // Ensure Vue works
        if (Vue) {
            Vue.createApp({
                template: 'OK',
            }).mount('#ts-libref-vue__status');
        }
        
        // Ensure Moment works
        const momentOk = !!(moment && moment.duration);
        document.querySelector('#ts-libref-moment__status').textContent =
            (momentOk) ? 'OK' : 'Not Found';
        
        // Ensure Backbone works
        const backboneOk = !!(Backbone && Backbone.Model && Backbone.View);
        document.querySelector('#ts-libref-backbone__status').textContent =
            (backboneOk) ? 'OK' : 'Not Found';
        
        // Ensure Underscore works
        const underscoreOk = !!(_ && _.debounce && _.throttle && _.template);
        document.querySelector('#ts-libref-underscore__status').textContent =
            (underscoreOk) ? 'OK' : 'Not Found';
    }
}
