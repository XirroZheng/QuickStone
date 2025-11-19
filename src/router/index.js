import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import SignIn from '../views/sessions/SignIn.vue'
import SignUp from '../views/sessions/SignUp.vue'
import request from '../utils/axios'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../layout/index.vue'),
        redirect: '/dashboards/dashboard',
        meta: {
            title: 'Home',
            requiresAuth: true,
        },

        children: [
            {
                path: '/dashboards',
                name: 'Dashboards',
                component: () => import('../views/dashboards/index.vue'),
                meta: {
                    title: 'Dashboard',
                },
                children: [
                    {
                        path: 'dashboard',
                        name: 'dashboard',
                        component: () =>
                            import('../views/dashboards/Dashboards.vue'),
                    },
                ],
            },
            {
                path: '/repositories',
                name: 'repositories',
                component: () => import('../views/components/index.vue'),
                meta: {
                    title: 'Repository',
                },
                children: [
                    {
                        path: 'repository',
                        name: 'repository',
                        component: () =>
                            import('../views/components/Repos.vue'),
                    },
                    {
                        path: 'upload/:bucket_name?',
                        name: 'upload',
                        component: () =>
                            import('../views/components/Upload.vue'),
                    },
                ],
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('../views/profile/index.vue'),
                meta: {
                    title: 'Profile',
                },
                children: [
                    {
                        path: 'account',
                        name: 'account',
                        component: () => import('../views/profile/Account.vue'),
                    },
                    {
                        path: 'notification',
                        name: 'notification',
                        component: () =>
                            import('../views/profile/Notification.vue'),
                    },
                ],
            },
        ],
    },

    { path: '/signIn', component: SignIn },
    { path: '/signUp', component: SignUp },

    { path: '/:path(.*)', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return { left: 0, top: 0 }
    },
    routes,
})

// router.beforeEach(async (to, from, next) => {
//     const whiteList = ['/signIn', '/signUp']

//     if (whiteList.includes(to.path)) {
//         next()
//         return
//     }
//     const token = localStorage.getItem('token')
//     if (token) {
//         next()
//     } else {
//         next('/signIn')
//     }
// })

router.afterEach(() => {
    if (window.innerWidth <= 1200) {
        const sidenav =
            store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

        store.commit('largeSidebar/toggleSidebarProperties')
    }
})

export default router
