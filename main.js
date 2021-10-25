import Vue from 'vue'
import App from './App'
import store from './utils/store/index'

// 引入uview主JS
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

new Vue({
    store,
    ...App
}).$mount()