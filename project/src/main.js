import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import mixins from './mixin'
import store from "./store/storage"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// //event bus
// export const eventBus = new Vue()
// Vue.config.productionTip = false
// /* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>'
//     })
// //

createApp(App)
.use(router)
.use(BootstrapVue3)
.use(VueSweetalert2)
.use(store)
.mixin(mixins)
.mount('#app');


