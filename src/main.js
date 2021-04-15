import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

//stylesheets
import "./assets/stylesheets/index.scss";


const app = createApp(App);

//Run main app
app.use(router)
.use(VueAxios, axios)
.mount('#app');
