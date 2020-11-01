import AboutUs from './components/AboutUs.vue'
import Admin from './components/Admin.vue'
import AdminPolicies from './components/AdminPolicies.vue'
import AdminFAQ from './components/AdminFAQ.vue'
import AdminFeedback from './components/AdminFeedback.vue'
import Dashboard from './components/Dashboard.vue'
import FAQ from './components/FAQ.vue'
import Feedback from './components/Feedback.vue'
import Modules from './components/Modules.vue'
import Time from './components/Time.vue'
import TimeForm from './components/TimeForm.vue'
import Zoning from './components/Zoning.vue'
import ZoningPolicies from './components/ZoningPolicies.vue'
import ZoningDeclaration from './components/ZoningDeclaration.vue'
import ZoningResources from './components/ZoningResources.vue'
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
        path: '/admin/policies', 
        component: AdminPolicies,
        meta : {
            requiresAuth: true
        } 
    },
    {
        path: '/admin/FAQ', 
        component: AdminFAQ,
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/admin/Feedback', 
        component: AdminFeedback,
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
        path: '/zoning/policies', 
        component: ZoningPolicies,
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/zoning/declaration', 
        component: ZoningDeclaration,
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/zoning/resources', 
        component: ZoningResources,
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


