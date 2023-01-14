import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./routers/index.js";

import {createPinia} from "pinia";

const pinia = createPinia();

import {instance as axios} from "./common/axios.js";

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app
    .use(pinia)
    .use(router)
    .mount('#app')
