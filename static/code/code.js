// All .css MUST be imported by imports from inside .js files.
// 
// The django-vite library does NOT support referring to
// .css files via {% vite_asset '*.css' %} inside HTML
// and indeed it doesn't work when DEBUG=False.
import '@ts/code/code.css';

import { setupProjectPanel } from '@ts/code/panels/project.js';

setupProjectPanel();
console.log('code.js loaded');
