import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ReservesView from '../views/OrdersView.vue'
import UsersView from '../views/UsersView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import { useCookies } from "vue3-cookies";
import userService from "@/services/userService";
const { cookies } = useCookies();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/reserves',
      name: 'reserves',
      component: ReservesView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: VehiclesView,
    },
  ],
})

router.beforeResolve(async (to, _) => {
  if(cookies.get('authenticated')  !== 'true' && to.name === 'login'){
    return true
  }
  await userService.checkToken()
  if(cookies.get('authenticated')  !== 'true' && to.name !== 'login')
    return {name:'login'}
  if(cookies.get('authenticated')  === 'true' && to.name === 'login')
    return {name:'home'}
})

export default router
