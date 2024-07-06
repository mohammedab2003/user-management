import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import employees from "../views/employees.vue";
import departments from "../views/departments.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase/db";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/employees",
      name: "employees",
      component: employees,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/departments",
      name: "departments",
      component: departments,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {
        requireAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  getAuth().onAuthStateChanged((user) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!user) {
        next({ path: "/login" });
        return;
      } else {
        next();
        return;
      }
    } else if (!to.matched.some((record) => record.meta.requireAuth)) {
      if (!user) {
        next();
        return;
      } else {
        next({ path: "/" });
        return;
      }
    } else {
      next();
      return;
    }
  });
});

export default router;
