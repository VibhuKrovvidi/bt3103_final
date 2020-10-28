import AboutUs from './components/AboutUs.vue'
import Admin from './components/Admin.vue'
import Dashboard from './components/Dashboard.vue'
import FAQ from './components/FAQ.vue'
import Feedback from './components/Feedback.vue'
import Modules from './components/Modules.vue'
import Time from './components/Time.vue'
import TimeForm from './components/TimeForm.vue'
import Zoning from './components/Zoning.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'




export default[

    { 
        path: '/aboutus', 
        component: AboutUs
    },
    { 
        path: '/admin', 
        component: Admin,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/register', 
        component: Register,
        meta : {
            requiresGuest: false
        }
    },
    { 
        path: '/dashboard', 
        component: Dashboard,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/faq', 
        component: FAQ,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/feedback', 
        component: Feedback,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/modules', 
        component: Modules,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/time', 
        component: Time,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/time/form', 
        component: TimeForm,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/zoning', 
        component: Zoning,
        meta : {
            requiresAuth: true
        }
    },
    { 
        path: '/', 
        component: Login,
        meta : {
            requiresGuest: true
        }
    }
    
     
]


