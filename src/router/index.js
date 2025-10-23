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
                            import('../views/dashboards/Dashboards.v1.vue'),
                    },
                ],
            },
            {
                path: '/components',
                name: 'components',
                component: () => import('../views/components/index.vue'),
                meta: {
                    title: 'Components',
                },
                children: [
                    {
                        path: 'upload',
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
                        path: 'profileTwo',
                        name: 'ProfileTwo',
                        component: () =>
                            import('../views/profile/ProfileTwo.vue'),
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

router.beforeEach(async (to, from, next) => {
    const whiteList = ['/signIn', '/signUp']

    if (whiteList.includes(to.path)) {
        next()
        return
    }

    try {
        const res = await request({
            url: '/user/checklogin',
            method: 'GET',
        })
        if (res.data.status_code === 200) {
            next()
        } else {
            next('/signIn')
        }
    } catch (err) {
        next('/signIn')
    }
})

router.afterEach(() => {
    if (window.innerWidth <= 1200) {
        const sidenav =
            store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

        store.commit('largeSidebar/toggleSidebarProperties')
    }
})

export default router
