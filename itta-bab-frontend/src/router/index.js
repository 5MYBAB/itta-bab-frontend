import {createRouter, createWebHistory} from "vue-router";

import userRoutes from './user.js';
import boardRoutes from './board.js';
import groupRoutes from './group.js';
import scheduleRoutes from './schedule.js';
import storeRoutes from './store.js';
import inquiryRoutes from './inquiry.js';
import reportRoutes from "@/router/report.js";
import adminRoutes from './admin.js';

import HomeView from "@/views/Home.vue";
import {useAuthStore} from "@/stores/auth.js";

const routes = [
    {
        path: '/',
        component: HomeView,
        meta: { requiresAuth: true }
    },
    ...userRoutes,
    ...boardRoutes,
    ...groupRoutes,
    ...scheduleRoutes,
    ...storeRoutes,
    ...inquiryRoutes,
    ...reportRoutes,
    ...adminRoutes
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.accessToken) {
        next({ path: '/login' });
    }
    else if (authStore.accessToken && (to.path === '/login')) {
        next({ path: '/' });
    } else {
        next(); // 나머지 경우는 계속 진행
    }
});

export default router;
