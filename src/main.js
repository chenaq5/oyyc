import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import './assets/js/script.js'
import './assets/js/database.js'
import './assets/js/oss-upload.js'
import './assets/js/aliyun-workflow.js'

createApp(App).use(router).mount('#app')