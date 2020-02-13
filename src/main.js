import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import moment from 'moment'

import 'vant/lib/index.css'
import './styles/base.css'
import './styles/iconfont.css'
import 'lib-flexible'

import HmInput from './components/HmInput'
import HmButton from './components/HmButton'
import HmNav from './components/HmNav.vue'
import HmHeader from './components/HmHeader.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'
import HmFloor from './components/HmFloor.vue'

Vue.component('HmInput', HmInput)
Vue.component('HmButton', HmButton)
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)
Vue.component('HmPost', HmPost)
Vue.component('HmComment', HmComment)
Vue.component('HmFloor', HmFloor)

Vue.prototype.$axios = axios
Vue.use(Vant)
Vue.config.productionTip = false

Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})
axios.defaults.baseURL = 'http://localhost:3000'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应拦截器', response)
  // console.log(response.data)
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    Vant.Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const bus = new Vue()
Vue.use(bus)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('请求拦截器', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
