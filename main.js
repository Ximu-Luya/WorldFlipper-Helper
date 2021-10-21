import Vue from 'vue'
import App from './App'
import store from './utils/store/index'

import topNav from "./components/topNav.vue";
import footNav from "./components/footNav.vue";
// main.js
import uView from "uview-ui";
Vue.use(uView);

Vue.component('top-nav', topNav);
Vue.component('foot-nav', footNav);

Vue.config.productionTip = false

App.mpType = 'app'

new Vue({
    store,
    ...App
}).$mount()