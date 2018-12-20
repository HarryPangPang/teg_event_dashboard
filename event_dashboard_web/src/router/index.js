import Vue from 'vue'
import Router from 'vue-router'
import PieDashBoard from '../components/PieDashBoard'
import searchConsuerInfo from '../components/searchConsuerInfo'
import Login from '../components/Login'
Vue.use(Router)
// 路由配置
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/PieDashBoard',
      // 利用router的redirect属性来重定向根目录指定路径
    },
    {
      path: '/searchConsuerInfo',
      name:'searchConsuerInfo',
      component: searchConsuerInfo
    },
    {
      path: '/PieDashBoard',
      name:'PieDashBoard',
      component: PieDashBoard
    }
  ]
})
