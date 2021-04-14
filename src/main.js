import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//stylesheets
import "./assets/stylesheets/index.scss";


const app = createApp(App);

//Run main app
app.use(router)
.mount('#app');
