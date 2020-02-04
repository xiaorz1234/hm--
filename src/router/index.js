import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

export default router
