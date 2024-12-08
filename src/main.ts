import {createApp, ref} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import i18n from "../src/utils/lang";

const useArray = [router, i18n, Vue3Toastify]

const app = createApp(App)

app.use(createPinia())
useArray.forEach((item) => {
  app.use(item)
})

app.mount('#app')

