import Vue from 'vue'
import App from './App'
import store from './store/index'

import topNav from "./components/topNav.vue";
import footNav from "./components/footNav.vue";

Vue.component('top-nav', topNav);
Vue.component('foot-nav', footNav);

Vue.config.productionTip = false

App.mpType = 'app'

new Vue({
    store,
    ...App
}).$mount()