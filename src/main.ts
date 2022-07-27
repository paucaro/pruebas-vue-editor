import { createApp } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import App from './App.vue'

createApp(App)
    .component('QuillEditor', QuillEditor)
    .mount('#app')
