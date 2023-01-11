// vue router
import * as VueRouter from "vue-router"
import App from "../App.vue";
import Login from "../Login.vue";
import Admin from "../Admin.vue";
import {instance as axios} from '../common/axios'

const routes = [
    {path: '/:pathMatch(.*)*', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {
        path: '/admin', name: 'Admin', component: Admin,
        meta: {requiresAuth: true}
    },

]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // get hexToken from cookie
        const hexToken = getCookie('hexToken');
        if (hexToken) {
            try {
                axios.defaults.headers.common['Authorization'] = hexToken;
                const {data} = await axios.post('/api/user/check')
                if (data.success) {
                    next();
                } else {
                    next({name: 'Login'})
                }
            } catch (e) {
                console.log(e)
                next({name: 'Login'})
            }
        } else {
            next({name: 'Login'})
        }
    } else {
        next();
    }
})

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
