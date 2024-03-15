// Panels and components can import/inject their own CSS directly.
// 
// However if an error occurs in the imported/injected CSS, Dev Tools
// cannot show the line number where the error occurred in the original CSS file.
import '@ts/code/panels/project.css';

// URLs for assets (like images) can be imported in JS directly.
import boulderImageUrl from '@ts/code/imgs/boulderjoy.png';
import skylarkImageUrl from '@ts/code/imgs/skylark-logomark-color.svg';

export function setupProjectPanel() {
    console.log('setupProjectPanel called');
    
    const imageDom1 = document.createElement('img');
    imageDom1.src = boulderImageUrl;
    document.querySelector('#ts-png-js-image').appendChild(imageDom1);
    
    const imageDom2 = document.createElement('img');
    imageDom2.src = skylarkImageUrl;
    document.querySelector('#ts-svg-js-image').appendChild(imageDom2);
}
