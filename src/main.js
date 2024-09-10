import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initVant from './utils/vant'
import i18n from './lang'


const app = createApp(App)
initVant(app)
app.use(i18n);
app.use(store).use(router).mount('#app')

