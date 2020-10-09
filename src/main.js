import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// elment-ui
import ElementUI from 'element-ui';
// bus
import VueBus from 'vue-bus';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/all.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueBus)
// Vue.use(router)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
