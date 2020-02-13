import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Personage from '../pages/personage.vue'
import EditPersonage from '../pages/EditPersonage.vue'
import Focus from '../pages/focus.vue'
import Test from '../pages/test.vue'
import MyComments from '../pages/MyComments.vue'
import Favorite from '../pages/favorite.vue'
import Home from '../pages/home.vue'
import NewDetail from '../pages/NewDetail.vue'
import Follow from '../pages/follow.vue'
import category from '../pages/category.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/personage', component: Personage, name: 'personage' },
    { path: '/editPersonage', component: EditPersonage, name: 'editPersonage' },
    { path: '/focus', component: Focus, name: 'focus' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/mycomments', component: MyComments, name: 'mycomments' },
    { path: '/favorite', component: Favorite, name: 'favorite' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/category', component: category, name: 'category' },
    { path: '/newdetail/:id', component: NewDetail, name: 'newdetail' }

  ]
})

const AuthUrls = [
  '/personage',
  '/editPersonage',
  '/focus',
  '/mycomments',
  '/favorite',
  '/category'
]

router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    next()
  }
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
})

export default router
