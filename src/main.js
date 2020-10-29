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
import Header from './components/Header.vue'
import firebase from 'firebase'


Vue.use(VueRouter)
Vue.config.productionTip = false



const myRouter = new VueRouter({ 
  routes: Routes,
  mode: 'history'
});

//NavGuards
myRouter.beforeEach((to, from, next) => {
  //Check if authentication required to move forward
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //Check if user is not logged in
    if(!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else { //Means we are logged in
      //Allow them to move forward
      next();
    }
  } else {
    next();
  }
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
Vue.component('navi', Header)

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      render: h => h(App),
      router:myRouter
    }).$mount('#app')
  }
})






