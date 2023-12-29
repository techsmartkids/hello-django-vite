// Required by Vite on all root .js files
import 'vite/modulepreload-polyfill';

import { setupProjectPanel } from './panels/project.js';

setupProjectPanel();
console.log('code.js loaded');
