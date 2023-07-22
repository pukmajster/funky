import App from './App.svelte'
import './assets/style.css'
// Your selected Skeleton theme:
import '@skeletonlabs/skeleton/themes/theme-crimson.css'

// This contains the bulk of Skeletons required styles:
import '@skeletonlabs/skeleton/styles/skeleton.css'

// Finally, your application's global stylesheet (sometimes labeled 'app.css')
import '../app.postcss'

const app = new App({
  target: document.getElementById('app')
})

export default app
