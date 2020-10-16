import AboutUs from './components/AboutUs.vue'
import Admin from './components/Admin.vue'
import Dashboard from './components/Dashboard.vue'
import FAQ from './components/FAQ.vue'
import Feedback from './components/Feedback.vue'
import Modules from './components/Modules.vue'
import Time from './components/Time.vue'
import Zoning from './components/Zoning.vue'


export default[

	{ path: '/', component: AboutUs},
    { path: '/admin', component: Admin},
    { path: '/dashboard', component: Dashboard},
    { path: '/faq', component: FAQ},
    { path: '/feedback', component: Feedback},
    { path: '/modules', component: Modules},
    { path: '/time', component: Time},
    { path: '/zoning', component: Zoning}
    
     
]