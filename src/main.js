import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'

import AboutUs from './components/AboutUs.vue'
import Admin from './components/Admin.vue'
import Dashboard from './components/Dashboard.vue'
import FAQ from './components/FAQ.vue'
import Feedback from './components/Feedback.vue'
import Modules from './components/Modules.vue'
import Time from './components/Time.vue'
import TimeForm from './components/TimeForm.vue'
import Zoning from './components/Zoning.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false



const myRouter = new VueRouter({ 
  routes: Routes,
  mode: 'history'
});

Vue.component('aboutus', AboutUs)
Vue.component('admin', Admin)
Vue.component('dash', Dashboard)
Vue.component('faq', FAQ)
Vue.component('feedback', Feedback)
Vue.component('modules', Modules)
Vue.component('time', Time)
Vue.component('timeform', TimeForm)
Vue.component('zoning', Zoning)

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')


