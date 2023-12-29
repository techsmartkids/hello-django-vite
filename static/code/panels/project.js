// Panels and components can import/inject their own CSS directly.
// 
// However if an error occurs in the imported/injected CSS, Dev Tools
// cannot show the line number where the error occurred in the original CSS file.
import '@ts/code/panels/project.css';

export function setupProjectPanel() {
    console.log('setupProjectPanel called');
}
