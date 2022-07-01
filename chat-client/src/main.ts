import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from './store'

import "@/styles/index.scss"
import 'uno.css'
import 'nprogress/nprogress.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"
import "element-plus/theme-chalk/src/notification.scss"

const app = createApp(App)
// app.use(ElementPlus)
app.use(router).use(store).mount("#app")
