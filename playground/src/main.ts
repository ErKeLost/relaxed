import { createApp } from 'vue'
import NaiveUI from 'naive-ui'
import App from './App.vue'
import RelaxedLayout from '@relaxed/layout'
import './style.css'
import 'uno.css'
createApp(App).use(NaiveUI).use(RelaxedLayout).mount('#app')
