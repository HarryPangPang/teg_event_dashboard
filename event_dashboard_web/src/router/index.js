import Vue from 'vue'
import Router from 'vue-router'
import ConsumerDashBoard from '../components/ConsumerDashBoard'
import searchConsumerInfo from '../components/searchConsumerInfo'
import eventDashboard from '../components/eventDashboard'
import searchEventInfo from '../components/searchEventInfo'

Vue.use(Router)
// 路由配置
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ConsumerDashBoard',
      // 利用router的redirect属性来重定向根目录指定路径
    },
    
    {
      path: '/searchConsumerInfo',
      name:'searchConsumerInfo',
      component: searchConsumerInfo
    },
    {
      path: '/searchEventInfo',
      name:'searchEventInfo',
      component: searchEventInfo
    },
    {
      path: '/ConsumerDashBoard',
      name:'ConsumerDashBoard',
      component: ConsumerDashBoard
    },
    {
      path: '/eventDashboard',
      name:'eventDashboard',
      component: eventDashboard
    }
  ]
})
