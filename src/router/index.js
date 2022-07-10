import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const LookHouse = () => import('@/views/LookHouse')
const Message = () => import('@/views/Message')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const City = () => import('@/views/City')
const HousingDetails = () => import('@/views/HousingDetails')
const Map = () => import('@/views/Map')
const Issue = () => import('@/views/Issue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      { path: 'home', component: Home, name: 'Home' },
      { path: 'lookhouse', component: LookHouse, name: 'LookHouse' },
      { path: 'message', component: Message, name: 'Message' },
      { path: 'my', component: My, name: 'My' }
    ]
  },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/city', component: City, name: 'City' },
  {
    path: '/housingdetails/:id',
    component: HousingDetails,
    name: 'HousingDetails'
  },
  { path: '/map', component: Map, name: 'Map' },
  { path: '/issue', component: Issue, name: 'Issue' }
]

const router = new VueRouter({
  routes
})

export default router
