import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const LookHouse = () => import('@/views/LookHouse')
const Message = () => import('@/views/Message')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      { path: 'home', component: Home },
      { path: 'lookhouse', component: LookHouse },
      { path: 'message', component: Message },
      { path: 'my', component: My }
    ]
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
