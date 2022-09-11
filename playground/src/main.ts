import { createApp } from 'vue'
import NaiveUI from 'naive-ui'
import { VClickoutside } from '@relaxed/vue-directives'
import './style.css'
import App from './App.vue'

createApp(App).use(VClickoutside).use(NaiveUI).mount('#app')
