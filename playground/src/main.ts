import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VClickoutside } from '@relaxed/vue-directives'
import NaiveUI from 'naive-ui'
console.log(VClickoutside)

createApp(App).use(VClickoutside).use(NaiveUI).mount('#app')
