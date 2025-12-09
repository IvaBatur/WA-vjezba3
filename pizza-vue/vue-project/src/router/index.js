import { createRouter, createWebHistory } from 'vue-router'
import PizzaList from '../components/PizzaList.vue' 
import PizzaDetails from '../views/PizzaDetails.vue'

const routes = [
  {
    path: '/',
    name: 'PizzaList',
    component: PizzaList
  },
  {
    path: '/pizze/:naziv',
    name: 'PizzaDetails',
    component: PizzaDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router