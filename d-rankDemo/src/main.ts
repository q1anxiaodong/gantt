import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { Dialog } from 'vant';
import 'vant/lib/index.css';
import 'element-plus/dist/index.css'
import './common.less'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(ElementPlus);
app.use(Dialog);

app.mount('#app')
