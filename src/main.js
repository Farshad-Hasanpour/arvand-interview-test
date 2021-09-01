import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import Icon from '@/components/Icon'
import Button from '@/components/Button'

Vue.component('Icon', Icon);
Vue.component('Button', Button);

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
	baseURL: 'http://jsonplaceholder.typicode.com/',
});

Vue.prototype.$utility= {
	copyObj: obj => JSON.parse(JSON.stringify(obj)),
};

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
