// Panels and components can import/inject their own CSS directly.
// 
// However if an error occurs in the imported/injected CSS, Dev Tools
// cannot show the line number where the error occurred in the original CSS file.
import '@ts/code/panels/project.css';

// URLs for assets (like images) can be imported in JS directly.
import boulderImageUrl from '@ts/code/imgs/boulderjoy.png';

export function setupProjectPanel() {
    console.log('setupProjectPanel called');
    
    const imageDom = document.createElement('img');
    imageDom.src = boulderImageUrl;
    document.querySelector('#ts-js-image').appendChild(imageDom);
}
