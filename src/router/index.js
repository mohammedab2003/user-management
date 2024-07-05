import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import employees from '../views/employees.vue'
import departments from '../views/departments.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import { getAuth } from 'firebase/auth'
import { auth } from '@/firebase/db'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth:true
      }
    },
     {
      path: '/employees',
      name: 'employees',
      component: employees,
      meta: {
        requireAuth:true
      }
    },
     {
      path: '/departments',
      name: 'departments',
      component: departments,
      meta: {
        requireAuth:true
      }
    },
     {
      path: '/login',
      name: 'login',
      component: login,
    
    },
     {
      path: '/register',
      name: 'register',
      component: register,
    },
  ]
})
// router.beforeEach((to,from, next) => {
//   if(to.path == '/login' && auth.currentUser){
//     next('/');
//     return;
//   }

//   if(to.matched.some((record) => record.meta.requireAuth) && !auth.currentUser){
//     next('/login');
//     return;
//   }

//   next();
// })

export default router
